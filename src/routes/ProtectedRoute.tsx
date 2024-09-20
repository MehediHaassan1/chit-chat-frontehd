import { getCurrentUser } from "@/services/authService";
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<{ email?: string; phone?: string } | null>(
        null
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleUser = async () => {
            try {
                const userInfo = await getCurrentUser();
                setUser(userInfo);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            } finally {
                setLoading(false);
            }
        };

        handleUser();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator while fetching user
    }

    if (!user?.email || !user?.phone) {
        return <Navigate to="/sign-in" replace={true} />;
    }

    return children;
};

export default ProtectedRoute;
