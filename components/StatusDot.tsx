import { ProjectStatus } from "@/lib/types";

const labels: Record<ProjectStatus, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  upcoming: "Coming soon",
};

const colors: Record<ProjectStatus, string> = {
  completed: "bg-success",
  "in-progress": "bg-acid",
  upcoming: "bg-upcoming",
};

export default function StatusDot({ status }: { status: ProjectStatus }) {
  return (
    <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs text-muted">
      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
        {/* Only live work gets the halo — it earns attention, finished
            work shouldn't compete for it. */}
        {status === "in-progress" && (
          <span className="pulse-ring absolute inset-0 rounded-full text-acid" />
        )}
        <span className={`relative h-1.5 w-1.5 rounded-full ${colors[status]}`} />
      </span>
      {labels[status]}
    </span>
  );
}
