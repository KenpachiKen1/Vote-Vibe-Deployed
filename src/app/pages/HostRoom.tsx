import { QRCodeCanvas } from "qrcode.react";
import { Link } from "react-router";
import { ArrowLeft, QrCode, Music2 } from "lucide-react";

export default function HostRoom() {
  const eventCode = "1234";
  const voteUrl = `${window.location.origin}/vote?event=${eventCode}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 p-6">
      <div className="max-w-md mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4">
            <QrCode className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Voting Room</h1>

          <p className="text-gray-600 mb-6">
            Guests can scan this QR code with their phone camera to join.
          </p>

          <div className="flex justify-center bg-white p-4 rounded-xl border mb-4">
            <QRCodeCanvas value={voteUrl} size={220} />
          </div>

          <p className="text-sm text-gray-500 mb-1">Event Code</p>
          <p className="text-3xl font-bold tracking-widest text-purple-700 mb-6">
            {eventCode}
          </p>

          <Link
            to={`/vote?event=${eventCode}`}
            className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold"
          >
            <Music2 className="w-5 h-5" />
            Open Voting Queue
          </Link>

          <p className="text-xs text-gray-400 mt-4 break-all">{voteUrl}</p>
        </div>
      </div>
    </div>
  );
}
