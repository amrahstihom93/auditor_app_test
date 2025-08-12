"use client";

import { getProcess, getGroup, getUser, getUsers, getTicketsForProcess } from "@/lib/data";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AuditSummaryClient } from "@/components/audits/audit-summary-client";
import { cn } from "@/lib/utils";
import type { ProcessStatus, TicketStatus, TicketPriority } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { FileTicket, PlusCircle } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreateTicketForm } from "@/components/tickets/create-ticket-form";
import { TicketList } from "@/components/tickets/ticket-list";
import { useToast } from "@/hooks/use-toast";

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
  const [isCreateTicketOpen, setIsCreateTicketOpen] = useState(false);
  const { toast } = useToast();

  // We are using a client component, so we need to fetch data and manage state here.
  const process = getProcess(params.id);
  const [tickets, setTickets] = useState(() => getTicketsForProcess(params.id));
  
  if (!process) {
    notFound();
  }

  const group = getGroup(process.groupId);
  const auditor = getUser(process.auditorId);
  const users = getUsers();

  const handleTicketCreated = () => {
    // Refetch tickets when a new one is created
    setTickets(getTicketsForProcess(params.id));
    setIsCreateTicketOpen(false);
    toast({
        title: "Ticket Created",
        description: "The new ticket has been successfully created and assigned.",
    });
  }

  return (
    <div>
      <PageHeader
        title={process.name}
        description={`Details for process conducted on ${new Date(process.date).toLocaleDateString('en-CA')}.`}
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
              <span>{new Date(process.date).toLocaleDateString('en-CA')}</span>
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
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
               <div>
                 <CardTitle className="flex items-center gap-2">
                    <FileTicket />
                    Process Tickets
                </CardTitle>
                <CardDescription>Specific findings, tasks, or issues to be addressed for this process.</CardDescription>
               </div>
               <Dialog open={isCreateTicketOpen} onOpenChange={setIsCreateTicketOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Ticket
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Ticket</DialogTitle>
                        <DialogDescription>
                            Fill out the details for the new ticket for process: "{process.name}".
                        </DialogDescription>
                    </DialogHeader>
                    <CreateTicketForm processId={process.id} users={users} onTicketCreated={handleTicketCreated} />
                </DialogContent>
               </Dialog>
            </CardHeader>
            <CardContent>
                <TicketList tickets={tickets} users={users} />
            </CardContent>
        </Card>
      </div>
      
      <div className="mt-6">
        <AuditSummaryClient findings={process.findings} />
      </div>
    </div>
  );
}
