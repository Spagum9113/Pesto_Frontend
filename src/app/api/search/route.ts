// src/app/api/search/route.ts
import { NextResponse } from 'next/server';

const MOCK = [
    { id: 1, name: 'Alice', title: 'Frontend Wizard', avatar: '/fakepic1.png' },
    { id: 2, name: 'Bob', title: 'Backend Guru', avatar: '/fakepic1.png' },
    { id: 3, name: 'Cara', title: 'Full-Stack Ace', avatar: '/fakepic1.png' },
];

export async function GET(request: Request) {
    // we could read the query but for now just return all
    return NextResponse.json(MOCK);
}
