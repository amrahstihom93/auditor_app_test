import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { audits, getGroup, getUser } from "@/lib/data";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
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

export default function AuditsPage() {
  return (
    <div>
      <PageHeader
        title="Audits"
        description="Manage and review all audits for your organization."
        actions={
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Audit
          </Button>
        }
      />
       <Card>
        <CardHeader>
          <CardTitle>Audit List</CardTitle>
          <CardDescription>A list of all audits conducted within the organization.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Audit Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Group</TableHead>
                <TableHead>Auditor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {audits.map((audit) => {
                const group = getGroup(audit.groupId);
                const auditor = getUser(audit.auditorId);
                return (
                  <TableRow key={audit.id}>
                    <TableCell className="font-medium">{audit.name}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(audit.status)} className={cn(audit.status === 'Passed' && 'bg-accent text-accent-foreground', 'capitalize')}>
                        {audit.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{group?.name}</TableCell>
                    <TableCell>{auditor?.name}</TableCell>
                    <TableCell>{audit.date}</TableCell>
                    <TableCell>
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/audits/${audit.id}`}>View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
