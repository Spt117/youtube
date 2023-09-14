import youtubedl, { YtResponse } from "youtube-dl-exec";
import { TDataVideo } from "./type";

const url = "https://www.youtube.com/watch?v=2mN8ECdfWOU&ab_channel=SmartContractProgrammer";
const options = {
    format: "best",
    noCheckCertificates: true,
    noWarnings: true,
    addHeader: ["referer:youtube.com", "user-agent:googlebot"],
    output: "./videos/ma_video.mp4",
};

const download = async () => {
    try {
        const data = await youtubedl(url, options);
        console.log("Téléchargement terminé !");
        console.log(data);
    } catch (error) {
        console.error("Erreur lors du téléchargement :", error);
    }
};

// download(url, options);

const getData = async () => {
    console.log("Récupération des données...");

    try {
        const info = await youtubedl(url, {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            addHeader: ["referer:youtube.com", "user-agent:googlebot"],
        });
        console.log(info);

        // const videoDetails: {
        //     format: string;
        //     resolution: number;
        //     sizeMB: string | number; // Convertit les octets en mégaoctets
        // }[] = [];

        const videoDetails: any[] = [];

        info.formats.forEach((format) => {
            // videoDetails.push({
            //     format: format.format,
            //     resolution: format.height,
            //     sizeMB: format.filesize ? format.filesize / (1024 * 1024) : "Inconnu", // Convertit les octets en mégaoctets
            // });
            videoDetails.push(format);
        });
        console.log(videoDetails);

        return {
            details: videoDetails,
        };
    } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        throw error;
    }
};

const listerFormats = async (url: string) => {
    console.log("Récupération des formats...");

    try {
        const output = await youtubedl(url, {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            addHeader: ["referer:youtube.com", "user-agent:googlebot"],
        });

        if (output && output.formats) {
            // output.formats.forEach((format) => {
            //     console.log(
            //         `Format ID: ${format.format_id}, Résolution: ${
            //             format.height ? format.height + "p" : "audio seulement"
            //         }, Taux de bits: ${format.tbr ? format.tbr + "k" : "N/A"}`
            //     );
            // });
            console.log(output.formats[0]);

            return formatData(output);
        } else {
            console.log("Aucun format disponible");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des formats :", error);
    }
};

function formatData(data: YtResponse): TDataVideo {
    return {
        name: data.title,
        channel: data.channel,
        description: data.description,
        duration: data.duration,
        formats: data.formats,
    };
}

const downloadVideo = async (url: string, formatID: string) => {
    try {
        await youtubedl(url, {
            format: formatID,
            noCheckCertificates: true,
            noWarnings: true,
            addHeader: ["referer:youtube.com", "user-agent:googlebot"],
            output: "ma_video5.mp4",
        });
        console.log("Téléchargement terminé !");
    } catch (error) {
        console.error("Erreur lors du téléchargement :", error);
    }
};

// downloadVideo(url, "617"); // Télécharger la vidéo en 720p (format ID 22)

export { download, downloadVideo, getData, listerFormats };
