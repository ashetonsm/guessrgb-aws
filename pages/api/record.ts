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

    // Obj that will be used to send a response message or error
    var responseData;

    try {

        const newHistory = JSON.parse(req.body)

        const entry = await games.findOne({
            email: { $regex: `${session?.user?.email}`, $options: 'i' },
        });

        // Found an existy History entry for this email
        if (entry!) {
            // Spread our result object onto the array of game history entries
            await games.updateOne(entry, { $set: { history: [...entry.history, newHistory] } }).then(() => {
                responseData = { message: 'History save success.' }
                res.json(responseData as ResponseData)
            })
        } else {
            const entry = new History({
                email: session!.user!.email!.toString(),
                history: [newHistory]
            });
            await games.insertOne(entry).then(() => {
                responseData = { message: 'Created a new History entry. History save success.' }
                res.json(responseData as ResponseData)
            })
        }
    } catch (error) {
        console.error(error)
        responseData = { message: 'History save failure.' }
        res.json(responseData as ResponseData)
    }
}