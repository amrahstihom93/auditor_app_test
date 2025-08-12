import { getAudit, getGroup, getUser } from "@/lib/data";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AuditSummaryClient } from "@/components/audits/audit-summary-client";
import { cn } from "@/lib/utils";
import type { AuditStatus } from "@/lib/types";

const getStatusVariant = (status: AuditStatus) => {
    switch (status) {
        case 'Passed':
            return 'default';
        case 'Failed':
            return 'destructive';
        default:
            return 'secondary';
    }
}

export default function AuditDetailPage({ params }: { params: { id: string } }) {
  const audit = getAudit(params.id);

  if (!audit) {
    notFound();
  }

  const group = getGroup(audit.groupId);
  const auditor = getUser(audit.auditorId);

  return (
    <div>
      <PageHeader
        title={audit.name}
        description={`Details for audit conducted on ${audit.date}.`}
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Audit Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <Badge variant={getStatusVariant(audit.status)} className={cn(audit.status === 'Passed' && 'bg-accent text-accent-foreground', 'capitalize')}>
                {audit.status}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Auditor</span>
              <span>{auditor?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Group</span>
              <span>{group?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date</span>
              <span>{audit.date}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Audit Findings</CardTitle>
                <CardDescription>The detailed findings from the audit report.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{audit.findings}</p>
            </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <AuditSummaryClient findings={audit.findings} />
      </div>
    </div>
  );
}
