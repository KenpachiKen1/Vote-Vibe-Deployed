import { useState } from "react";
import { Plus } from "lucide-react";

interface AddSongFormProps {
  onAddSong: (title: string, artist: string, requestedBy: string) => void;
}

export function AddSongForm({ onAddSong }: AddSongFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [requestedBy, setRequestedBy] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && artist.trim() && requestedBy.trim()) {
      onAddSong(title, artist, requestedBy);
      setTitle("");
      setArtist("");
      setRequestedBy("");
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-white rounded-xl shadow-sm p-4 flex items-center justify-center gap-2 text-purple-600 hover:bg-purple-50 transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span className="font-semibold">Request a Song</span>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Request a Song</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Song Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Enter song title"
            required
          />
        </div>
        <div>
          <label htmlFor="artist" className="block text-sm font-medium text-gray-700 mb-1">
            Artist
          </label>
          <input
            type="text"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Enter artist name"
            required
          />
        </div>
        <div>
          <label htmlFor="requestedBy" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="requestedBy"
            value={requestedBy}
            onChange={(e) => setRequestedBy(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            Add to Queue
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
