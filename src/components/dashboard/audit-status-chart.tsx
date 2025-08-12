
"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getAudits, getGroups } from "@/lib/data";
import type { AuditStatus } from "@/lib/types";

const statusColors: Record<AuditStatus, string> = {
  Passed: "hsl(var(--chart-2))",
  Failed: "hsl(var(--chart-3))",
  "In Progress": "hsl(var(--chart-4))",
  Pending: "hsl(var(--muted-foreground))",
};

export function AuditStatusChart() {
  const audits = getAudits();
  const groups = getGroups();
  const data = groups.map(group => {
    const groupAudits = audits.filter(audit => audit.groupId === group.id);
    const statusCounts = groupAudits.reduce((acc, audit) => {
      acc[audit.status] = (acc[audit.status] || 0) + 1;
      return acc;
    }, {} as Record<AuditStatus, number>);
    
    return {
      name: group.name,
      ...statusCounts,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit Status by Group</CardTitle>
        <CardDescription>A summary of audit outcomes for each group.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)'
              }}
            />
            <Legend wrapperStyle={{fontSize: "12px"}} />
            <Bar dataKey="Passed" stackId="a" fill={statusColors.Passed} radius={[4, 4, 0, 0]} />
            <Bar dataKey="Failed" stackId="a" fill={statusColors.Failed} radius={[0, 0, 0, 0]} />
            <Bar dataKey="In Progress" stackId="a" fill={statusColors["In Progress"]} radius={[0, 0, 0, 0]} />
            <Bar dataKey="Pending" stackId="a" fill={statusColors.Pending} radius={[0, 0, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
