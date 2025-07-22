import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('query') || 'shopping';
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    return NextResponse.json({ error: 'Unsplash API key not set' }, { status: 500 });
  }

  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${accessKey}&per_page=10`
  );
  const data = await res.json();

  return NextResponse.json(data);
} 