
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getGroups } from "@/lib/data";
import { PlusCircle } from "lucide-react";

export default function GroupsPage() {
  const groups = getGroups();
  return (
    <div>
      <PageHeader
        title="Groups"
        description="Organize audits into groups for easier management."
        actions={
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Group
          </Button>
        }
      />
      <Card>
        <CardHeader>
          <CardTitle>Group List</CardTitle>
          <CardDescription>All audit groups in your organization.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell className="font-medium">{group.name}</TableCell>
                  <TableCell>{group.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
