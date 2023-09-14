"use client";

import { useState } from "react";

export default function Download() {
    const [url, setUrl] = useState("");
    async function download() {
        const response = await fetch("/api/download");

        console.log(response);
    }

    return (
        <>
            <button onClick={download}>Test</button>
            <br />
            <input type="url" onChange={(e) => setUrl(e.target.value)} />
        </>
    );
}
