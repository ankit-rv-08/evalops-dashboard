"use client";

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

type ChartData = {
  scoring: string;
  count: number;
};

export function ScoringChart({ data }: { data: ChartData[] }) {
  if (data.length === 0) {
    return (
      <div className="bg-[#101012] border border-[#1F1F22] rounded-[10px] p-6 h-full flex flex-col">
        <h3 className="text-[14px] font-medium text-white mb-1">Runs by Scoring</h3>
        <p className="text-[11px] text-[#6B6B70] mb-4">No data yet</p>
        <div className="flex-1 flex items-center justify-center">
          <span className="text-[12px] text-[#6B6B70]">—</span>
        </div>
      </div>
    );
  }

  const maxCount = Math.max(...data.map((d) => d.count));

  return (
    <div className="bg-[#101012] border border-[#1F1F22] rounded-[10px] p-6 h-full flex flex-col">
      <h3 className="text-[14px] font-medium text-white mb-1">Runs by Scoring</h3>
      <p className="text-[11px] text-[#6B6B70] mb-4">Distribution of scoring methods</p>

      <div className="flex-1 min-h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 0, bottom: 0, left: 0 }}>
            <XAxis
              dataKey="scoring"
              tick={{ fill: "#6B6B70", fontSize: 10, fontFamily: "monospace" }}
              axisLine={{ stroke: "#1F1F22" }}
              tickLine={false}
            />
            <YAxis hide domain={[0, maxCount + 1]} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((entry, i) => (
                <Cell key={i} fill="#D4FF3A" fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-4 mt-3">
        {data.map((d) => (
          <div key={d.scoring} className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF3A]" />
            <span className="text-[11px] mono text-[#6B6B70]">{d.scoring}</span>
            <span className="text-[11px] mono font-medium text-white">{d.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
