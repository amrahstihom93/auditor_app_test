
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getFiles, getAudit, deleteFile, addFile } from "@/lib/data";
import type { ManagedFile } from "@/lib/types";
import { FileUp, File, FileText, FileSpreadsheet, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UploadFileForm } from "@/components/files/upload-file-form";

const getFileIcon = (type: string) => {
    switch (type) {
        case 'pdf':
            return <FileText className="h-5 w-5 text-muted-foreground" />;
        case 'docx':
            return <File className="h-5 w-5 text-muted-foreground" />;
        case 'xlsx':
            return <FileSpreadsheet className="h-5 w-5 text-muted-foreground" />;
        default:
            return <File className="h-5 w-5 text-muted-foreground" />;
    }
}

export default function FilesPage() {
  const [fileList, setFileList] = useState<ManagedFile[]>(() => getFiles());
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleFileUploaded = (newFile: ManagedFile) => {
    setFileList((prev) => [newFile, ...prev]);
    setIsUploadDialogOpen(false);
    toast({
      title: "File Uploaded",
      description: `The file "${newFile.name}" has been successfully uploaded.`,
    });
  };

  const handleFileDeleted = (fileId: string) => {
    deleteFile(fileId);
    setFileList((prev) => prev.filter(file => file.id !== fileId));
    toast({
      title: "File Deleted",
      description: "The file has been removed.",
    });
  }

  return (
    <div>
      <PageHeader
        title="Files"
        description="Manage all files related to your audits."
        actions={
           <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <FileUp className="mr-2 h-4 w-4" />
                Upload File
              </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload a New File</DialogTitle>
                    <DialogDescription>
                        Select a file and associate it with an audit.
                    </DialogDescription>
                </DialogHeader>
                <UploadFileForm onFileUploaded={handleFileUploaded} />
            </DialogContent>
          </Dialog>
        }
      />
      <Card>
        <CardHeader>
          <CardTitle>File Library</CardTitle>
          <CardDescription>All files uploaded for audit evidence and reports.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File Name</TableHead>
                <TableHead>Related Audit</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Uploaded At</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fileList.map((file) => {
                const audit = getAudit(file.auditId);
                return (
                  <TableRow key={file.id}>
                    <TableCell>
                        <div className="flex items-center gap-3">
                           {getFileIcon(file.type)}
                           <span className="font-medium">{file.name}</span>
                        </div>
                    </TableCell>
                    <TableCell>{audit?.name}</TableCell>
                    <TableCell>{file.size}</TableCell>
                    <TableCell>{new Date(file.uploadedAt).toLocaleDateString()}</TableCell>
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
                                <DropdownMenuItem>Download</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                                      Delete File
                                    </DropdownMenuItem>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the file.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleFileDeleted(file.id)} className="bg-destructive hover:bg-destructive/90">
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
