"use client";
import { useMyContext } from "../context/Context";
import { TDataVideo } from "../library/type";

export default function GetData() {
    const { setDataVideo, setUrl, url } = useMyContext();

    async function getData() {
        try {
            const res = await fetch("/api/getData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url: url }),
            });

            // Vérifiez si la réponse est OK et a du contenu
            if (!res.ok || !res.headers.get("content-length")) {
                throw new Error("Invalid or empty response from the server");
            }

            const rawData = await res.text(); // Get raw response for logging
            console.log("Raw response:", rawData);

            // Convert raw response to JSON
            const data: TDataVideo = JSON.parse(rawData);
            setDataVideo(data);
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
