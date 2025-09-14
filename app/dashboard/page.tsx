"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/app/components/ui/card";

export default function DashboardPage() {
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTotal() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/dashboard/loads/total", {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
          },
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setTotal(data.total);
      } catch (e: any) {
        setError(e.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchTotal();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex flex-col items-center py-16">
      <h1 className="text-3xl font-bold mb-8 text-orange-900">Dashboard</h1>
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-900/80 rounded-2xl">
          <CardContent className="flex flex-col items-center py-10 px-4 gap-4">
            <span className="text-5xl text-orange-500 font-extrabold">{loading ? "..." : total}</span>
            <span className="text-lg text-gray-700 dark:text-gray-200 font-semibold">Total Loads</span>
            {error && <span className="text-red-500 text-sm mt-2">{error}</span>}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
