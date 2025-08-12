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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { users as initialUsers, getCurrentUser } from "@/lib/data";
import { PlusCircle, MoreHorizontal, Search } from "lucide-react";
import type { UserRole, User, UserStatus } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { InviteUserForm } from "@/components/users/invite-user-form";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

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

const getStatusVariant = (status: UserStatus) => {
    switch (status) {
        case 'Active':
            return 'default';
        case 'Pending':
            return 'secondary';
        case 'Inactive':
            return 'destructive';
    }
}

const getStatusBadgeClass = (status: UserStatus) => {
    switch (status) {
        case 'Active':
            return 'bg-green-500/20 text-green-700 border-green-500/30';
        case 'Pending':
            return 'bg-amber-500/20 text-amber-700 border-amber-500/30';
        case 'Inactive':
            return 'bg-red-500/20 text-red-700 border-red-500/30';
    }
}


export default function UsersPage() {
  const [userList, setUserList] = useState<User[]>(initialUsers);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const currentUser = getCurrentUser();

  const handleUserInvited = (newUser: User) => {
    setUserList((prev) => [...prev, newUser]);
    setIsInviteDialogOpen(false);
    toast({
      title: "User Invited",
      description: `${newUser.name} has been added to your organization.`,
    });
  };
  
  const handleRemoveUser = (userId: string) => {
    setUserList((prev) => prev.filter(user => user.id !== userId));
    toast({
        title: "User Removed",
        description: `The user has been removed from the organization.`,
    });
  }

  const filteredUsers = useMemo(() => {
    return userList.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [userList, searchQuery])

  return (
    <div>
      <PageHeader
        title="Users"
        description="Manage users and their roles in the organization."
        actions={
          currentUser.role === 'Admin' && (
             <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
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
            <div className="mb-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Search by name..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="person avatar" />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRoleVariant(user.role)}>{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusBadgeClass(user.status)}>{user.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit Role</DropdownMenuItem>
                        <DropdownMenuItem>Change Status</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                              Remove User
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently remove the user from your organization.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleRemoveUser(user.id)} className="bg-destructive hover:bg-destructive/90">
                                Remove
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
