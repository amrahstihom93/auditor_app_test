import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { templates, getUser } from "@/lib/data";
import { PlusCircle, ListChecks } from "lucide-react";
import Link from "next/link";

export default function TemplatesPage() {
  return (
    <div>
      <PageHeader
        title="Audit Templates"
        description="Create and manage reusable templates for your audits."
        actions={
          <Button asChild>
            <Link href="/templates/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Template
            </Link>
          </Button>
        }
      />
      <div className="space-y-4">
        {templates.map((template) => {
            const creator = getUser(template.createdBy);
            return (
                <Card key={template.id}>
                    <CardHeader>
                        <CardTitle>{template.name}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                        <p className="text-xs text-muted-foreground">Created by {creator?.name} on {new Date(template.createdAt).toLocaleDateString()}</p>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="items">
                                <AccordionTrigger>View Checklist Items</AccordionTrigger>
                                <AccordionContent>
                                    <ul className="space-y-2 pt-2">
                                        {template.items.map(item => (
                                            <li key={item.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <ListChecks className="h-4 w-4 text-primary" />
                                                {item.text}
                                            </li>
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            )
        })}
      </div>
    </div>
  );
}
