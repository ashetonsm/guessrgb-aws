import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import History from "@/models/history.model";
import { getSession } from "next-auth/react";

interface ResponseData {
    error?: string
    msg?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {

    const session = await getSession({ req })
    const client = await clientPromise;
    const games = client.db('test').collection('games');
    const users = client.db('test').collection('users');

    // Obj that will be used to send a response message or error
    var responseData;

    responseData = { message: `${session?.user?.name}` }
    res.json(responseData as ResponseData)

    try {
        const matchingUser = await users.findOne({
            email: { $regex: `${session?.user?.email}`, $options: 'i' },
        })
        if (matchingUser!) {
            const entry = await games.findOne({
                userId: matchingUser!._id.toString()
            });

            if (entry!) {
                entry?.history.push(req.body.result);
                await entry?.save().then(() => {
                        responseData = { message: 'History save success.' }
                        res.json(responseData as ResponseData)
                    })
            } else {
                const entry = new History({
                    userId: matchingUser!._id.toString(),
                    history: [req.body.result]
                });
                await entry.save().then(() => {
                    responseData = { message: 'History save success.' }
                    res.json(responseData as ResponseData)
                })
            }
        } else {
            responseData = { error: 'User not found. Saving aborted.' }
            res.json(responseData as ResponseData)
        }
    } catch (error) {
        console.error(error)
        responseData = { message: 'History save failure.' }
        res.json(responseData as ResponseData)
    }
}