"use client";
import Data from "./composants/Datas";
import Download from "./composants/Download";
import GetData from "./composants/GetData";
import { useMyContext } from "./context/Context";

export default function Home() {
    const { dataVideo } = useMyContext();
    return (
        <>
            <h1>Youtube Downloader</h1>
            <GetData />
            {dataVideo != null && (
                <>
                    <Data />
                    <br />
                    <Download />
                </>
            )}
        </>
    );
}
