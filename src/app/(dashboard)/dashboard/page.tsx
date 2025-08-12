import { PageHeader } from "@/components/shared/page-header";
import { audits, users, groups } from "@/lib/data";
import { StatsCard } from "@/components/dashboard/stats-card";
import { AuditStatusChart } from "@/components/dashboard/audit-status-chart";
import { RecentAudits } from "@/components/dashboard/recent-audits";
import {
  ShieldCheck,
  ShieldAlert,
  ClipboardList,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const totalAudits = audits.length;
  const passedAudits = audits.filter(
    (audit) => audit.status === "Passed"
  ).length;
  const failedAudits = audits.filter(
    (audit) => audit.status === "Failed"
  ).length;
  const inProgressAudits = audits.filter(
    (audit) => audit.status === "In Progress"
  ).length;

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="An overview of your organization's audit activities."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Audits"
          value={totalAudits.toString()}
          icon={ClipboardList}
          description="All audits conducted"
        />
        <StatsCard
          title="Passed"
          value={passedAudits.toString()}
          icon={ShieldCheck}
          description="Successfully completed audits"
        />
        <StatsCard
          title="Failed"
          value={failedAudits.toString()}
          icon={ShieldAlert}
          description="Audits with critical findings"
        />
        <StatsCard
          title="In Progress"
          value={inProgressAudits.toString()}
          icon={Activity}
          description="Audits currently underway"
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
