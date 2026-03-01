"use client";

import { useState } from "react";
import { Button } from "@/components/ui/primitives/button";

interface ProbeMetric {
  name: string;
  durationMs: number;
}

interface ProbePass {
  pass: number;
  metrics: ProbeMetric[];
  totalMs: number;
}

interface ProbeResponse {
  generatedAt: string;
  userId: string;
  passes: number;
  results: ProbePass[];
}

export default function PerformanceClient() {
  const [data, setData] = useState<ProbeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runProbe = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/perf/dashboard?passes=2", {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`Probe failed: ${response.status}`);
      }
      const payload = (await response.json()) as ProbeResponse;
      setData(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to run probe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button onClick={runProbe} disabled={loading}>
          {loading ? "Running…" : "Run Performance Probe"}
        </Button>
        {data?.generatedAt ? (
          <span className="text-xs text-[var(--muted-foreground)]">
            Last run: {new Date(data.generatedAt).toLocaleString()}
          </span>
        ) : null}
      </div>

      {error ? (
        <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
      ) : null}

      {data ? (
        <div className="space-y-4">
          {data.results.map((pass) => (
            <section
              key={pass.pass}
              className="rounded-md minimal-border bg-[var(--card)] p-4"
            >
              <div className="mb-3 text-sm font-medium">
                Pass {pass.pass} total: {pass.totalMs.toFixed(2)}ms
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-[480px] w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)]">
                      <th className="py-2 text-left font-medium text-[var(--muted-foreground)]">
                        Metric
                      </th>
                      <th className="py-2 text-right font-medium text-[var(--muted-foreground)]">
                        Duration (ms)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pass.metrics.map((metric) => (
                      <tr key={metric.name} className="border-b border-[var(--border)]/50">
                        <td className="py-2">{metric.name}</td>
                        <td className="py-2 text-right">
                          {metric.durationMs.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      ) : null}
    </div>
  );
}
