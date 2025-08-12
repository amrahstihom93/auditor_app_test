
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addFile, audits } from "@/lib/data";
import type { ManagedFile } from "@/lib/types";

const formSchema = z.object({
  fileName: z.string().min(1, "File name is required."),
  auditId: z.string({ required_error: "Please select an audit to link this file to."}),
});

type FormValues = z.infer<typeof formSchema>;

interface UploadFileFormProps {
  onFileUploaded: (newFile: ManagedFile) => void;
}

const getFileExtension = (fileName: string): "pdf" | "docx" | "xlsx" => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (extension === 'pdf') return 'pdf';
    if (extension === 'docx') return 'docx';
    if (extension === 'xlsx') return 'xlsx';
    return 'pdf'; // Default
}

export function UploadFileForm({ onFileUploaded }: UploadFileFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileName: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    // In a real app, you would handle the actual file upload here.
    // We are simulating it by creating a file record.
    const newFile = addFile({
        name: values.fileName,
        auditId: values.auditId,
        type: getFileExtension(values.fileName),
    });
    onFileUploaded(newFile);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fileName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File Name</FormLabel>
              <FormControl>
                 {/* This is a mock. In a real scenario, you'd use a file input */}
                <Input placeholder="e.g., Q1_Evidence.pdf" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="auditId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link to Audit</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select an audit" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {audits.map(audit => (
                            <SelectItem key={audit.id} value={audit.id}>{audit.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
            <Button type="submit">Upload File</Button>
        </div>
      </form>
    </Form>
  );
}
