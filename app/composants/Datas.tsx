"use client";
import { useMyContext } from "../context/Context";
import FormatItem from "./FormatItem";

export default function Data() {
    const { dataVideo } = useMyContext();

    function formatDuration(seconds: number | undefined) {
        if (seconds == undefined) return null;
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        let result = "";

        if (hours > 0) {
            result += `${hours}h `;
        }
        if (minutes > 0 || hours > 0) {
            result += `${minutes}m `;
        }
        result += `${remainingSeconds}s`;

        return result;
    }

    return (
        <div>
            <h1>{dataVideo?.name}</h1>
            <p>Channel : {dataVideo?.channel}</p>
            <p>Description : {dataVideo?.description}</p>
            <p>{formatDuration(dataVideo?.duration)}</p>
            <h2>Vidéo</h2>
            {dataVideo?.formats
                .filter((format) => format.vcodec === "vp9" && format.filesize)
                .map((format) => (
                    <FormatItem key={format.format_id} format={format} id="idVideo" />
                ))}
            <h2>Audio</h2>
            {dataVideo?.formats
                .filter((format) => format.acodec !== "opus" && format.acodec !== "none" && format.filesize)
                .map((format) => (
                    <FormatItem key={format.format_id} format={format} id="idAudio" />
                ))}
        </div>
    );
}
