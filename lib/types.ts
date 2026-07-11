export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";
export type Location = "Remote" | "Hybrid" | "On-site";

export interface Job {
  id: string;
  reqCode: string;
  title: string;
  company: string;
  location: string;
  locationType: Location;
  type: JobType;
  category: string;
  salaryMin: number;
  salaryMax: number;
  postedAt: string; // ISO date
  closesAt: string; // ISO date
  description: string;
  responsibilities: string[];
  requirements: string[];
  applyUrl?: string;
  custom?: boolean; // true if posted by the user via the Post a Job form
}
