
"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getProcesses, getUsers } from "@/lib/data";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import type { ProcessStatus } from "@/lib/types";

const getStatusVariant = (status: ProcessStatus) => {
    switch (status) {
        case 'Passed':
            return 'default'; // This will be green due to accent color mapping
        case 'Failed':
            return 'destructive';
        case 'In Progress':
        case 'Pending':
            return 'secondary';
    }
}

export function RecentAudits() {
  const processes = getProcesses();
  const users = getUsers();
  const recentProcesses = processes.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Processes</CardTitle>
        <CardDescription>
          The most recently updated processes in your organization.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recentProcesses.map((process) => {
            const user = users.find((u) => u.id === process.auditorId);
            return (
              <div key={process.id} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.avatar} alt="Avatar" data-ai-hint="person avatar" />
                  <AvatarFallback>{user?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {process.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    by {user?.name}
                  </p>
                </div>
                <div className="ml-auto font-medium">
                <Badge variant={getStatusVariant(process.status)} className={cn(process.status === 'Passed' && 'bg-accent text-accent-foreground', 'capitalize')}>
                    {process.status}
                </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
