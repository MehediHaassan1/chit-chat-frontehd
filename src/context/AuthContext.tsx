/* eslint-disable react-refresh/only-export-components */
import { getCurrentUser } from "@/services/authService";
import { ILoggedUser } from "@/types";
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";

interface IAuthProviderValues {
    user: ILoggedUser | null;
    isLoading: boolean;
    setUser: (user: ILoggedUser | null) => void;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<IAuthProviderValues | undefined>(
    undefined
);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<ILoggedUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleSetUser = async () => {
        const userInfo = await getCurrentUser();
        setUser(userInfo);
        setIsLoading(false);
    };

    useEffect(() => {
        handleSetUser();
    }, [setIsLoading]);

    return (
        <AuthContext.Provider
            value={{ user, setUser, isLoading, setIsLoading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useUser must be used within an AuthContextProvider");
    }
    return context;
};

export default AuthContextProvider;
