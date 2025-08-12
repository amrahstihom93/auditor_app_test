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
import { files, getAudit } from "@/lib/data";
import { FileUp, File, FileText, FileSpreadsheet } from "lucide-react";

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
  return (
    <div>
      <PageHeader
        title="Files"
        description="Manage all files related to your audits."
        actions={
          <Button>
            <FileUp className="mr-2 h-4 w-4" />
            Upload File
          </Button>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file) => {
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
                    <TableCell>{file.uploadedAt}</TableCell>
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
