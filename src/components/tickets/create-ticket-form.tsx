
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addTicket } from "@/lib/data";
import type { User, Ticket } from "@/lib/types";

const formSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().optional(),
  assigneeId: z.string({ required_error: "Please select a user to assign the ticket to."}),
  priority: z.enum(["Low", "Medium", "High"], { required_error: "Please select a priority."}),
  status: z.enum(["Open", "In Progress", "Resolved"], { required_error: "Please select a status."}),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateTicketFormProps {
    processId: string;
    users: User[];
    onTicketCreated: (newTicket: Ticket) => void;
}

export function CreateTicketForm({ processId, users, onTicketCreated }: CreateTicketFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "Medium",
      status: "Open",
    },
  });

  const onSubmit = (values: FormValues) => {
    const newTicket = addTicket({
        processId: processId,
        title: values.title,
        description: values.description || "",
        assigneeId: values.assigneeId,
        priority: values.priority,
        status: values.status,
    });
    onTicketCreated(newTicket);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ticket Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Fix SQL Injection Vulnerability" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Provide a detailed description of the issue or task." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="assigneeId"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Assign To</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a user" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {users.map(user => (
                                <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a priority" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                    </Select>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
         <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                        </Trigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                    </SelectContent>
                </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
            <Button type="submit">Create Ticket</Button>
        </div>
      </form>
    </Form>
  );
}
