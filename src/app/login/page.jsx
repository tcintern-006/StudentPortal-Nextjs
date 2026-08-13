"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        async function verifyToken() {
            try {
                const res = await fetch(`${API_URL}/profile`, {
                    credentials: 'include',
                });

                if (res.ok) {
                    router.push("/");
                } else {
                    setCheckingAuth(false);
                }
            } catch (err) {
                console.log(err);
                setCheckingAuth(false);
            }
        }

        verifyToken();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!form.email.trim() || !form.password.trim()) {
            setError("Email and password are required");
            return;
        }

        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Invalid email or password");
                return;
            }

            router.push("/");
            router.refresh();
        } catch (err) {
            console.log(err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    if (checkingAuth) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p className="text-gray-400">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground px-8 pt-24 md:pt-2 flex flex-col flex-1 items-center justify-center font-sans md:pl-[16%]">
            <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#7F22FE]/20 rounded-full blur-[120px]" />

            <div className="relative w-full max-w-md bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Welcome Back
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm">
                        Log in to continue your learning
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#7F22FE] focus:bg-white/5 transition-all placeholder:text-gray-600"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#7F22FE] focus:bg-white/5 transition-all placeholder:text-gray-600"
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 bg-gradient-to-r from-[#7F22FE] to-[#B14EFF] hover:shadow-[0_0_25px_rgba(127,34,254,0.5)] transition-all duration-300 text-white font-medium px-6 py-3 rounded-xl disabled:opacity-50 disabled:hover:shadow-none"
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-400 mt-6">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-[#7F22FE] hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}