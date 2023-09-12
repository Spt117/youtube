"use client";

export default function Download() {
    async function test() {
        const response = await fetch("/api/download");

        const data = await response.json();

        if (response.ok) {
            console.log(data);
        } else {
            console.error(data.error);
        }
    }

    return (
        <>
            <button onClick={test}>Test</button>
        </>
    );
}
