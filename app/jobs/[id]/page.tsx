"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Job } from "@/lib/types";
import {
  getJobById,
  formatSalary,
  timeAgo,
  daysUntil,
  getSavedIds,
  toggleSaved,
} from "@/lib/jobs";

export default function JobDetail() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [job, setJob] = useState<Job | null | undefined>(undefined);
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const found = getJobById(params.id);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setJob(found ?? null);
    setSaved(getSavedIds().includes(params.id));
  }, [params.id]);

  if (job === undefined) return null;

  if (job === null) {
    return (
      <div className="py-20 text-center">
        <p className="font-display text-2xl">This listing has come down.</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 text-verdigris-dark underline"
        >
          Back to the board
        </button>
      </div>
    );
  }

  const closesInDays = daysUntil(job.closesAt);

  return (
    <div className="py-10 max-w-3xl">
      <Link href="/" className="text-sm text-slate hover:text-ink">
        ← Back to the board
      </Link>

      <div className="mt-4 bg-paper-raised border border-ink/15 rounded-lg shadow-[4px_4px_0_0_rgba(31,36,33,0.08)] overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="stamp text-xs text-verdigris-dark mb-2">
                {job.reqCode} · {job.category.toUpperCase()}
              </p>
              <h1 className="font-display text-3xl sm:text-4xl leading-tight">
                {job.title}
              </h1>
              <p className="text-ink/70 mt-2">
                {job.company} · {job.location} · {job.locationType}
              </p>
            </div>
            <button
              onClick={() => setSaved(toggleSaved(job.id).includes(job.id))}
              className="shrink-0 w-10 h-10 rounded-full border border-ink/20 flex items-center justify-center hover:bg-ink/5"
              aria-pressed={saved}
              aria-label={saved ? "Remove from saved" : "Save this job"}
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

          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm">
            <Stat label="Pay" value={formatSalary(job)} />
            <Stat label="Type" value={job.type} />
            <Stat label="Posted" value={timeAgo(job.postedAt)} />
            <Stat
              label="Closes"
              value={
                closesInDays >= 0 ? `in ${closesInDays} days` : "closed"
              }
              warn={closesInDays <= 5 && closesInDays >= 0}
            />
          </div>
        </div>

        <div className="perforated" />

        <div className="p-6 sm:p-8 space-y-6">
          <section>
            <h2 className="font-display text-lg mb-2">About the role</h2>
            <p className="text-ink/85 leading-relaxed">{job.description}</p>
          </section>

          <section>
            <h2 className="font-display text-lg mb-2">What you&apos;ll do</h2>
            <ul className="space-y-1.5">
              {job.responsibilities.map((r, i) => (
                <li key={i} className="flex gap-2 text-ink/85">
                  <span className="text-verdigris-dark">—</span> {r}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg mb-2">What you&apos;ll need</h2>
            <ul className="space-y-1.5">
              {job.requirements.map((r, i) => (
                <li key={i} className="flex gap-2 text-ink/85">
                  <span className="text-verdigris-dark">—</span> {r}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="perforated" />

        <div className="p-6 sm:p-8 flex items-center justify-between gap-4">
          <p className="text-sm text-slate">
            {closesInDays >= 0
              ? `Applications close in ${closesInDays} day${closesInDays === 1 ? "" : "s"}.`
              : "Applications have closed for this posting."}
          </p>
          <button
            disabled={closesInDays < 0}
            onClick={() => setApplied(true)}
            className="stamp shrink-0 px-5 py-2.5 rounded-md bg-rust text-paper disabled:bg-slate disabled:cursor-not-allowed hover:bg-rust/90 transition-colors"
          >
            {applied ? "TICKET TORN ✓" : "TEAR OFF & APPLY"}
          </button>
        </div>
      </div>

      {applied && (
        <p className="rise text-sm text-verdigris-dark mt-3">
          This is a demo board — no application was actually sent, but that&apos;s
          exactly how it would feel.
        </p>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  warn,
}: {
  label: string;
  value: string;
  warn?: boolean;
}) {
  return (
    <div>
      <p className="text-xs text-slate uppercase tracking-wide">{label}</p>
      <p className={"font-medium " + (warn ? "text-rust" : "text-ink")}>
        {value}
      </p>
    </div>
  );
}
