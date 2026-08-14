"use client"

import { getToken } from "@/Components/auth";
import { useState, useEffect } from "react";

export default function StudentsPage() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
   const token = getToken();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    async function fetchStudents() {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/students`, { cache: "no-store" });
            const data = await res.json();
            setStudents(data.students || []);
        } catch (err) {
            console.log(err);
            setError("Could not load students");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchStudents();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!name.trim() || !email.trim()) {
            setError("Name and email are required");
            return;
        }

        try {
            setSubmitting(true);
            const res = await fetch(`${API_URL}/students`, {
                method: "POST",
                headers: { "Content-Type": "application/json" , Authorization: `Bearer ${token}`,},
                body: JSON.stringify({ name, email }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Something went wrong");
                return;
            }

            setName("");
            setEmail("");
            fetchStudents();
        } catch (err) {
            console.log(err);
            setError("Could not add student");
        } finally {
            setSubmitting(false);
        }
    }

    async function handleDelete(id) {
        setDeletingId(id);
        try {
            const res = await fetch(`${API_URL}/students/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) {
                console.log("Delete failed");
                setDeletingId(null);
                return;
            }

            setTimeout(() => {
                setStudents((prev) => prev.filter((s) => s.id !== id));
                setDeletingId(null);
            }, 200);
        } catch (err) {
            console.log(err);
            setDeletingId(null);
        }
    }


    const colors = [
        "from-[#7F22FE] to-[#B14EFF]",
        "from-[#22C7FE] to-[#22FEB1]",
        "from-[#FE6F22] to-[#FEB122]",
        "from-[#FE2266] to-[#FE22C7]",
        "from-[#22FE8F] to-[#22C7FE]",
    ];
    const colorFor = (name) => colors[name?.charCodeAt(0) % colors.length];



    // CHECK IF ITS ADMIN OTHERWISE DISABLE ADDING STUDENTS

    const [role, setRole] = useState('user')
    const AUTH_URL = process.env.NEXT_PUBLIC_API_URL;
    useEffect(() => {

        async function checkRole() {
         
            if (!token) {
                return;
            }

            try {
                const res = await fetch(`${AUTH_URL}/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                setRole(data.user.role)
            } catch (error) {
                console.log(error)
            }
        }

        checkRole()
    }, [])



    return (
        <div className="min-h-screen bg-background text-foreground px-8  pt-24 md:pt-2 flex flex-col flex-1 items-center justify-center font-sans md:pl-[16%]">

            <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#7F22FE]/20 rounded-full blur-[120px]" />

            <div className="relative max-w-5xl mx-auto">

                <div className="text-center mb-4">
                    <span className="inline-block text-xs tracking-widest uppercase text-[#7F22FE] font-semibold mb-3">
                        Portal
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Students
                    </h1>
                    <p className="text-gray-400 mt-2">
                        {students.length} {students.length === 1 ? "student" : "students"} enrolled
                    </p>
                </div>


                {role == 'admin' &&
                    <form

                        onSubmit={handleSubmit}
                        className="max-w-2xl mx-auto mt-10 mb-14 flex flex-col md:flex-row gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-3 shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
                    >
                        <input
                            type="text"
                            placeholder="Student name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="flex-1 bg-transparent border border-transparent rounded-xl px-4 py-3 outline-none focus:border-[#7F22FE] focus:bg-white/5 transition-all placeholder:text-gray-500"
                        />
                        <input
                            type="email"
                            placeholder="Student email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 bg-transparent border border-transparent rounded-xl px-4 py-3 outline-none focus:border-[#7F22FE] focus:bg-white/5 transition-all placeholder:text-gray-500"
                        />
                        <button
                            type="submit"
                            disabled={submitting}
                            className="bg-gradient-to-r from-[#7F22FE] to-[#B14EFF] hover:shadow-[0_0_25px_rgba(127,34,254,0.5)] transition-all duration-300 text-white font-medium px-6 py-3 rounded-xl disabled:opacity-50 disabled:hover:shadow-none whitespace-nowrap"
                        >
                            {submitting ? "Adding..." : "+ Add Student"}
                        </button>
                    </form>
                }



                {error && (
                    <p className="text-center text-red-400 text-sm mb-8 bg-red-500/10 border border-red-500/20 rounded-lg py-2 max-w-md mx-auto">
                        {error}
                    </p>
                )}


                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-28 rounded-2xl bg-white/5 animate-pulse" />
                        ))}
                    </div>
                ) : students.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No students yet — add the first one above 👆</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {students.map((student) => (
                            <div
                                key={student.id}
                                className={`group relative border border-white/10 rounded-2xl p-5 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-[#7F22FE]/50 hover:shadow-[0_0_25px_rgba(127,34,254,0.15)] hover:-translate-y-1 ${deletingId === student.id ? "opacity-0 scale-95" : "opacity-100 scale-100"
                                    }`}
                            >
                                {
                                    role == 'admin' &&
                                    <button
                                        onClick={() => handleDelete(student.id)}
                                        className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                                        aria-label="Delete student"
                                    >
                                        ✕
                                    </button>
                                }

                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-11 h-11 rounded-full bg-gradient-to-br ${colorFor(student.name)} flex items-center justify-center text-white font-semibold text-lg shrink-0`}
                                    >
                                        {student.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="min-w-0">
                                        <h2 className="text-base font-semibold truncate">{student.name}</h2>
                                        <p className="text-sm text-gray-400 truncate">{student.email}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}