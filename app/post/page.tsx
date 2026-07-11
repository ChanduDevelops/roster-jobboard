"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addCustomJob } from "@/lib/jobs";
import { Job, JobType, Location } from "@/lib/types";

const jobTypes: JobType[] = ["Full-time", "Part-time", "Contract", "Internship"];
const locationTypes: Location[] = ["Remote", "Hybrid", "On-site"];

export default function PostJob() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [locationType, setLocationType] = useState<Location>("Remote");
  const [type, setType] = useState<JobType>("Full-time");
  const [category, setCategory] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [description, setDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [requirements, setRequirements] = useState("");
  const [closesAt, setClosesAt] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !company || !location || !category || !closesAt) {
      setError("Fill in the required fields before posting — title, company, location, category, and a closing date.");
      return;
    }
    const id = Date.now().toString();
    const job: Job = {
      id,
      reqCode: `REQ-${id.slice(-4)}`,
      title,
      company,
      location,
      locationType,
      type,
      category,
      salaryMin: Number(salaryMin) || 0,
      salaryMax: Number(salaryMax) || 0,
      postedAt: new Date().toISOString().slice(0, 10),
      closesAt,
      description: description || "No description provided.",
      responsibilities: responsibilities
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      requirements: requirements
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      custom: true,
    };
    addCustomJob(job);
    router.push(`/jobs/${id}`);
  }

  return (
    <div className="py-10 max-w-2xl">
      <p className="stamp text-xs text-verdigris-dark mb-2">NEW POSTING</p>
      <h1 className="font-display text-3xl sm:text-4xl">Post a role to the board</h1>
      <p className="text-ink/70 mt-3 max-w-xl">
        This board keeps postings in your browser only — nothing leaves your
        device. Refreshing on this computer will show your posting; a
        different browser won&apos;t see it.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Job title *">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              placeholder="Senior Backend Engineer"
            />
          </Field>
          <Field label="Company *">
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="input"
              placeholder="Northwind Systems"
            />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Location *">
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input"
              placeholder="Austin, TX or Remote"
            />
          </Field>
          <Field label="Category *">
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input"
              placeholder="Engineering"
            />
          </Field>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Work setting">
            <select
              value={locationType}
              onChange={(e) => setLocationType(e.target.value as Location)}
              className="input"
            >
              {locationTypes.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </Field>
          <Field label="Job type">
            <select
              value={type}
              onChange={(e) => setType(e.target.value as JobType)}
              className="input"
            >
              {jobTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field label="Closes on *">
            <input
              type="date"
              value={closesAt}
              onChange={(e) => setClosesAt(e.target.value)}
              className="input"
            />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Pay, minimum">
            <input
              type="number"
              value={salaryMin}
              onChange={(e) => setSalaryMin(e.target.value)}
              className="input"
              placeholder="120000"
            />
          </Field>
          <Field label="Pay, maximum">
            <input
              type="number"
              value={salaryMax}
              onChange={(e) => setSalaryMax(e.target.value)}
              className="input"
              placeholder="150000"
            />
          </Field>
        </div>

        <Field label="Description">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input min-h-24"
            placeholder="What is this role, in plain terms?"
          />
        </Field>

        <Field label="Responsibilities (one per line)">
          <textarea
            value={responsibilities}
            onChange={(e) => setResponsibilities(e.target.value)}
            className="input min-h-24"
            placeholder={"Own the checkout service\nPair with the platform team"}
          />
        </Field>

        <Field label="Requirements (one per line)">
          <textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            className="input min-h-24"
            placeholder={"3+ years of relevant experience\nComfortable with ambiguity"}
          />
        </Field>

        {error && <p className="text-rust text-sm">{error}</p>}

        <button
          type="submit"
          className="stamp px-6 py-3 rounded-md bg-verdigris text-paper hover:bg-verdigris-dark transition-colors"
        >
          PIN TO THE BOARD
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm text-ink/80 mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}
