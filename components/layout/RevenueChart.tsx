"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type RevenueChartRow = {
  month: string;
  revenue: number;
};

export default function RevenueChart({
  data,
  revenueLabel = "Revenue",
}: {
  data: RevenueChartRow[];
  revenueLabel?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
          width={64}
          tickFormatter={(value) => `€ ${value}`}
        />
        <Tooltip
          cursor={{ fill: "var(--muted)" }}
          formatter={(value) => [`€ ${value}`, revenueLabel]}
        />
        <Bar
          dataKey="revenue"
          fill="var(--chart-1)"
          radius={[4, 4, 0, 0]}
          maxBarSize={48}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
