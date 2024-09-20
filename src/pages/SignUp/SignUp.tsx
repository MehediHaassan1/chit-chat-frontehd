import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, Loader, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 8 characters long" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function SignUp() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: LoginFormValues) {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            console.log(values);
            setIsLoading(false);
        }, 1000);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black  to-gray-800 p-4">
            <div className="w-full max-w-[350px] bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-opacity-30 shadow-xl rounded-lg p-6">
                <div className="flex items-center justify-center my-5">
                    <svg
                        id="logo-14"
                        width="73"
                        height="49"
                        viewBox="0 0 73 49"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {" "}
                        <path
                            d="M46.8676 24C46.8676 36.4264 36.794 46.5 24.3676 46.5C11.9413 46.5 1.86765 36.4264 1.86765 24C1.86765 11.5736 11.9413 1.5 24.3676 1.5C36.794 1.5 46.8676 11.5736 46.8676 24Z"
                            className="ccustom"
                            fill="#68DBFF"
                        ></path>{" "}
                        <path
                            d="M71.1324 24C71.1324 36.4264 61.1574 46.5 48.8529 46.5C36.5484 46.5 26.5735 36.4264 26.5735 24C26.5735 11.5736 36.5484 1.5 48.8529 1.5C61.1574 1.5 71.1324 11.5736 71.1324 24Z"
                            className="ccompli1"
                            fill="#FF7917"
                        ></path>{" "}
                        <path
                            d="M36.6705 42.8416C42.8109 38.8239 46.8676 31.8858 46.8676 24C46.8676 16.1144 42.8109 9.17614 36.6705 5.15854C30.5904 9.17614 26.5735 16.1144 26.5735 24C26.5735 31.8858 30.5904 38.8239 36.6705 42.8416Z"
                            className="ccompli2"
                            fill="#5D2C02"
                        ></path>{" "}
                    </svg>
                </div>
                <div className="space-y-2 mb-6 text-center">
                    <h2 className="text-2xl font-bold text-white">Sign in</h2>
                    <p className="text-zinc-200 text-sm">
                        Enter your email and password to login
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-white text-sm font-medium mb-1"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-300" />
                            <input
                                {...register("email")}
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                className="w-full pl-10 pr-3 py-2 bg-white bg-opacity-20 border border-zinc-400 rounded-md text-white placeholder-zinc-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-300 text-xs mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-white text-sm font-medium mb-1"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-300" />
                            <input
                                {...register("password")}
                                id="password"
                                type={showPassword ? "text" : "password"}
                                className="w-full pl-10 pr-10 py-2 bg-white bg-opacity-20 border border-zinc-400 rounded-md text-white placeholder-zinc-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-300 hover:text-white focus:outline-none"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                                <span className="sr-only">
                                    {showPassword
                                        ? "Hide password"
                                        : "Show password"}
                                </span>
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-300 text-xs mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm font-medium"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader className="inline-block mr-2 h-4 w-4 animate-spin" />
                                Logging in...
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>
                <p className="text-sm text-zinc-200 mt-4 text-center">
                    Already have an account?{" "}
                    <Link to="/sign-in" className="text-white hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
