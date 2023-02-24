import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

interface ResponseData {
    error?: string
    message?: string
    history?: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {

    const session = await getServerSession(req, res, authOptions)
    const client = await clientPromise;
    const games = client.db('test').collection('games');

    // Obj that will be used to send a response message or error
    var responseData;

    try {
        if (!session) {
            responseData = { message: 'You must be logged in.' }
            res.status(401).json(responseData as ResponseData)
            return;
        }

        await games.findOne({
            email: session!.user!.email!.toString()
        })
            .then((result) => {
                if (result !== null) {
                    console.log(`Completed games: ${result.history.length}`)
                    responseData = { message: 'Search game success.', history: result.history }
                    res.json(responseData as ResponseData)
                } else {
                    responseData = { message: 'Search game success. There were no games found.' }
                    res.json(responseData as ResponseData)
                }
            })
    } catch (error) {
        console.error(error)
        responseData = { error: 'Search game failure.' }
        res.json(responseData as ResponseData)
    }
}