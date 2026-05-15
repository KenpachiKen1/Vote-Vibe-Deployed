import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { PartyPopper, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { NowPlaying } from "../components/NowPlaying";
import { SongCard } from "../components/SongCard";
import { AddSongForm } from "../components/AddSongForm";
import { Song } from "../types/song";

const initialSongs: Song[] = [
  {
    id: "1",
    title: "Anti-Hero",
    artist: "Taylor Swift",
    requestedBy: "Mike R.",
    votes: 24,
  },
  {
    id: "2",
    title: "As It Was",
    artist: "Harry Styles",
    requestedBy: "Emma K.",
    votes: 18,
  },
  {
    id: "3",
    title: "Heat Waves",
    artist: "Glass Animals",
    requestedBy: "Alex P.",
    votes: 15,
  },
  {
    id: "4",
    title: "Shivers",
    artist: "Ed Sheeran",
    requestedBy: "Jamie L.",
    votes: 12,
  },
  {
    id: "5",
    title: "Save Your Tears",
    artist: "The Weeknd",
    requestedBy: "Chris B.",
    votes: 9,
  },
];

export default function Voting() {
  const [nowPlaying] = useState({
    title: "Blinding Lights",
    artist: "The Weeknd",
    requestedBy: "Sarah M.",
  });

  const [songs, setSongs] = useState<Song[]>(initialSongs);
  const [votedSongs, setVotedSongs] = useState<Set<string>>(new Set());

  const handleVote = (id: string) => {
    if (votedSongs.has(id)) {
      setSongs(
        songs.map((song) =>
          song.id === id ? { ...song, votes: song.votes - 1 } : song
        )
      );
      setVotedSongs((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } else {
      setSongs(
        songs.map((song) =>
          song.id === id ? { ...song, votes: song.votes + 1 } : song
        )
      );
      setVotedSongs((prev) => new Set(prev).add(id));
    }
  };

  const handleAddSong = (title: string, artist: string, requestedBy: string) => {
    const newSong: Song = {
      id: Date.now().toString(),
      title,
      artist,
      requestedBy,
      votes: 0,
    };
    setSongs([...songs, newSong]);
  };

  const sortedSongs = [...songs].sort((a, b) => b.votes - a.votes);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Home</span>
        </Link>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <PartyPopper className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl text-gray-900">Party Queue</h1>
          </div>
          <p className="text-gray-600">Vote for the next song!</p>
        </div>

        <div className="mb-8">
          <NowPlaying song={nowPlaying} timeRemaining="2:14" />
        </div>

        <div className="mb-8">
          <AddSongForm onAddSong={handleAddSong} />
        </div>

        <div className="mb-4">
          <h2 className="text-xl text-gray-900 mb-4">Up Next</h2>
          <div className="space-y-3">
            <AnimatePresence>
              {sortedSongs.map((song, index) => (
                <SongCard
                  key={song.id}
                  song={song}
                  rank={index + 1}
                  onVote={handleVote}
                  hasVoted={votedSongs.has(song.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
