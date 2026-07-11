"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Job } from "@/lib/types";
import { getAllJobs, getSavedIds, toggleSaved } from "@/lib/jobs";
import JobCard from "@/components/JobCard";

export default function SavedPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    // Data lives in localStorage (an external system), so reading it on
    // mount and syncing into state here is the intended use of this effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setJobs(getAllJobs());
    setSavedIds(getSavedIds());
  }, []);

  const saved = jobs.filter((j) => savedIds.includes(j.id));

  function handleToggleSave(id: string) {
    setSavedIds(toggleSaved(id));
  }

  return (
    <div className="py-10 pb-16">
      <p className="stamp text-xs text-verdigris-dark mb-2">YOUR BOARD</p>
      <h1 className="font-display text-3xl sm:text-4xl">Saved listings</h1>
      <p className="text-ink/70 mt-3 max-w-xl">
        Saved on this device only — the little tag icon on any listing pins it
        here.
      </p>

      <div className="grid gap-4 mt-8">
        {saved.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            saved={true}
            onToggleSave={handleToggleSave}
          />
        ))}

        {saved.length === 0 && (
          <div className="text-center py-16 border border-dashed border-ink/25 rounded-lg">
            <p className="font-display text-xl">Nothing saved yet.</p>
            <p className="text-ink/60 mt-2 text-sm">
              Tap the tag icon on any{" "}
              <Link href="/" className="text-verdigris-dark underline">
                board listing
              </Link>{" "}
              to keep it here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
