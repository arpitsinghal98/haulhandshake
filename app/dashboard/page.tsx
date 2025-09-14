"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/app/components/ui/card";
import { BarChart, Bar, XAxis, CartesianGrid, Rectangle, PieChart, Pie, Sector, Label, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartStyle } from "@/app/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
type StatusPieData = {
  status: string;
  count: number;
  fill: string;
};

type EquipmentTypeData = {
  equipment_type: string;
  count: number;
};

export default function DashboardPage() {
  // Pie chart for Loads by Status
  const [statusData, setStatusData] = useState<StatusPieData[]>([]);
  const [activeStatus, setActiveStatus] = useState<string>("open");
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  // Color mapping for statuses
  const statusColors: Record<string, string> = {
    open: "#f59e42",
    covered: "#38bdf8",
    cancelled: "#ef4444",
    delivered: "#22c55e",
  };

  useEffect(() => {
    async function fetchStatusData() {
      setLoadingStatus(true);
      setErrorStatus(null);
      try {
        const res = await fetch("/api/dashboard/loads/status", {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
          },
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        const arr: StatusPieData[] = Object.entries(data).map(([status, count]) => ({
          status,
          count: Number(count),
          fill: statusColors[status] || "#8884d8",
        }));
        setStatusData(arr);
        setActiveStatus(arr[0]?.status || "open");
      } catch (e: any) {
        setErrorStatus(e.message || "Unknown error");
      } finally {
        setLoadingStatus(false);
      }
    }
    fetchStatusData();
    // eslint-disable-next-line
  }, []);
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
  <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Top row: Stat Cards */}
    <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-900/80 rounded-2xl">
      <CardContent className="flex flex-col items-center py-10 px-4 gap-4">
        <span className="text-5xl text-orange-500 font-extrabold">{loadingLoads ? "..." : totalLoads}</span>
        <span className="text-lg text-gray-700 dark:text-gray-200 font-semibold">Total Loads</span>
        {errorLoads && <span className="text-red-500 text-sm mt-2">{errorLoads}</span>}
      </CardContent>
    </Card>
    <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-900/80 rounded-2xl">
      <CardContent className="flex flex-col items-center py-10 px-4 gap-4">
        <span className="text-5xl text-blue-500 font-extrabold">{loadingAICalls ? "..." : totalAICalls}</span>
        <span className="text-lg text-gray-700 dark:text-gray-200 font-semibold">Calls Processed</span>
        {errorAICalls && <span className="text-red-500 text-sm mt-2">{errorAICalls}</span>}
      </CardContent>
    </Card>
    {/* Second row: Pie and Bar Charts */}
  <Card className="flex flex-col shadow-xl border-0 bg-white/90 dark:bg-gray-900/80 rounded-2xl col-span-1 min-h-[420px] justify-center">
      <ChartStyle id="pie-status" config={{}} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Loads by Status</CardTitle>
          <CardDescription>Distribution of loads by status</CardDescription>
        </div>
        <Select value={activeStatus} onValueChange={setActiveStatus}>
          <SelectTrigger className="ml-auto h-7 w-[130px] rounded-lg pl-2.5" aria-label="Select status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {statusData.map((item) => (
              <SelectItem key={item.status} value={item.status} className="rounded-lg [&_span]:flex">
                <div className="flex items-center gap-2 text-xs">
                  <span className="flex h-3 w-3 shrink-0 rounded-xs" style={{ backgroundColor: item.fill }} />
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
  <CardContent className="flex flex-1 items-center justify-center py-4">
        {loadingStatus ? (
          <div className="text-center py-8">Loading...</div>
        ) : errorStatus ? (
          <div className="text-red-500 text-center py-8">{errorStatus}</div>
        ) : (
          <ChartContainer id="pie-status" config={{}} className="mx-auto aspect-square w-full max-w-[300px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={statusData}
                dataKey="count"
                nameKey="status"
                innerRadius={60}
                strokeWidth={5}
                activeIndex={statusData.findIndex((item) => item.status === activeStatus)}
                activeShape={({ outerRadius = 0, ...props }) => (
                  <g>
                    <Sector {...props} outerRadius={outerRadius + 10} />
                    <Sector {...props} outerRadius={outerRadius + 25} innerRadius={outerRadius + 12} />
                  </g>
                )}
                onMouseEnter={(_, idx) => setActiveStatus(statusData[idx].status)}
              >
                <Label
                  content={({ viewBox }) => {
                    const idx = statusData.findIndex((item) => item.status === activeStatus);
                    if (viewBox && "cx" in viewBox && "cy" in viewBox && idx !== -1) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                            {statusData[idx].count.toLocaleString()}
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                            {statusData[idx].status.charAt(0).toUpperCase() + statusData[idx].status.slice(1)}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-900/80 rounded-2xl col-span-1 min-h-[420px] flex flex-col justify-center">
      <CardHeader>
        <CardTitle>Open Loads by Equipment Type</CardTitle>
      </CardHeader>
  <CardContent className="flex flex-1 items-center justify-center py-4">
    {loadingEquipment ? (
      <div className="text-center py-8">Loading...</div>
    ) : errorEquipment ? (
      <div className="text-red-500 text-center py-8">{errorEquipment}</div>
    ) : (
      <ChartContainer config={{}} className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="90%" minWidth={220} minHeight={260}>
          <BarChart data={equipmentTypeData} barSize={48} margin={{ top: 24, right: 24, left: 24, bottom: 24 }}>
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
        </ResponsiveContainer>
      </ChartContainer>
    )}
  </CardContent>
      {/* No CardFooter for bar chart */}
    </Card>
      </div>
    </main>
  );
}
