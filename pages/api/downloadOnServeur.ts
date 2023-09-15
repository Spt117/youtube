import { downloadVideo } from "@/app/library/functions";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await downloadVideo(req.body);

        res.status(200).send(response);
        console.log(response);
    } catch (error) {
        if (error instanceof Error) {
            // Gestion des erreurs
            res.status(500).json({ message: "Erreur serveur", error: error.message });
        } else {
            // Gestion d'autres types d'erreurs si nécessaire
            res.status(500).json({ message: "Erreur serveur inconnue" });
        }
    }
}
