"use client"
import React, { useState } from 'react'
import { contactData } from '../Assets/data';
import { SectionTitle } from '@/Components/SectionTitle';


export default function ContactForm () {
  const {title ,subtitle } = contactData;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <section className='hero-glow min-h-screen overflow-hidden   px-8  pt-28 md:pt-25  flex flex-col gap-6  items-center justify-center font-sans md:pl-[18%]'>

    <SectionTitle title = {title} description = {description} />

    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-md border border-[#163ed973] rounded-lg p-6 bg-transparent">
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-400">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          className="border border-[#8080802f] rounded-md p-2 px-4 outline-none focus:outline focus:outline-1 focus:outline-[#7F22FE] transition-all duration-300"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-400">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="border border-[#8080802f] rounded-md p-2 px-4 outline-none focus:outline focus:outline-1 focus:outline-[#7F22FE] transition-all duration-300"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-400">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us how we can help..."
          rows={4}
          className="border border-[#8080802f] rounded-md p-2 px-4 outline-none focus:outline focus:outline-1 focus:outline-[#7F22FE] transition-all duration-300 resize-none"
        />
      </div>

      <button type="submit" className="border border-[#8080802f] rounded-md p-2 px-4 cursor-pointer hover:bg-[#8080802f] hover:border-[#7F22FE]/50 transition-all duration-300 active:scale-95">
        Send Message
      </button>
    </form>
        </section>
  )
}
