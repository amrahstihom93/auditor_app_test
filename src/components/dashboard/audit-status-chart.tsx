
"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getProcesses, getGroups } from "@/lib/data";
import type { ProcessStatus } from "@/lib/types";

const statusColors: Record<ProcessStatus, string> = {
  Passed: "hsl(var(--chart-2))",
  Failed: "hsl(var(--chart-3))",
  "In Progress": "hsl(var(--chart-4))",
  Pending: "hsl(var(--muted-foreground))",
};

export function AuditStatusChart() {
  const processes = getProcesses();
  const groups = getGroups();
  const data = groups.map(group => {
    const groupProcesses = processes.filter(audit => audit.groupId === group.id);
    const statusCounts = groupProcesses.reduce((acc, audit) => {
      acc[audit.status] = (acc[audit.status] || 0) + 1;
      return acc;
    }, {} as Record<ProcessStatus, number>);
    
    return {
      name: group.name,
      ...statusCounts,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Process Status by Group</CardTitle>
        <CardDescription>A summary of process outcomes for each group.</CardDescription>
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
