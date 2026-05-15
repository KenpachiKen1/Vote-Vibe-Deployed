import { Music2, TrendingUp, QrCode } from "lucide-react";
import { Link } from "react-router";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4">
            <Music2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Music Vote
          </h1>
          <p className="text-gray-600">
            Vote for your favorite tracks and see what's trending
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/scanner"
            className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-center gap-3">
              <QrCode className="w-6 h-6" />
              <span className="font-semibold">Scan Event QR Code</span>
            </div>
          </Link>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-start gap-3 mb-3">
              <TrendingUp className="w-5 h-5 text-purple-600 mt-1" />
              <div>
                <h2 className="font-semibold text-gray-900 mb-1">How it works</h2>
                <p className="text-sm text-gray-600">
                  Scan the event QR code to join. Upvote songs you love, downvote ones you don't. Watch the rankings change in real-time as others vote.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
