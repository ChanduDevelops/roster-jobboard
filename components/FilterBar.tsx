"use client";

type Props = {
  query: string;
  onQuery: (v: string) => void;
  categories: string[];
  activeCategory: string | null;
  onCategory: (v: string | null) => void;
  locationTypes: string[];
  activeLocation: string | null;
  onLocation: (v: string | null) => void;
  sort: "newest" | "salary";
  onSort: (v: "newest" | "salary") => void;
  resultCount: number;
};

export default function FilterBar({
  query,
  onQuery,
  categories,
  activeCategory,
  onCategory,
  locationTypes,
  activeLocation,
  onLocation,
  sort,
  onSort,
  resultCount,
}: Props) {
  return (
    <div className="sticky top-0 z-10 bg-paper/95 backdrop-blur-sm pt-6 pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 border-b border-ink/10">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--slate)"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search by title, company, or keyword"
            className="w-full pl-9 pr-3 py-2.5 rounded-md border border-ink/20 bg-paper-raised text-ink placeholder:text-slate focus:outline-none focus:ring-2 focus:ring-verdigris"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => onSort(e.target.value as "newest" | "salary")}
          className="px-3 py-2.5 rounded-md border border-ink/20 bg-paper-raised text-sm focus:outline-none focus:ring-2 focus:ring-verdigris"
        >
          <option value="newest">Newest first</option>
          <option value="salary">Highest pay first</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        <TagButton
          active={activeCategory === null}
          onClick={() => onCategory(null)}
          label="All roles"
        />
        {categories.map((c) => (
          <TagButton
            key={c}
            active={activeCategory === c}
            onClick={() => onCategory(activeCategory === c ? null : c)}
            label={c}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-2">
        <TagButton
          active={activeLocation === null}
          onClick={() => onLocation(null)}
          label="Anywhere"
          variant="location"
        />
        {locationTypes.map((l) => (
          <TagButton
            key={l}
            active={activeLocation === l}
            onClick={() => onLocation(activeLocation === l ? null : l)}
            label={l}
            variant="location"
          />
        ))}
        <span className="stamp text-xs text-slate ml-auto">
          {resultCount} OPEN {resultCount === 1 ? "ROLE" : "ROLES"}
        </span>
      </div>
    </div>
  );
}

function TagButton({
  active,
  onClick,
  label,
  variant = "category",
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  variant?: "category" | "location";
}) {
  return (
    <button
      onClick={onClick}
      className={
        "px-3 py-1 text-sm rounded-full border transition-colors " +
        (active
          ? variant === "category"
            ? "bg-verdigris border-verdigris text-paper"
            : "bg-ink border-ink text-paper"
          : "border-ink/25 text-ink/75 hover:border-ink/60")
      }
    >
      {label}
    </button>
  );
}
