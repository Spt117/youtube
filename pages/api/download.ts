// import { download, getData, listerFormats } from "@/app/library/functions";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     try {
//         // download();
//         // const data = await getData();
//         const url = req.body.url as string;

//         const formats = await listerFormats(url);

//         // Envoie la réponse
//         res.status(200).send(formats);
//     } catch (error) {
//         if (error instanceof Error) {
//             // Gestion des erreurs
//             res.status(500).json({ message: "Erreur serveur", error: error.message });
//         } else {
//             // Gestion d'autres types d'erreurs si nécessaire
//             res.status(500).json({ message: "Erreur serveur inconnue" });
//         }
//     }
// }
