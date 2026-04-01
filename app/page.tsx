"use client";

import { useEffect, useState } from "react";
import { Music } from "lucide-react";

export default function Home() {
  const [tracks, setTracks] = useState([]);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/tracks")
      .then(res => res.json())
      .then(setTracks);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-6">
          <Music className="text-indigo-500"/> My Music Hub
        </h1>

        <div className="space-y-3">
          {tracks.map((track: any) => (
            <div
              key={track.id}
              onClick={() => setCurrent(track)}
              className="p-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 cursor-pointer transition"
            >
              <div className="font-semibold">{track.title}</div>
              <div className="text-sm text-zinc-400">{track.artist}</div>
            </div>
          ))}
        </div>

        {current && (
          <div className="mt-8">
            <audio
              controls
              autoPlay
              src={`https://api.telegram.org/file/botTOKEN/${current.file_id}`}
              className="w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}
