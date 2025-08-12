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
import { audits, users } from "@/lib/data";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import type { AuditStatus } from "@/lib/types";

const getStatusVariant = (status: AuditStatus) => {
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
  const recentAudits = audits.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Audits</CardTitle>
        <CardDescription>
          The most recently updated audits in your organization.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recentAudits.map((audit) => {
            const user = users.find((u) => u.id === audit.auditorId);
            return (
              <div key={audit.id} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.avatar} alt="Avatar" data-ai-hint="person avatar" />
                  <AvatarFallback>{user?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {audit.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    by {user?.name}
                  </p>
                </div>
                <div className="ml-auto font-medium">
                <Badge variant={getStatusVariant(audit.status)} className={cn(audit.status === 'Passed' && 'bg-accent text-accent-foreground', 'capitalize')}>
                    {audit.status}
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
