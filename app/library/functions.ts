import youtubedl, { YtResponse } from "youtube-dl-exec";
import { TBody, TDataVideo } from "./type";
import ffmpegPath from "ffmpeg-static";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

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
            console.log("Formats récupérés !");
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

const downloadVideo = async (body: TBody) => {
    console.log("Téléchargement en cours...");
    const videoName = `${body.ids.idVideo}.mp4`;
    const audioName = `${body.ids.idAudio}.mp3`;
    const videoPath = `./public/${videoName}`;
    const audioPath = `./public/${audioName}`;

    try {
        await youtubedl(body.url, {
            format: body.ids.idVideo,
            noCheckCertificates: true,
            noWarnings: true,
            addHeader: ["referer:youtube.com", "user-agent:googlebot"],
            output: videoPath,
        });
        console.log("Téléchargement vidéo terminé !");
        await youtubedl(body.url, {
            format: body.ids.idAudio,
            noCheckCertificates: true,
            noWarnings: true,
            addHeader: ["referer:youtube.com", "user-agent:googlebot"],
            output: audioPath,
        });
        console.log("Téléchargement audio terminé !");
    } catch (error) {
        console.error("Erreur lors du téléchargement :", error);
    }
    try {
        await execAsync(`${ffmpegPath} -i ${videoPath} -i ${audioPath} -c:v copy -c:a aac "./public/${body.name}.mp4"`);
        console.log("Merge terminé !");
        return `../../../../${body.name}.mp4`;
    } catch (error) {
        console.error("Erreur lors du merge :", error);
        return "Merge error !";
    }
};

export { downloadVideo, listerFormats };
