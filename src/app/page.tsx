'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { Analytics } from "@vercel/analytics/react"

import Header from '@/components/Header';

export default function Home() {

  // const for the form to store and change query
  const router = useRouter();                  // ← initialize router
  const [search, setSearch] = useState('');

  // handle submit logic for form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(search)}`);
  }



  return (
    <div className="min-h-screen bg-white bg-grid ">


      <div className="px-6">
        <Analytics />
        <Header />
        {/* Main Box */}
        <div className="mx-auto my-30 w-full max-w-3xl bg-white border-3 border-black rounded-2xl shadow p-8 text-center ">

          <h1 className="text-3xl font-bold text-black px-20">
            Who do you want to find?
          </h1>

          <h3 className="mt-2 text-lg text-gray-800">
            I match you with the perfect co-founder across Melbourne
          </h3>


          {/* Search Bar */}
          <form
            onSubmit={handleSubmit}
            className="mx-auto my-8 flex max-w-xl items-center space-x-2"
          >
            <input

              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type your request…"
              className="flex-grow border border-gray-300 text-black sounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-amber-800 text-white rounded-r-lg hover:opacity-90 transition"
            >
              Search
            </button>
          </form>



          <p className="mt-4 text-sm text-gray-400">
            Try: “I need a technical uni student co-founder that is passionate about edtech”
          </p>
        </div>



        {/* Powered by MLAI at bottom */}
        <div className="text-center mt-12">
          <p className="text-xs text-gray-500">powered by MLAI Aus</p>
        </div>
      </div>
    </div >
  );
}
