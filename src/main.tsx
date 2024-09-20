import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import AuthContextProvider from "./context/AuthContext.tsx";

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthContextProvider>
            <QueryClientProvider client={queryClient}>
                <Toaster />
                <RouterProvider router={router} />
            </QueryClientProvider>
        </AuthContextProvider>
    </StrictMode>
);
