import { NextApiRequest, NextApiResponse } from "next";
import User from '@/models/user.model'
import bcrypt from 'bcryptjs'
import clientPromise from "@/lib/mongodb";

interface ResponseData {
    error?: string
    msg?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {

    const client = await clientPromise;
    const users = client.db('test').collection('users');

    // Obj that will be used to send a response message or error
    var responseData;

    var userExists = await users.findOne({
        email: { $regex: `${req.body.email}`, $options: 'i' },
    })

    if (userExists) {
        responseData = { error: 'Database Error (Email in use).' }
        return res.status(400).json(responseData as ResponseData)
    } else {
        const hash = await bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS as string));
        const user = new User({
            email: req.body.email.toLowerCase(),
            password: hash
        })

        await users.insertOne(user)
            .then(() => {
                console.log(user)
                responseData = { msg: 'Registration success.' }
                res.json(responseData as ResponseData)
            })
            .catch((error: any) => {
                console.log(error)
                responseData = { error: 'Registration failure.' }
                res.status(400).json(responseData as ResponseData)
            })
    }

}