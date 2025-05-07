// src/app/search/page.tsx

'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';

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

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="px-6 py-10">
                <h2 className="text-2xl font-bold mb-4">Results for “{q}”</h2>
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
                                <img
                                    src={p.avatar}
                                    alt={p.name}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <p className="font-semibold">{p.name}</p>
                                    <p className="text-sm text-gray-600">{p.title}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </div>
    );
}
