import { listerFormats } from "@/app/library/functions";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.body);

    try {
        const url = req.body.url as string;
        const formats = await listerFormats(url);
        console.log(formats);

        res.status(200).send(formats);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: "Erreur serveur", error: error.message });
        } else {
            res.status(500).json({ message: "Erreur serveur inconnue" });
        }
    }
}
