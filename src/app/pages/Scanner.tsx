import { useState } from "react";
//import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router";
import { ArrowLeft, QrCode, Hash } from "lucide-react";
import { Link } from "react-router";

export default function Scanner() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);

  const handleScan = (result: any, error: any) => {
    if (result) {
      const eventId = result?.text;
      if (eventId) {
        navigate(`/vote?event=${eventId}`);
      }
    }
    if (error) {
      console.error(error);
      setError("Unable to access camera. Please check permissions.");
    }
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 4) {
      navigate(`/vote?event=${code}`);
    } else {
      setCodeError("Please enter a 4-digit code");
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCode(value);
    setCodeError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 pb-8">
        <div className="max-w-md mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-purple-100 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <QrCode className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Join Event</h1>
          </div>
          <p className="text-purple-100 text-sm">
            Scan QR code or enter event code
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8 space-y-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="aspect-square relative">
           
          </div>
          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-sm text-center">
              {error}
            </div>
          )}
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gradient-to-b from-purple-50 to-pink-50 text-gray-500">
              Or
            </span>
          </div>
        </div>

        <form onSubmit={handleCodeSubmit} className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <Hash className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-900">Enter Event Code</h3>
          </div>
          <div className="mb-4">
            <input
              type="text"
              inputMode="numeric"
              value={code}
              onChange={handleCodeChange}
              placeholder="0000"
              maxLength={4}
              className="w-full text-center text-3xl font-bold tracking-widest px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
            {codeError && (
              <p className="text-red-600 text-sm mt-2 text-center">{codeError}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={code.length !== 4}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Join Event
          </button>
        </form>
      </div>
    </div>
  );
}
