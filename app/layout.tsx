import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EvalOps — Live Telemetry",
  description: "Real-time dashboard for EvalOps, the LLM evaluation harness.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
