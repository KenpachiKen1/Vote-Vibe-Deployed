import { Music2, User } from "lucide-react";

interface NowPlayingProps {
  song: {
    title: string;
    artist: string;
    requestedBy: string;
  };
  timeRemaining: string;
}

export function NowPlaying({ song, timeRemaining }: NowPlayingProps) {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-6 text-white">
      <div className="flex items-center gap-2 mb-4">
        <Music2 className="w-5 h-5" />
        <span className="text-sm font-medium opacity-90">Now Playing</span>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-1">{song.title}</h2>
        <p className="text-purple-100">{song.artist}</p>
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span>Requested by {song.requestedBy}</span>
        </div>
        <div className="font-mono">{timeRemaining}</div>
      </div>
    </div>
  );
}
