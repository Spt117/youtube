import { ReactNode, createContext, useContext, useState } from "react";
import { TDataVideo, TMyContext } from "../library/type";

const MyContext = createContext<TMyContext>({
    dataVideo: null,
    setDataVideo: () => {},
});

// Composant fournisseur de contexte
interface MyContextProviderProps {
    children: ReactNode;
}

export const MyContextProvider = ({ children }: MyContextProviderProps) => {
    const [dataVideo, setDataVideo] = useState<TDataVideo | null>(null);

    return (
        <MyContext.Provider
            value={{
                dataVideo,
                setDataVideo,
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
