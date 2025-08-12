"use client";

import type { Ticket, TicketPriority, TicketStatus, User } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface TicketListProps {
    tickets: Ticket[];
    users: User[];
}

const getPriorityVariant = (priority: TicketPriority) => {
    switch (priority) {
        case 'High':
            return 'destructive';
        case 'Medium':
            return 'secondary';
        default:
            return 'outline';
    }
}

const getPriorityClass = (priority: TicketPriority) => {
    switch (priority) {
        case 'High':
            return 'text-destructive-foreground bg-destructive';
        case 'Medium':
            return 'text-amber-700 bg-amber-100 border-amber-200';
        default:
             return 'text-muted-foreground bg-muted';
    }
}


const getStatusVariant = (status: TicketStatus) => {
     switch (status) {
        case 'Resolved':
            return 'default';
        case 'In Progress':
            return 'secondary';
        default:
            return 'outline';
    }
}
const getStatusClass = (status: TicketStatus) => {
     switch (status) {
        case 'Resolved':
            return 'bg-accent text-accent-foreground';
        case 'In Progress':
            return 'text-blue-700 bg-blue-100 border-blue-200';
        default:
            return 'text-muted-foreground bg-muted';
    }
}


export function TicketList({ tickets, users }: TicketListProps) {
    if (tickets.length === 0) {
        return (
            <div className="text-center text-muted-foreground py-12">
                <p>No tickets have been created for this process yet.</p>
            </div>
        )
    }
    
    return (
        <TooltipProvider>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Assignee</TableHead>
                        <TableHead>Created At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tickets.map(ticket => {
                        const assignee = users.find(u => u.id === ticket.assigneeId);
                        return (
                            <TableRow key={ticket.id}>
                                <TableCell className="font-medium">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <p className="truncate max-w-xs">{ticket.title}</p>
                                        </TooltipTrigger>
                                        <TooltipContent side="top" align="start">
                                            <p className="font-semibold">{ticket.title}</p>
                                            <p className="text-sm text-muted-foreground max-w-xs">{ticket.description}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={getStatusVariant(ticket.status)} className={cn(getStatusClass(ticket.status), 'capitalize')}>{ticket.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={getPriorityVariant(ticket.priority)} className={cn(getPriorityClass(ticket.priority), 'capitalize')}>{ticket.priority}</Badge>
                                </TableCell>
                                <TableCell>
                                    {assignee && (
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Avatar className="h-7 w-7">
                                                    <AvatarImage src={assignee.avatar} alt={assignee.name} data-ai-hint="person avatar" />
                                                    <AvatarFallback>{assignee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                </Avatar>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{assignee.name}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    )}
                                </TableCell>
                                 <TableCell>
                                    {new Date(ticket.createdAt).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TooltipProvider>
    )
}
