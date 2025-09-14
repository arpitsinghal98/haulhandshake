"use client";
import Image from "next/image";
import Link from "next/link";
// import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Dialog, DialogTrigger, DialogContent } from "@/app/components/ui/dialog";

export default function Home() {
  // Get booking URL from env (Next.js runtime config)
  const BOOKING_API_URL = process.env.NEXT_PUBLIC_BOOKING_API_URL || process.env.BOOKING_API_URL;
  // Remove manual open state, let Dialog manage it
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-100 via-orange-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Container Bars Background */}
      <svg className="absolute left-0 top-0 h-full w-full pointer-events-none z-0" width="100%" height="100%" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" style={{minHeight:'100vh'}}>
        {/* Vertical bars */}
        <rect x="80" y="0" width="12" height="100%" fill="#fb923c" fillOpacity="0.18" rx="6" />
        <rect x="180" y="0" width="8" height="100%" fill="#fb923c" fillOpacity="0.12" rx="4" />
        <rect x="1360" y="0" width="12" height="100%" fill="#fb923c" fillOpacity="0.18" rx="6" />
        <rect x="1260" y="0" width="8" height="100%" fill="#fb923c" fillOpacity="0.12" rx="4" />
        {/* Joints (circles) on bars */}
        {/* Left bars joints */}
        <circle cx="86" cy="40" r="10" fill="#fb923c" fillOpacity="0.25" stroke="#fb923c" strokeWidth="2" />
        <circle cx="86" cy="860" r="10" fill="#fb923c" fillOpacity="0.25" stroke="#fb923c" strokeWidth="2" />
        <circle cx="184" cy="80" r="7" fill="#fb923c" fillOpacity="0.18" stroke="#fb923c" strokeWidth="1.5" />
        <circle cx="184" cy="820" r="7" fill="#fb923c" fillOpacity="0.18" stroke="#fb923c" strokeWidth="1.5" />
        {/* Right bars joints */}
        <circle cx="1366" cy="40" r="10" fill="#fb923c" fillOpacity="0.25" stroke="#fb923c" strokeWidth="2" />
        <circle cx="1366" cy="860" r="10" fill="#fb923c" fillOpacity="0.25" stroke="#fb923c" strokeWidth="2" />
        <circle cx="1264" cy="80" r="7" fill="#fb923c" fillOpacity="0.18" stroke="#fb923c" strokeWidth="1.5" />
        <circle cx="1264" cy="820" r="7" fill="#fb923c" fillOpacity="0.18" stroke="#fb923c" strokeWidth="1.5" />
        {/* Decorative orange wave */}
        <path fill="#fb923c" fillOpacity="0.13" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,900L0,900Z" />
      </svg>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 py-24 px-4 text-center relative z-10">
        <Image
          src="/logo.png"
          alt="HaulHandshake Logo"
          width={110}
          height={110}
          className="mb-8 rounded-full shadow-2xl border-4 border-white dark:border-gray-800 z-10"
          priority
        />
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 drop-shadow-lg z-10">
          Find Your Next Load Instantly
        </h1>
        <p className="text-2xl text-orange-700 dark:text-orange-300 font-semibold mb-2 z-10">
          AI-Powered, Hassle-Free.
        </p>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mb-10 z-10">
          No signup. No waiting. Discover, book, and move loads with the power of AI—anytime, anywhere.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center z-10">
          <Link href="/dashboard">
            <Button size="lg" className="text-lg px-10 py-6 rounded-full shadow-lg bg-orange-500 hover:bg-orange-600 text-white">
              Go to Dashboard
            </Button>
          </Link>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-6 rounded-full shadow-lg border-orange-500 text-orange-700 dark:text-orange-300"
              >
                Book a Load
              </Button>
            </DialogTrigger>
            <DialogContent
              className="max-w-3xl w-full p-0 overflow-hidden bg-white rounded-xl border-orange-200"
              onInteractOutside={e => e.preventDefault()}
              onEscapeKeyDown={e => e.preventDefault()}
            >
              <div className="w-full h-[70vh] flex flex-col px-0 pb-0">
                <iframe
                  src={BOOKING_API_URL}
                  title="AI Voice Agent Booking"
                  className="w-full h-full border-0"
                  allow="microphone; autoplay"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* How It Works Section - Container Theme */}
      <section className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 pb-20 mt-[-40px] z-20">
        {/* Container Card 1 */}
        <Card className="shadow-xl border-0 bg-gradient-to-br from-orange-200 via-orange-100 to-white dark:from-orange-900/60 dark:to-gray-900/80 relative overflow-hidden" style={{borderRadius:'18px', border:'2px solid #fb923c', boxShadow:'0 8px 32px 0 rgba(251,146,60,0.15)'}}>
          <div className="absolute top-0 left-0 w-full h-2 bg-orange-400 rounded-t-md" style={{boxShadow:'0 2px 8px 0 #fb923c33'}}></div>
          <CardContent className="flex flex-col items-center py-10 px-4 gap-4">
            {/* Truck SVG */}
            <svg width="56" height="48" fill="none" viewBox="0 0 56 48"><rect x="2" y="16" width="36" height="18" rx="3" fill="#fdba74" stroke="#fb923c" strokeWidth="2.5"/><rect x="38" y="22" width="14" height="12" rx="2.5" fill="#fbbf24" stroke="#fb923c" strokeWidth="2.5"/><circle cx="12" cy="38" r="4" fill="#fff7ed" stroke="#fb923c" strokeWidth="2.5"/><circle cx="44" cy="38" r="4" fill="#fff7ed" stroke="#fb923c" strokeWidth="2.5"/></svg>
            <h2 className="text-xl font-bold text-orange-900 dark:text-orange-100">Find Loads</h2>
            <p className="text-orange-900/80 dark:text-orange-100/80 text-center">
              Search open loads by origin, destination, equipment, and more. Our AI matches you with the best opportunities.
            </p>
          </CardContent>
        </Card>
        {/* Container Card 2 */}
        <Card className="shadow-xl border-0 bg-gradient-to-br from-orange-200 via-orange-100 to-white dark:from-orange-900/60 dark:to-gray-900/80 relative overflow-hidden" style={{borderRadius:'18px', border:'2px solid #fb923c', boxShadow:'0 8px 32px 0 rgba(251,146,60,0.15)'}}>
          <div className="absolute top-0 left-0 w-full h-2 bg-orange-400 rounded-t-md" style={{boxShadow:'0 2px 8px 0 #fb923c33'}}></div>
          <CardContent className="flex flex-col items-center py-10 px-4 gap-4">
            {/* Container SVG */}
            <svg width="56" height="48" fill="none" viewBox="0 0 56 48"><rect x="6" y="18" width="44" height="14" rx="3" fill="#fbbf24" stroke="#fb923c" strokeWidth="2.5"/><rect x="10" y="22" width="8" height="6" rx="1.5" fill="#fdba74" stroke="#fb923c" strokeWidth="1.5"/><rect x="22" y="22" width="8" height="6" rx="1.5" fill="#fdba74" stroke="#fb923c" strokeWidth="1.5"/><rect x="34" y="22" width="8" height="6" rx="1.5" fill="#fdba74" stroke="#fb923c" strokeWidth="1.5"/></svg>
            <h2 className="text-xl font-bold text-orange-900 dark:text-orange-100">Book Instantly</h2>
            <p className="text-orange-900/80 dark:text-orange-100/80 text-center">
              See all load details and book with one click. No signup, no hassle—just book and go.
            </p>
          </CardContent>
        </Card>
        {/* Container Card 3 */}
        <Card className="shadow-xl border-0 bg-gradient-to-br from-orange-200 via-orange-100 to-white dark:from-orange-900/60 dark:to-gray-900/80 relative overflow-hidden" style={{borderRadius:'18px', border:'2px solid #fb923c', boxShadow:'0 8px 32px 0 rgba(251,146,60,0.15)'}}>
          <div className="absolute top-0 left-0 w-full h-2 bg-orange-400 rounded-t-md" style={{boxShadow:'0 2px 8px 0 #fb923c33'}}></div>
          <CardContent className="flex flex-col items-center py-10 px-4 gap-4">
            {/* AI/Automation SVG */}
            <svg width="56" height="48" fill="none" viewBox="0 0 56 48"><rect x="8" y="18" width="40" height="14" rx="3" fill="#fff7ed" stroke="#fb923c" strokeWidth="2.5"/><circle cx="28" cy="25" r="4" fill="#fbbf24" stroke="#fb923c" strokeWidth="2.5"/><rect x="18" y="22" width="4" height="6" rx="1.5" fill="#fdba74" stroke="#fb923c" strokeWidth="1.5"/><rect x="34" y="22" width="4" height="6" rx="1.5" fill="#fdba74" stroke="#fb923c" strokeWidth="1.5"/></svg>
            <h2 className="text-xl font-bold text-orange-900 dark:text-orange-100">Powered by AI</h2>
            <p className="text-orange-900/80 dark:text-orange-100/80 text-center">
              Our AI engine works 24/7 to match you with the best loads, optimize your routes, and maximize your earnings.
            </p>
          </CardContent>
        </Card>
      </section>

      <footer className="py-6 text-orange-400 text-xs text-center border-t border-orange-200 dark:border-orange-700 bg-white/70 dark:bg-gray-900/70">
        &copy; {new Date().getFullYear()} HaulHandshake. All rights reserved.
      </footer>
    </div>
  );
}
