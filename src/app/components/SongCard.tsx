import { motion } from "motion/react";
import { Music, ChevronUp } from "lucide-react";
import { Song } from "../types/song";

interface SongCardProps {
  song: Song;
  rank: number;
  onVote: (songId: string) => void;
  hasVoted: boolean;
}

export function SongCard({ song, rank, onVote, hasVoted }: SongCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <Music className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{song.title}</h3>
          <p className="text-sm text-gray-600 truncate">{song.artist}</p>
          <p className="text-xs text-gray-400">Requested by {song.requestedBy}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{song.votes}</div>
          <div className="text-xs text-gray-500">votes</div>
        </div>
        <button
          onClick={() => onVote(song.id)}
          className={`p-3 rounded-lg transition-all active:scale-95 ${
            hasVoted
              ? "bg-purple-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          aria-label={hasVoted ? "Remove vote" : "Vote"}
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      </div>
    </motion.div>
  );
}
