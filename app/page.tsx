"use client";

import useSWR from "swr";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { StatCard } from "@/components/StatCard";
import { RunsTable } from "@/components/RunsTable";
import { ScoringChart } from "@/components/ScoringChart";
import { RunDetail } from "@/components/RunDetail";
import { fetcher, runsKey, API_BASE, type RunSummary, type RunDetail as RunDetailType } from "@/lib/api";

export default function Home() {
  const { data: runsData } = useSWR<{ total: number; runs: RunSummary[] }>(
    runsKey,
    fetcher,
    { refreshInterval: 5000, revalidateOnFocus: true }
  );

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { data: detail } = useSWR<RunDetailType>(
    selectedId ? `${API_BASE}/api/runs/${selectedId}` : null,
    fetcher
  );

  const runs = runsData?.runs ?? [];
  const totalRuns = runsData?.total ?? 0;

  const avgAccuracy =
    runs.length > 0
      ? runs.reduce((s, r) => s + r.accuracy, 0) / runs.length
      : 0;
  const avgLatency =
    runs.length > 0
      ? runs.reduce((s, r) => s + r.avg_latency_ms, 0) / runs.length
      : 0;
  const totalCost = runs.reduce((s, r) => s + r.total_cost_usd, 0);

  const scoringMap: Record<string, number> = {};
  runs.forEach((r) => {
    const key = r.model.split("/").pop() ?? r.model;
    scoringMap[key] = (scoringMap[key] ?? 0) + 1;
  });
  const scoringData = Object.entries(scoringMap).map(([scoring, count]) => ({
    scoring,
    count,
  }));

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <Navbar liveCount={totalRuns} />

      <main className="max-w-[1400px] mx-auto px-8 py-10">
        <header className="mb-8">
          <h1 className="text-[28px] font-medium tracking-[-0.02em] text-white">
            Overview
          </h1>
          <p className="text-[13px] text-[#6B6B70] mt-1">
            Live metrics · auto-refreshes every 5s
          </p>
        </header>

        <section className="grid grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total Runs"
            value={totalRuns.toLocaleString()}
            sublabel="all time"
          />
          <StatCard
            label="Avg Accuracy"
            value={`${(avgAccuracy * 100).toFixed(1)}%`}
            sublabel="across all runs"
          />
          <StatCard
            label="Avg Latency"
            value={`${avgLatency.toFixed(0)}ms`}
            sublabel="per case"
          />
          <StatCard
            label="Total Cost"
            value={`$${totalCost.toFixed(5)}`}
            sublabel="USD spent"
          />
        </section>

        <section className="grid grid-cols-[1.6fr_1fr] gap-4 mb-8">
          <RunsTable runs={runs} onSelect={setSelectedId} selectedId={selectedId} />
          <ScoringChart data={scoringData} />
        </section>

        <RunDetail run={detail ?? null} />

        <footer className="mt-12 pb-8 flex items-center justify-between text-[11px] text-[#6B6B70]">
          <span>EvalOps · LLM evaluation for CI/CD</span>
          <a
            href="https://github.com/ankit-rv-08/EvalOps"
            className="hover:text-white transition-colors"
          >
            github.com/ankit-rv-08/EvalOps
          </a>
        </footer>
      </main>
    </div>
  );
}
