"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/app/components/ui/card";
import { BarChart, Bar, XAxis, CartesianGrid, Rectangle } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/app/components/ui/chart";

type EquipmentTypeData = {
  equipment_type: string;
  count: number;
};

export default function DashboardPage() {
  const [equipmentTypeData, setEquipmentTypeData] = useState<EquipmentTypeData[]>([]);
  const [loadingEquipment, setLoadingEquipment] = useState(true);
  const [errorEquipment, setErrorEquipment] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEquipmentTypeData() {
      setLoadingEquipment(true);
      setErrorEquipment(null);
      try {
        const res = await fetch("/api/dashboard/loads/equipment-type", {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
          },
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setEquipmentTypeData(data);
      } catch (e: any) {
        setErrorEquipment(e.message || "Unknown error");
      } finally {
        setLoadingEquipment(false);
      }
    }
    fetchEquipmentTypeData();
  }, []);
  const [totalLoads, setTotalLoads] = useState<number | null>(null);
  const [loadingLoads, setLoadingLoads] = useState(true);
  const [errorLoads, setErrorLoads] = useState<string | null>(null);

  const [totalAICalls, setTotalAICalls] = useState<number | null>(null);
  const [loadingAICalls, setLoadingAICalls] = useState(true);
  const [errorAICalls, setErrorAICalls] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTotalLoads() {
      setLoadingLoads(true);
      setErrorLoads(null);
      try {
        const res = await fetch("/api/dashboard/loads/total", {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
          },
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setTotalLoads(data.total);
      } catch (e: any) {
        setErrorLoads(e.message || "Unknown error");
      } finally {
        setLoadingLoads(false);
      }
    }
    async function fetchTotalAICalls() {
      setLoadingAICalls(true);
      setErrorAICalls(null);
      try {
        const res = await fetch("/api/dashboard/ai-calls/total", {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
          },
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setTotalAICalls(data.total);
      } catch (e: any) {
        setErrorAICalls(e.message || "Unknown error");
      } finally {
        setLoadingAICalls(false);
      }
    }
    fetchTotalLoads();
    fetchTotalAICalls();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex flex-col items-center py-16">
      <h1 className="text-3xl font-bold mb-8 text-orange-900">Dashboard</h1>
  <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Bar Chart for Open Loads by Equipment Type */}
        <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-900/80 rounded-2xl col-span-1 md:col-span-2 xl:col-span-1">
          <CardHeader>
            <CardTitle>Open Loads by Equipment Type</CardTitle>
            <CardDescription>Current open loads grouped by equipment type</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingEquipment ? (
              <div className="text-center py-8">Loading...</div>
            ) : errorEquipment ? (
              <div className="text-red-500 text-center py-8">{errorEquipment}</div>
            ) : (
              <ChartContainer config={{}}>
                <BarChart width={320} height={220} data={equipmentTypeData} barSize={32}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="equipment_type" tickLine={false} tickMargin={10} axisLine={false} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Bar
                    dataKey="count"
                    fill="#f59e42"
                    radius={8}
                    activeBar={({ ...props }) => (
                      <Rectangle
                        {...props}
                        fillOpacity={0.8}
                        stroke="#f59e42"
                        strokeDasharray={4}
                        strokeDashoffset={4}
                      />
                    )}
                  />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="text-muted-foreground leading-none">
              Showing open loads by equipment type
            </div>
          </CardFooter>
        </Card>
        {/* Total Loads Stat Card */}
        <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-900/80 rounded-2xl">
          <CardContent className="flex flex-col items-center py-10 px-4 gap-4">
            <span className="text-5xl text-orange-500 font-extrabold">{loadingLoads ? "..." : totalLoads}</span>
            <span className="text-lg text-gray-700 dark:text-gray-200 font-semibold">Total Loads</span>
            {errorLoads && <span className="text-red-500 text-sm mt-2">{errorLoads}</span>}
          </CardContent>
        </Card>
        {/* Total AI Calls Stat Card */}
        <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-900/80 rounded-2xl">
          <CardContent className="flex flex-col items-center py-10 px-4 gap-4">
            <span className="text-5xl text-blue-500 font-extrabold">{loadingAICalls ? "..." : totalAICalls}</span>
            <span className="text-lg text-gray-700 dark:text-gray-200 font-semibold">Calls Processed</span>
            {errorAICalls && <span className="text-red-500 text-sm mt-2">{errorAICalls}</span>}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
