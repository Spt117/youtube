"use client";
import { useState } from "react";
import { useMyContext } from "../context/Context";
import { promises } from "dns";
import { TDataVideo } from "../library/type";

export default function GetData() {
    const [url, setUrl] = useState<string>("");
    const { setDataVideo } = useMyContext();

    async function getData() {
        try {
            const res = await fetch("/api/getData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url: url }),
            });
            const data: TDataVideo = await res.json();
            setDataVideo(data);
            console.log(data);
        } catch (err) {
            console.log(err);
            alert("Une erreur est survenue, l'url est peut-être invalide ou le serveur est indisponible.");
        }
    }

    return (
        <>
            <p>Récupérer les données de la vidéo</p>
            <input type="url" onChange={(e) => setUrl(e.target.value)} />
            <button onClick={getData}>OK</button>
        </>
    );
}
