import { YtFormat } from "youtube-dl-exec";

export type TDataVideo = {
    name: string;
    channel: string;
    description: string;
    duration: number;
    formats: YtFormat[];
};

export type TMyContext = {
    dataVideo: TDataVideo | null;
    setDataVideo: React.Dispatch<React.SetStateAction<TDataVideo | null>>;
};
