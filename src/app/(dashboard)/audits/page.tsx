
"use client";

import { useState, useMemo } from "react";
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
import { PlusCircle, Search } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ProcessStatus } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const statusFilters: (ProcessStatus | 'All')[] = ['All', 'Passed', 'Failed', 'In Progress', 'Pending'];

export default function ProcessesPage() {
  const allProcesses = getProcesses();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<ProcessStatus | 'All'>('All');

  const filteredProcesses = useMemo(() => {
    let processes = allProcesses;

    if (activeTab !== 'All') {
        processes = processes.filter(p => p.status === activeTab);
    }
    
    if (searchQuery) {
        processes = processes.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    return processes;

  }, [allProcesses, searchQuery, activeTab]);

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
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ProcessStatus | 'All')}>
                 <div className="flex justify-between items-center mb-4">
                    <TabsList>
                        {statusFilters.map(status => (
                             <TabsTrigger key={status} value={status}>{status}</TabsTrigger>
                        ))}
                    </TabsList>
                    <div className="w-full max-w-sm">
                         <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                                placeholder="Search by process name..."
                                className="pl-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <TabsContent value={activeTab}>
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
                        {filteredProcesses.map((process) => {
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
                                <TableCell>{new Date(process.date).toLocaleDateString('en-CA')}</TableCell>
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
                     {filteredProcesses.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            No processes found.
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

