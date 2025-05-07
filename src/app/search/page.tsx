// src/app/search/page.tsx

'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Image from 'next/image'

interface Profile {
    id: number;
    name: string;
    title: string;
    avatar: string;
}

export default function SearchResults() {
    const params = useSearchParams();
    const q = params.get('q') || '';
    const [results, setResults] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!q) return;          // nothing to do if no query
        setLoading(true);
        fetch(`/api/search?q=${encodeURIComponent(q)}`)
            .then((res) => res.json())
            .then((data: Profile[]) => setResults(data))
            .finally(() => setLoading(false));
    }, [q]);

    const handleConnect = async (id: number) => {
        try {
            const res = await fetch(`/api/connect?id=${id}`)
            if (!res.ok) throw new Error('Network error')
            alert('Invite sent! 📧')
        } catch (err) {
            console.error(err)
            alert('Oops, something went wrong.')
        }
    }


    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="px-6 py-10">
                <h2 className="text-2xl text-black font-bold mb-4">Results for “{q}”</h2>
                {loading ? (
                    <p>Loading…</p>
                ) : results.length === 0 ? (
                    <p>No results found.</p>
                ) : (
                    <ul className="space-y-4">
                        {results.map((p) => (
                            <li
                                key={p.id}
                                className="flex items-center space-x-4 bg-gray-100 p-4 rounded"
                            >
                                <Image
                                    src={p.avatar}
                                    alt={p.name}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <p className="font-semibold text-black">{p.name}</p>
                                    <p className="text-sm text-gray-600">{p.title}</p>
                                </div>

                                {/* Connect Button */}
                                <div className="ml-auto">
                                    <button
                                        className="text-black px-4 py-2 rounded-full border-2 border-black hover:bg-gray-100 transition-colors align-right hover:scale-105"
                                        onClick={() => handleConnect(p.id)}
                                    >
                                        Connect
                                    </button>


                                    {/* Test Connect Button */}
                                    <button
                                        className="text-black px-4 py-2 rounded-full border-2 border-black hover:bg-gray-100 transition-colors align-right hover:scale-105"
                                        onClick={() => handleConnect(1)}
                                    >
                                        CONNECT TEST
                                    </button>

                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </div>
    );
}
