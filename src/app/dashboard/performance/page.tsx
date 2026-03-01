import type { Metadata } from "next";
import { generatePageTitle } from "@/lib/metadata-utils";
import PerformanceClient from "./performance-client";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: generatePageTitle("Performance", "/dashboard/performance"),
  };
}

export default function DashboardPerformancePage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="page-title mb-2">Performance</h1>
        <p className="text-sm text-[var(--muted-foreground)]">
          Runs cached dashboard/list data probes to compare cold vs warm timings.
        </p>
      </div>
      <PerformanceClient />
    </div>
  );
}
