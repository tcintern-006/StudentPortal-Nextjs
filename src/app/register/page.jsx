"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getToken, setToken, removeToken } from "@/Components/auth";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        async function verifyToken() {
            const token = getToken();
            if (!token) {
                setCheckingAuth(false);
                return;
            }
            try {
                const res = await fetch(`${API_URL}/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.ok) {
                    router.push("/");
                } else {
                    removeToken();
                    setCheckingAuth(false);
                }
            } catch (err) {
                console.log(err);
                setCheckingAuth(false);
            }
        }

        verifyToken();
    }, []);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
            setError("All fields are required");
            return;
        }

        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                const message =
                    data.errors?.errors?.[0]?.msg || data.message || "Registration failed";
                setError(message);
                return;
            }

            setToken(data.token);
            router.push("/");
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
        <div className=" bg-background text-foreground px-8 mt-[5]  md:mt-[7%] flex flex-col flex-1 items-center justify-center font-sans md:pl-[16%]">
            <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#7F22FE]/20 rounded-full blur-[120px]" />

            <div className="relative w-full max-w-md bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text ">
                        Create Account
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm">
                        Join us and start learning today
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Ammar Awan"
                            className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#7F22FE] focus:bg-white/5 transition-all placeholder:text-gray-600"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">Role</label>
                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
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
                        <p className="text-xs text-gray-500 mt-1">
                            Must include uppercase, lowercase, number & symbol
                        </p>
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
                        {loading ? "Creating account..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-400 mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#7F22FE] hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
