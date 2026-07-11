"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Job } from "@/lib/types";
import { getAllJobs, getSavedIds, toggleSaved } from "@/lib/jobs";
import FilterBar from "@/components/FilterBar";
import JobCard from "@/components/JobCard";

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [sort, setSort] = useState<"newest" | "salary">("newest");

  useEffect(() => {
    // Data lives in localStorage (an external system), so reading it on
    // mount and syncing into state here is the intended use of this effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setJobs(getAllJobs());
    setSavedIds(getSavedIds());
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.category))).sort(),
    [jobs]
  );
  const locationTypes = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.locationType))),
    [jobs]
  );

  const filtered = useMemo(() => {
    let result = jobs.filter((j) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.category.toLowerCase().includes(q);
      const matchesCategory = !category || j.category === category;
      const matchesLocation = !location || j.locationType === location;
      return matchesQuery && matchesCategory && matchesLocation;
    });

    result = result.slice().sort((a, b) => {
      if (sort === "salary") return b.salaryMax - a.salaryMax;
      return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
    });

    return result;
  }, [jobs, query, category, location, sort]);

  function handleToggleSave(id: string) {
    setSavedIds(toggleSaved(id));
  }

  return (
    <div className="pb-16">
      <section className="pt-10 sm:pt-14 pb-6">
        <p className="stamp text-xs text-verdigris-dark mb-3">
          BOARD NO. 001 · UPDATED DAILY
        </p>
        <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] max-w-2xl">
          Every role, posted like it matters.
        </h1>
        <p className="text-ink/70 mt-4 max-w-xl">
          No hidden salary. No guessing at the type of work. Read what a job
          actually asks of you, then decide if it&apos;s worth a tear-off.
        </p>
      </section>

      <FilterBar
        query={query}
        onQuery={setQuery}
        categories={categories}
        activeCategory={category}
        onCategory={setCategory}
        locationTypes={locationTypes}
        activeLocation={location}
        onLocation={setLocation}
        sort={sort}
        onSort={setSort}
        resultCount={filtered.length}
      />

      <div className="grid gap-4 mt-6">
        {filtered.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            saved={savedIds.includes(job.id)}
            onToggleSave={handleToggleSave}
          />
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16 border border-dashed border-ink/25 rounded-lg">
            <p className="font-display text-xl">Nothing matches that search.</p>
            <p className="text-ink/60 mt-2 text-sm">
              Try clearing a filter, or{" "}
              <Link href="/post" className="text-verdigris-dark underline">
                post the role
              </Link>{" "}
              if it doesn&apos;t exist yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
