"use client";

import type { RunDetail as RunDetailType } from "@/lib/api";

export function RunDetail({ run }: { run: RunDetailType | null }) {
  if (!run) {
    return (
      <div className="bg-[#101012] border border-[#1F1F22] rounded-[10px] p-6">
        <h3 className="text-[14px] font-medium text-white mb-1">Per-Case Breakdown</h3>
        <p className="text-[12px] text-[#6B6B70] py-12 text-center">
          Select a run above to view its cases.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#101012] border border-[#1F1F22] rounded-[10px] p-6">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <h3 className="text-[14px] font-medium text-white">
            Run #{run.run_id} · {run.suite_name}
          </h3>
          <p className="text-[11px] mono text-[#6B6B70] mt-1">{run.model}</p>
        </div>
        <span
          className="mono text-[14px] font-medium"
          style={{
            color: run.accuracy >= 0.9 ? "#D4FF3A" : run.accuracy >= 0.75 ? "#FFB020" : "#FF4444",
          }}
        >
          {(run.accuracy * 100).toFixed(1)}%
        </span>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-[#1F1F22]">
            <th className="text-[10px] font-medium tracking-[0.1em] uppercase text-[#6B6B70] pb-2">
              Case
            </th>
            <th className="text-[10px] font-medium tracking-[0.1em] uppercase text-[#6B6B70] pb-2">
              Expected → Output
            </th>
            <th className="text-[10px] font-medium tracking-[0.1em] uppercase text-[#6B6B70] pb-2 text-right">
              Score
            </th>
            <th className="text-[10px] font-medium tracking-[0.1em] uppercase text-[#6B6B70] pb-2 text-right">
              Latency
            </th>
            <th className="text-[10px] font-medium tracking-[0.1em] uppercase text-[#6B6B70] pb-2 text-right">
              Result
            </th>
          </tr>
        </thead>
        <tbody>
          {run.per_case.map((c) => (
            <tr key={c.case_id} className="border-b border-[#1A1A1C]">
              <td className="py-3 text-[12px] mono text-[#6B6B70]">{c.case_id}</td>
              <td className="py-3">
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="mono text-[#6B6B70] truncate max-w-[180px]">
                    {c.expected}
                  </span>
                  <span className="text-[#6B6B70]">→</span>
                  <span className="mono text-white truncate max-w-[180px]">
                    {c.output || "—"}
                  </span>
                </div>
                {c.judge_reason && (
                  <p className="text-[11px] text-[#6B6B70] mt-1 italic max-w-[400px]">
                    {c.judge_reason}
                  </p>
                )}
              </td>
              <td className="py-3 text-[12px] mono text-white text-right">
                {c.raw_similarity !== null
                  ? c.raw_similarity.toFixed(2)
                  : c.score.toFixed(1)}
              </td>
              <td className="py-3 text-[12px] mono text-[#6B6B70] text-right">
                {c.latency_ms}ms
              </td>
              <td className="py-3 text-right">
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ backgroundColor: c.passed ? "#D4FF3A" : "#FF4444" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
