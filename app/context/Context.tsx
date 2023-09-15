import { ReactNode, createContext, useContext, useState } from "react";
import { TDataVideo, TIds, TMyContext } from "../library/type";

const MyContext = createContext<TMyContext>({
    url: "",
    setUrl: () => {},
    dataVideo: null,
    setDataVideo: () => {},
    ids: {
        idVideo: "",
        idAudio: "",
    },
    setIds: () => {},
});

// Composant fournisseur de contexte
interface MyContextProviderProps {
    children: ReactNode;
}

export const MyContextProvider = ({ children }: MyContextProviderProps) => {
    const [url, setUrl] = useState<string>(
        "https://www.youtube.com/watch?v=2mN8ECdfWOU&ab_channel=SmartContractProgrammer"
    );
    const [dataVideo, setDataVideo] = useState<TDataVideo | null>(null);
    const [ids, setIds] = useState<TIds>({
        idVideo: "",
        idAudio: "",
    });

    return (
        <MyContext.Provider
            value={{
                url,
                setUrl,
                dataVideo,
                setDataVideo,
                ids,
                setIds,
            }}
        >
            {children}
        </MyContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte
export const useMyContext = () => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useMyTransaction must be used within a MyTransactionProvider");
    }
    return context;
};
