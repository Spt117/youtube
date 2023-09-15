"use client";

import { useMyContext } from "../context/Context";

export default function Download() {
    const { ids, url, dataVideo } = useMyContext();

    async function downloadOnServer() {
        const body = { ids: ids, url: url, name: dataVideo?.name.replace(/[\|\?\<\>\:]/g, "") };
        const response = await fetch("/api/downloadOnServeur", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const data = await response.text();
        console.log(data);
        downloadOnFront(data);
        if (body.name) cleanName(body.name + ".mp4");
        cleanName(ids.idAudio + ".mp3");
        cleanName(ids.idVideo + ".mp4");
    }

    function downloadOnFront(url: string) {
        const a = document.createElement("a");
        a.href = url;
        a.download = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    async function cleanName(name: string) {
        const response = await fetch("/api/clean", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ filename: name }),
        });
        const data = await response.text();
        console.log(data);
    }
    return <button onClick={() => downloadOnServer()}>Download</button>;
}
