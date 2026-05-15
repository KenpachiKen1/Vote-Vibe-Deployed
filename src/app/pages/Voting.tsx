import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { PartyPopper, ArrowLeft, Clock } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { NowPlaying } from "../components/NowPlaying";
import { SongCard } from "../components/SongCard";
import { AddSongForm } from "../components/AddSongForm";
import { Song } from "../types/song";

const VOTE_DURATION = 30;

const initialSongs: Song[] = [
  {
    id: "1",
    title: "Anti-Hero",
    artist: "Taylor Swift",
    requestedBy: "Mike R.",
    votes: 2,
  },
  {
    id: "2",
    title: "As It Was",
    artist: "Harry Styles",
    requestedBy: "Emma K.",
    votes: 1,
  },
  {
    id: "3",
    title: "Heat Waves",
    artist: "Glass Animals",
    requestedBy: "Alex P.",
    votes: 1,
  },
  {
    id: "4",
    title: "Shivers",
    artist: "Ed Sheeran",
    requestedBy: "Jamie L.",
    votes: 0,
  },
  {
    id: "5",
    title: "Save Your Tears",
    artist: "The Weeknd",
    requestedBy: "Chris B.",
    votes: 0,
  },
];

export default function Voting() {
  const [searchParams] = useSearchParams();
  const eventCode = searchParams.get("event") || "1234";

  const [nowPlaying, setNowPlaying] = useState({
    title: "Blinding Lights",
    artist: "The Weeknd",
    requestedBy: "Sarah M.",
  });

  const [songs, setSongs] = useState<Song[]>(initialSongs);
  const [votedSongId, setVotedSongId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(VOTE_DURATION);

  const sortedSongs = [...songs].sort((a, b) => b.votes - a.votes);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleRoundEnd();
      return;
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [timeLeft]);

  const handleRoundEnd = () => {
    if (sortedSongs.length === 0) {
      setTimeLeft(VOTE_DURATION);
      return;
    }

    const winner = sortedSongs[0];

    setNowPlaying({
      title: winner.title,
      artist: winner.artist,
      requestedBy: winner.requestedBy,
    });

    setSongs((prevSongs) => prevSongs.filter((song) => song.id !== winner.id));
    setVotedSongId(null);
    setTimeLeft(VOTE_DURATION);
  };

  const handleVote = (id: string) => {
    if (votedSongId === id) return;

    setSongs((prevSongs) =>
      prevSongs.map((song) => {
        if (song.id === id) {
          return { ...song, votes: song.votes + 1 };
        }

        if (song.id === votedSongId) {
          return { ...song, votes: Math.max(0, song.votes - 1) };
        }

        return song;
      })
    );

    setVotedSongId(id);
  };

  const handleAddSong = (
    title: string,
    artist: string,
    requestedBy: string
  ) => {
    const newSong: Song = {
      id: Date.now().toString(),
      title,
      artist,
      requestedBy,
      votes: 0,
    };

    setSongs((prevSongs) => [...prevSongs, newSong]);
  };

  const formattedTime = `0:${timeLeft.toString().padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Home</span>
        </Link>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <PartyPopper className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl text-gray-900">Party Queue</h1>
          </div>

          <p className="text-gray-600">Event Code: {eventCode}</p>
        </div>

        <div className="mb-4">
          <NowPlaying song={nowPlaying} timeRemaining={formattedTime} />
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-700">
            <Clock className="w-5 h-5 text-purple-600" />
            <span className="font-semibold">Voting closes in</span>
          </div>

          <span className="text-2xl font-bold text-purple-700">
            {formattedTime}
          </span>
        </div>

        <div className="mb-8">
          <AddSongForm onAddSong={handleAddSong} />
        </div>

        <div className="mb-4">
          <h2 className="text-xl text-gray-900 mb-4">Up Next</h2>

          {sortedSongs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-6 text-center text-gray-600">
              No songs in the queue. Add a song to keep the party going.
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {sortedSongs.map((song, index) => (
                  <SongCard
                    key={song.id}
                    song={song}
                    rank={index + 1}
                    onVote={handleVote}
                    hasVoted={votedSongId === song.id}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
