
"use client";

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
import { getProcesses, getGroup, getUser } from "@/lib/data";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
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

export default function ProcessesPage() {
  const processes = getProcesses();

  return (
    <div>
      <PageHeader
        title="Processes"
        description="Manage and review all processes for your organization."
        actions={
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Process
          </Button>
        }
      />
       <Card>
        <CardHeader>
          <CardTitle>Process List</CardTitle>
          <CardDescription>A list of all processes conducted within the organization.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Process Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Auditor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processes.map((process) => {
                const group = getGroup(process.groupId);
                const auditor = getUser(process.auditorId);
                return (
                  <TableRow key={process.id}>
                    <TableCell className="font-medium">{process.name}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(process.status)} className={cn(process.status === 'Passed' && 'bg-accent text-accent-foreground', 'capitalize')}>
                        {process.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{process.processOwnerName}</TableCell>
                    <TableCell>{auditor?.name}</TableCell>
                    <TableCell>{new Date(process.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/audits/${process.id}`}>View</Link>
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
