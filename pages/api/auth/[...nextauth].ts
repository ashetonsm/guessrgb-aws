import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import User from '@/models/user.model';

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    // Email & Password
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const users = client.db('test').collection('users');

        // Find user with the email
        const user = await users.findOne({
          email: { $regex: `${credentials!.email}`, $options: 'i' },
        });

        // Email Not found
        if (!user) {
          throw new Error("Email is not registered");
        }

        const passwordCorrect = await compare(
          credentials!.password,
          user.password
        );

        // Incorrect password
        if (!passwordCorrect) {
          throw new Error("Password is incorrect");
        }

        return new User({
          name: user.name ? user.name : null,
          email: user.email,
          image: null,
          password: null
        });
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: 'jwt' },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);