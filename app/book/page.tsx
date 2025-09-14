import React from "react";

const BOOKING_API_URL = process.env.NEXT_PUBLIC_BOOKING_API_URL || process.env.BOOKING_API_URL;

export default function BookPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 p-0 m-0">
      <div className="w-full max-w-4xl h-[80vh] mt-8 rounded-xl shadow-2xl border-2 border-orange-200 overflow-hidden bg-white">
        <iframe
          src={BOOKING_API_URL}
          title="AI Voice Agent Booking"
          className="w-full h-full border-0"
          allow="microphone; autoplay"
        />
      </div>
      <p className="mt-4 text-orange-700 text-sm opacity-80">AI Voice Agent powered booking experience</p>
    </div>
  );
}
