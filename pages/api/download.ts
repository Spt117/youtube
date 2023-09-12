import { download } from "@/app/library/functions";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    download();
    res.status(200).json({ name: "John Doeddd" });
}
