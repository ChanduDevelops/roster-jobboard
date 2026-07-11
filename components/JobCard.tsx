"use client";

import Link from "next/link";
import { Job } from "@/lib/types";
import { formatSalary, timeAgo, daysUntil } from "@/lib/jobs";

const typeColor: Record<string, string> = {
  "Full-time": "text-verdigris-dark",
  "Part-time": "text-slate",
  Contract: "text-amber",
  Internship: "text-rust",
};

export default function JobCard({
  job,
  saved,
  onToggleSave,
}: {
  job: Job;
  saved: boolean;
  onToggleSave: (id: string) => void;
}) {
  const closingSoon = daysUntil(job.closesAt) <= 5 && daysUntil(job.closesAt) >= 0;

  return (
    <div className="rise bg-paper-raised border border-ink/15 rounded-lg overflow-hidden shadow-[3px_3px_0_0_rgba(31,36,33,0.08)] flex">
      <Link href={`/jobs/${job.id}`} className="flex-1 p-5 sm:p-6 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="stamp text-xs text-slate mb-1">
              {job.reqCode} · POSTED {timeAgo(job.postedAt).toUpperCase()}
            </p>
            <h3 className="font-display text-xl sm:text-2xl leading-snug truncate">
              {job.title}
            </h3>
            <p className="text-sm text-ink/70 mt-0.5">
              {job.company} · {job.location}
            </p>
          </div>
          {job.custom && (
            <span className="stamp text-[10px] border border-verdigris text-verdigris-dark px-2 py-0.5 rounded-full whitespace-nowrap">
              YOUR POSTING
            </span>
          )}
        </div>

        <p className="text-sm text-ink/80 mt-3 line-clamp-2">{job.description}</p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4 text-sm">
          <span className={"font-medium " + (typeColor[job.type] ?? "text-ink")}>
            {job.type}
          </span>
          <span className="text-slate">{job.locationType}</span>
          <span className="stamp text-ink">{formatSalary(job)}</span>
          {closingSoon && (
            <span className="text-rust font-medium">
              closes in {daysUntil(job.closesAt)}d
            </span>
          )}
        </div>
      </Link>

      <div className="relative flex flex-col items-center justify-center px-3 border-l border-dashed border-ink/25">
        <button
          onClick={() => onToggleSave(job.id)}
          aria-pressed={saved}
          aria-label={saved ? "Remove from saved" : "Save this job"}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-ink/10 transition-colors"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={saved ? "var(--amber)" : "none"}
            stroke="var(--ink)"
            strokeWidth="1.8"
          >
            <path d="M6 3.5h12a1 1 0 0 1 1 1V21l-7-4-7 4V4.5a1 1 0 0 1 1-1Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
