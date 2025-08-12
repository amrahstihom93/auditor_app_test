"use client";

import { useState } from "react";
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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { users, getCurrentUser } from "@/lib/data";
import { PlusCircle } from "lucide-react";
import type { UserRole, User } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { InviteUserForm } from "@/components/users/invite-user-form";
import { useToast } from "@/hooks/use-toast";

const getRoleVariant = (role: UserRole) => {
    switch (role) {
        case 'Admin':
            return 'default';
        case 'Auditor':
            return 'secondary';
        case 'Viewer':
            return 'outline';
    }
}

export default function UsersPage() {
  const [userList, setUserList] = useState<User[]>(users);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const currentUser = getCurrentUser();

  const handleUserInvited = (newUser: User) => {
    setUserList((prev) => [...prev, newUser]);
    setIsDialogOpen(false);
    toast({
      title: "User Invited",
      description: `${newUser.name} has been added to your organization.`,
    });
  };

  return (
    <div>
      <PageHeader
        title="Users"
        description="Manage users and their roles in the organization."
        actions={
          currentUser.role === 'Admin' && (
             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Invite User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite a new user</DialogTitle>
                  <DialogDescription>
                    Enter the details below to invite a new user to your organization.
                  </DialogDescription>
                </DialogHeader>
                <InviteUserForm onUserInvited={handleUserInvited} />
              </DialogContent>
            </Dialog>
          )
        }
      />
      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
          <CardDescription>All users associated with your organization.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userList.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="person avatar" />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={getRoleVariant(user.role)}>{user.role}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}