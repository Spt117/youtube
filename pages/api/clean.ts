import { join } from "path";
import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "DELETE") {
        const { filename } = req.body;

        if (!filename) {
            return res.status(400).json({ message: "Filename is required" });
        }

        const filePath = join(process.cwd(), "public", filename);

        try {
            await fs.unlink(filePath);
            res.status(200).json({ message: `File ${filename} deleted successfully!` });
        } catch (error) {
            const err = error as Error; // Type assertion
            res.status(500).json({ message: `Error deleting the file: ${err.message}` });
        }
    } else {
        res.status(405).json({ message: "Only DELETE requests are allowed" });
    }
}
