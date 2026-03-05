import { authApi } from "@/api/services/auth.service";
import { AuthContextType, IUser } from "@/types/auth.type";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const checkAuth = async () => {
            const storedToken = localStorage.getItem("accessToken");
            if (!storedToken) {
                setLoading(false);
                return;
            }

            try {
                const res = await authApi.getMe();
                setUser(res);
                setToken(storedToken);
            } catch {
                logout();
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);
    const login = (token: string, user: IUser) => {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("user", JSON.stringify(user));
        setToken(token);
        setUser(user);
    }
    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    }
    const value: AuthContextType = {
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
    }
    if (loading) return null
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth phải dùng trong AuthProvider")
    }
    return context
}