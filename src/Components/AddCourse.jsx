"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export const AddCourse = ({onCourseAdded }) => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        original_price: "",
        off: "",
        img: "",
        bubbles: "", 
        feature: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);

        try {
            const payload = {
                ...formData,
                price: Number(formData.price),
                original_price: Number(formData.original_price),
                bubbles: formData.bubbles
                    .split(",")
                    .map((b) => b.trim())
                    .filter(Boolean),
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData?.errors?.[0]?.msg || "Failed to add course");
            }

            setSuccess(true);
            setFormData({
                title: "",
                description: "",
                price: "",
                original_price: "",
                off: "",
                img: "",
                bubbles: "",
                feature: false,
            });

            onCourseAdded?.(); 
            router.refresh();

        } catch (err) {
            console.error("Error adding course:", err);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-4 max-w-xl w-full mx-auto p-6 rounded-lg border border-[#8080802f] bg-white'
        >
            <h2 className='text-2xl font-semibold mb-2'>Add a New Course</h2>

            <div className='flex flex-col gap-1'>
                <label className='text-sm text-gray-600'>Title</label>
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className='p-2 border border-[#3123c170] rounded-md outline-0 ring-1 ring-[#a8a8d649] focus:ring-[#7F22FE]'
                    placeholder='e.g. Python for Beginners'
                />
            </div>

     

            <div className='flex flex-col gap-1'>
                <label className='text-sm text-gray-600'>Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    className='p-2 border border-[#3123c170] rounded-md outline-0 ring-1 ring-[#a8a8d649] focus:ring-[#7F22FE] resize-none'
                    placeholder='Short course description...'
                />
            </div>

            <div className='flex gap-3'>
                <div className='flex flex-col gap-1 flex-1'>
                    <label className='text-sm text-gray-600'>Price ($)</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className='p-2 border border-[#3123c170] rounded-md outline-0 ring-1 ring-[#a8a8d649] focus:ring-[#7F22FE]'
                        placeholder='150'
                    />
                </div>
                <div className='flex flex-col gap-1 flex-1'>
                    <label className='text-sm text-gray-600'>Original Price ($)</label>
                    <input
                        type="number"
                        name="original_price"
                        value={formData.original_price}
                        onChange={handleChange}
                        className='p-2 border border-[#3123c170] rounded-md outline-0 ring-1 ring-[#a8a8d649] focus:ring-[#7F22FE]'
                        placeholder='400'
                    />
                </div>
            </div>

            <div className='flex flex-col gap-1'>
                <label className='text-sm text-gray-600'>Discount Label</label>
                <input
                    name="off"
                    value={formData.off}
                    onChange={handleChange}
                    className='p-2 border border-[#3123c170] rounded-md outline-0 ring-1 ring-[#a8a8d649] focus:ring-[#7F22FE]'
                    placeholder='e.g. 60% OFF'
                />
            </div>

            <div className='flex flex-col gap-1'>
                <label className='text-sm text-gray-600'>Image URL</label>
                <input
                    name="img"
                    value={formData.img}
                    onChange={handleChange}
                    className='p-2 border border-[#3123c170] rounded-md outline-0 ring-1 ring-[#a8a8d649] focus:ring-[#7F22FE]'
                    placeholder='https://...'
                />
            </div>

            <div className='flex flex-col gap-1'>
                <label className='text-sm text-gray-600'>Tags (comma-separated)</label>
                <input
                    name="bubbles"
                    value={formData.bubbles}
                    onChange={handleChange}
                    className='p-2 border border-[#3123c170] rounded-md outline-0 ring-1 ring-[#a8a8d649] focus:ring-[#7F22FE]'
                    placeholder='Python, Beginner Friendly, Hands-on'
                />
            </div>

            <label className='flex items-center gap-2 text-sm text-gray-600'>
                <input
                    type="checkbox"
                    name="feature"
                    checked={formData.feature}
                    onChange={handleChange}
                />
                Feature this course
            </label>

            {error && (
                <p className='text-red-500 text-sm'>{error}</p>
            )}
            {success && (
                <p className='text-green-600 text-sm'>Course added successfully!</p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className='mt-2 bg-[#7F22FE] text-white py-2 rounded-md hover:bg-[#7F22FE]/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
            >
                {isSubmitting ? "Adding..." : "Add Course"}
            </button>
        </form>
    );
}