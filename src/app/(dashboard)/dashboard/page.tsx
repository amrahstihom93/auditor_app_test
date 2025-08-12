
"use client";

import { PageHeader } from "@/components/shared/page-header";
import { getProcesses } from "@/lib/data";
import { StatsCard } from "@/components/dashboard/stats-card";
import { AuditStatusChart } from "@/components/dashboard/audit-status-chart";
import { RecentAudits } from "@/components/dashboard/recent-audits";
import {
  ShieldCheck,
  ShieldAlert,
  ClipboardList,
  Activity,
} from "lucide-react";

export default function DashboardPage() {
  const processes = getProcesses();
  const totalProcesses = processes.length;
  const passedProcesses = processes.filter(
    (audit) => audit.status === "Passed"
  ).length;
  const failedProcesses = processes.filter(
    (audit) => audit.status === "Failed"
  ).length;
  const inProgressProcesses = processes.filter(
    (audit) => audit.status === "In Progress"
  ).length;

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="An overview of your organization's process activities."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Processes"
          value={totalProcesses.toString()}
          icon={ClipboardList}
          description="All processes conducted"
        />
        <StatsCard
          title="Passed"
          value={passedProcesses.toString()}
          icon={ShieldCheck}
          description="Successfully completed processes"
        />
        <StatsCard
          title="Failed"
          value={failedProcesses.toString()}
          icon={ShieldAlert}
          description="Processes with critical findings"
        />
        <StatsCard
          title="In Progress"
          value={inProgressProcesses.toString()}
          icon={Activity}
          description="Processes currently underway"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <AuditStatusChart />
        </div>
        <div className="lg:col-span-2">
          <RecentAudits />
        </div>
      </div>
    </div>
  );
}
