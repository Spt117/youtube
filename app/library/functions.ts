import youtubedl from "youtube-dl-exec";

const url = "https://www.youtube.com/watch?v=2mN8ECdfWOU&ab_channel=SmartContractProgrammer";
const options = {
    format: "best",
    noCheckCertificates: true,
    noWarnings: true,
    addHeader: ["referer:youtube.com", "user-agent:googlebot"],
    output: "ma_video.mp4",
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

const listerFormats = async (url: string) => {
    try {
        const output = await youtubedl(url, {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            addHeader: ["referer:youtube.com", "user-agent:googlebot"],
        });

        if (output && output.formats) {
            output.formats.forEach((format) => {
                console.log(
                    `Format ID: ${format.format_id}, Résolution: ${
                        format.height ? format.height + "p" : "audio seulement"
                    }, Taux de bits: ${format.tbr ? format.tbr + "k" : "N/A"}`
                );
            });
        } else {
            console.log("Aucun format disponible");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des formats :", error);
    }
};

// listerFormats(url);

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

export { download, listerFormats, downloadVideo };
