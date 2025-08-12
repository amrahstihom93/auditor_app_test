import { getProcess, getGroup, getUser } from "@/lib/data";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AuditSummaryClient } from "@/components/audits/audit-summary-client";
import { cn } from "@/lib/utils";
import type { ProcessStatus } from "@/lib/types";

const getStatusVariant = (status: ProcessStatus) => {
    switch (status) {
        case 'Passed':
            return 'default';
        case 'Failed':
            return 'destructive';
        default:
            return 'secondary';
    }
}

export default function ProcessDetailPage({ params }: { params: { id: string } }) {
  const process = getProcess(params.id);

  if (!process) {
    notFound();
  }

  const group = getGroup(process.groupId);
  const auditor = getUser(process.auditorId);

  return (
    <div>
      <PageHeader
        title={process.name}
        description={`Details for process conducted on ${new Date(process.date).toLocaleDateString()}.`}
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Process Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <Badge variant={getStatusVariant(process.status)} className={cn(process.status === 'Passed' && 'bg-accent text-accent-foreground', 'capitalize')}>
                {process.status}
              </Badge>
            </div>
             <div className="flex justify-between">
              <span className="text-muted-foreground">Process Owner</span>
              <span>{process.processOwnerName}</span>
            </div>
             <div className="flex justify-between">
                <span className="text-muted-foreground">Owner Email</span>
                <span className="text-sm">{process.processOwnerEmail}</span>
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
              <span>{new Date(process.date).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Process Findings</CardTitle>
                <CardDescription>The detailed findings from the process report.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{process.findings}</p>
            </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <AuditSummaryClient findings={process.findings} />
      </div>
    </div>
  );
}
