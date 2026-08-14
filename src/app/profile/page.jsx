"use client"
import { getToken } from "@/Components/auth";
import NotAllowed from "@/Components/notAllowed";
import { useEffect, useState } from "react";


export default function profile() {

    const AuthUrl = process.env.NEXT_PUBLIC_API_URL;
    const [user, setUser] = useState(null)
    const [loading, setloading] = useState(false);
    const [inputdata, setInputdata] = useState('');
    const authUri = process.env.NEXT_PUBLIC_API_URL;

    async function HandleClick(e) {
        const token = getToken()
        e.preventDefault()

        try {
            const res = await fetch(`${authUri}/updateprofile`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    email: inputdata
                })
            })

            if (!res.ok) {
                console.log(data.message);
                return;
            }
            const data = await res.json();
            console.log("Updated user:", data.user);


            setUser(data.user);
            setInputdata("");

        } catch (error) {
            console.log(error);
        }

    }




    useEffect(() => {

        async function getMyProfile() {

            const token = getToken();

            if (!token) {
                return
            }
             setloading(true);

            try {
               
                const res = await fetch(`${AuthUrl}/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                const data = await res.json();
                setUser(data.user);
                console.log(data.user)
                setloading(false)

            } catch (error) {
                console.log(error)
                setloading(false)
            } finally {

                setloading(false)
            }
        }

        getMyProfile()
    }, [])

    if (loading) {
        return (
            <div classNameName="min-h-screen bg-background text-foreground px-8 pt-24 md:pt-2 flex flex-col flex-1 items-center justify-center font-sans md:pl-[16%]">
                <p classNameName="text-gray-400">Loading...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <NotAllowed />
        )
    }
    return (

        <div className="min-h-screen w-full bg-background text-foreground px-8 pt-24 md:pt-28 flex flex-col items-center font-sans md:pl-[16%]">

            <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#7F22FE]/20 rounded-full blur-[120px]"></div>

            <div className="relative w-full max-w-lg mx-auto">

                <header className="flex flex-col items-center gap-3 mb-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#7F22FE] to-[#B14EFF] flex items-center justify-center text-white font-semibold text-4xl ring-4 ring-white/10">

                    </div>
                    <h1 className="text-2xl font-semibold mt-2">{user.name}</h1>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                </header>

                <form className="flex flex-col gap-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-400">Full Name</label>
                        <input
                            type="text"
                            value={user.name}
                            disabled
                            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none text-gray-500 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-600 mt-1">Name cannot be changed</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-400">Role</label>
                        <input
                            type="text"
                            value={user.role}
                            disabled
                            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none text-gray-500 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-600 mt-1">Role cannot be changed</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-400">Email</label>
                        <input
                            type="email"
                            placeholder={user.email}
                            value={inputdata}
                            onChange={(e) => setInputdata(e.target.value)}
                            className="bg-transparent border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#7F22FE] focus:bg-white/5 transition-all placeholder:text-gray-500"
                        />
                    </div>

                    <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-3 hidden">
                        Error message goes here
                    </p>

                    <p className="text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-lg py-2 px-3 hidden">
                        Email updated successfully!
                    </p>

                    <button
                        onClick={HandleClick}
                        type="submit"
                        className="bg-gradient-to-r from-[#7F22FE] to-[#B14EFF] hover:shadow-[0_0_25px_rgba(127,34,254,0.5)] transition-all duration-300 text-white font-medium px-6 py-3 rounded-xl disabled:opacity-50 disabled:hover:shadow-none"
                    >
                        Save Changes
                    </button>

                </form>

            </div>
        </div>
    );
}
