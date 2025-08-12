import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Save } from "lucide-react";

export default function NotesPage() {
  return (
    <div>
      <PageHeader
        title="My Notes"
        description="A private space for your notes and reminders."
        actions={
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Notes
          </Button>
        }
      />
      <Card>
        <CardHeader>
          <CardTitle>Scratchpad</CardTitle>
          <CardDescription>
            These notes are only visible to you. Use this space for quick thoughts, to-do items, or anything else you need to remember.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Start typing your notes here..."
            className="min-h-[400px] text-base"
          />
        </CardContent>
      </Card>
    </div>
  );
}
