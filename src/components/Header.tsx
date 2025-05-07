// src/components/Header.tsx

'use client';

import React from 'react';
import Link from 'next/link'

export default function Header() {
    return (
        <header className="w-full flex items-center justify-between px-6 py-4 border-b-2 bg-white">

            <Link href='/'>
                <h1 className="text-5xl font-bold text-black">Pesto</h1>
            </Link>


            <div className="flex items-center space-x-4">
                <button className="text-black px-4 py-2 rounded-full border-2 border-black hover:bg-gray-100 transition-colors">
                    Login
                </button>
                <button className="px-4 py-2 rounded-full bg-[#7A5128] text-white hover:opacity-90 transition-opacity">
                    Waitlist
                </button>
            </div>
        </header>
    );
}
