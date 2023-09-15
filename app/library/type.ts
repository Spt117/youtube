import { YtFormat } from "youtube-dl-exec";

export type TDataVideo = {
    name: string;
    channel: string;
    description: string;
    duration: number;
    formats: YtFormat[];
};

export type TIds = {
    idVideo: string;
    idAudio: string;
};

export type TMyContext = {
    url: string;
    setUrl: React.Dispatch<React.SetStateAction<string>>;
    dataVideo: TDataVideo | null;
    setDataVideo: React.Dispatch<React.SetStateAction<TDataVideo | null>>;
    ids: TIds;
    setIds: React.Dispatch<React.SetStateAction<TIds>>;
};

export type TBody = {
    url: string;
    ids: TIds;
    name: string;
};
