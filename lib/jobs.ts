import { Job } from "./types";
import { seedJobs } from "./seed-jobs";

const CUSTOM_KEY = "roster:custom-jobs";
const SAVED_KEY = "roster:saved-ids";

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function getCustomJobs(): Job[] {
  if (typeof window === "undefined") return [];
  return safeParse<Job[]>(localStorage.getItem(CUSTOM_KEY), []);
}

export function addCustomJob(job: Job) {
  if (typeof window === "undefined") return;
  const jobs = getCustomJobs();
  jobs.unshift(job);
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(jobs));
}

export function getAllJobs(): Job[] {
  return [...getCustomJobs(), ...seedJobs];
}

export function getJobById(id: string): Job | undefined {
  return getAllJobs().find((j) => j.id === id);
}

export function getSavedIds(): string[] {
  if (typeof window === "undefined") return [];
  return safeParse<string[]>(localStorage.getItem(SAVED_KEY), []);
}

export function toggleSaved(id: string): string[] {
  const current = getSavedIds();
  const next = current.includes(id)
    ? current.filter((i) => i !== id)
    : [...current, id];
  localStorage.setItem(SAVED_KEY, JSON.stringify(next));
  return next;
}

export function daysUntil(dateStr: string): number {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function formatSalary(job: Job): string {
  const isHourly = job.salaryMax < 500;
  const fmt = (n: number) =>
    isHourly ? `₹${n}/hr` : `₹${Math.round(n / 1000)}k`;
  return `${fmt(job.salaryMin)}–${fmt(job.salaryMax)}`;
}

export function timeAgo(dateStr: string): string {
  const days = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24)
  );
  if (days <= 0) return "today";
  if (days === 1) return "1 day ago";
  if (days < 14) return `${days} days ago`;
  return `${Math.floor(days / 7)} weeks ago`;
}
