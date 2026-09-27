export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";

export type RunSummary = {
  run_id: number;
  suite_name: string;
  model: string;
  total_cases: number;
  passed: number;
  failed: number;
  accuracy: number;
  avg_latency_ms: number;
  total_cost_usd: number;
  created_at: string;
};

export type RunDetail = RunSummary & {
  per_case: Array<{
    case_id: string;
    input: string;
    expected: string;
    output: string;
    score: number;
    raw_similarity: number | null;
    judge_reason: string | null;
    passed: boolean;
    latency_ms: number;
    cost_usd: number;
    error: string | null;
  }>;
};

export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return res.json();
}

export const runsKey = `${API_BASE}/api/runs`;
