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

    // Obj that will be used to send a response message or error
    var responseData;

    try {
        console.log(session ? session : "No session found")
        await games.findOne({
            email: session!.user!.email!.toString()
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
    } catch (error) {
        console.error(error)
        responseData = { error: 'Search game failure.' }
        res.json(responseData as ResponseData)
    }
}