import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

interface ResponseData {
    error?: string
    msg?: string
    history?: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {

    const session = await getSession({ req })
    const client = await clientPromise;
    const games = client.db('test').collection('games');
    const users = client.db('test').collection('users');

    // Obj that will be used to send a response message or error
    var responseData;

    try {
        const matchingUser = await users.findOne({
            email: { $regex: `${session?.user?.email}`, $options: 'i' },
        })
        if (matchingUser !) {
            console.log(`Found user: ${matchingUser?._id}`)
            await games.findOne({
                userId: matchingUser!._id.toString()
            })
                .then((result) => {
                    if (result !== null) {
                        console.log(result.history)
                        responseData = { message: 'Search game success.', history: result.history }
                        res.json(responseData as ResponseData)
                    } else {
                        responseData = { message: 'Search game success. There were no games found.' }
                        res.json(responseData as ResponseData)
                    }
                })

        } else {
            responseData = { error: 'User not found. Search aborted.' }
            res.json(responseData as ResponseData)
        }
    } catch (error) {
        console.error(error)
        responseData = { error: 'Search game failure.' }
        res.json(responseData as ResponseData)
    }
}