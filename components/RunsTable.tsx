"use client";

import type { RunSummary } from "@/lib/api";
import { API_BASE } from "@/lib/api";

function timeAgo(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function accuracyColor(acc: number): string {
  if (acc >= 0.9) return "#D4FF3A";
  if (acc >= 0.75) return "#FFB020";
  return "#FF4444";
}

export function RunsTable({
  runs,
  onSelect,
  selectedId,
}: {
  runs: RunSummary[];
  onSelect: (id: number) => void;
  selectedId: number | null;
}) {
  return (
    <div className="bg-[#101012] border border-[#1F1F22] rounded-[10px] p-6">
      <h3 className="text-[14px] font-medium text-white mb-1">Recent Runs</h3>
      <p className="text-[11px] text-[#6B6B70] mb-4 tracking-[0.02em]">
        Click a row for per-case breakdown
      </p>

      {runs.length === 0 ? (
        <p className="text-[13px] text-[#6B6B70] py-12 text-center">
          No runs yet. POST to /api/evaluate to create one.
        </p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-[#1F1F22]">
              <th className="text-[10px] font-medium tracking-[0.1em] uppercase text-[#6B6B70] pb-2">
                Suite
              </th>
              <th className="text-[10px] font-medium tracking-[0.1em] uppercase text-[#6B6B70] pb-2">
                Model
              </th>
              <th className="text-[10px] font-medium tracking-[0.1em] uppercase text-[#6B6B70] pb-2 text-right">
                Accuracy
              </th>
              <th className="text-[10px] font-medium tracking-[0.1em] uppercase text-[#6B6B70] pb-2 text-right">
                Latency
              </th>
              <th className="text-[10px] font-medium tracking-[0.1em] uppercase text-[#6B6B70] pb-2 text-right">
                Cost
              </th>
              <th className="text-[10px] font-medium tracking-[0.1em] uppercase text-[#6B6B70] pb-2 text-right">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {runs.map((run, i) => (
              <tr
                key={run.run_id}
                onClick={() => onSelect(run.run_id)}
                className={`border-b border-[#1A1A1C] cursor-pointer transition-all fade-slide-in ${
                  selectedId === run.run_id
                    ? "bg-[#151518] border-l-2 border-l-[#D4FF3A]"
                    : "hover:bg-[#151518]"
                }`}
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <td className="py-3 text-[13px] text-white">
                  {run.suite_name}
                </td>
                <td className="py-3 text-[12px] mono text-[#6B6B70]">
                  {run.model.split("/").pop()}
                </td>
                <td className="py-3 text-right">
                  <span
                    className="mono text-[13px] font-medium"
                    style={{ color: accuracyColor(run.accuracy) }}
                  >
                    {(run.accuracy * 100).toFixed(0)}%
                  </span>
                </td>
                <td className="py-3 text-[12px] mono text-[#F5F5F7] text-right">
                  {run.avg_latency_ms.toFixed(0)}ms
                </td>
                <td className="py-3 text-[12px] mono text-[#6B6B70] text-right">
                  ${run.total_cost_usd.toFixed(6)}
                </td>
                <td className="py-3 text-[12px] text-[#6B6B70] text-right">
                  {timeAgo(run.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
