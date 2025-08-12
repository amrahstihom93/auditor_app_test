"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  generateOnboardingTemplate,
  type OnboardingTemplateOutput,
} from "@/ai/flows/generate-onboarding-template";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ListChecks, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { AuditTemplate } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";
import { getCurrentUser } from "@/lib/data";

const formSchema = z.object({
  name: z.string().min(1, "Template name is required."),
  description: z.string().min(1, "Template description is required."),
  role: z.string().min(1, "Role is required."),
  company: z.string().min(1, "Company description is required."),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateTemplateFormProps {
  addTemplate: (template: Omit<AuditTemplate, 'id' | 'organizationId'>) => void;
}

export function CreateTemplateForm({ addTemplate }: CreateTemplateFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [generatedItems, setGeneratedItems] = useState<OnboardingTemplateOutput>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      role: "",
      company: "",
    },
  });

  const handleGenerateItems = async () => {
    const { role, company } = form.getValues();
    if (!role || !company) {
      form.trigger(["role", "company"]);
      return;
    }
    setIsGenerating(true);
    setGeneratedItems([]);
    try {
      const result = await generateOnboardingTemplate({
        role,
        companyDescription: company,
      });
      setGeneratedItems(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error Generating Items",
        description: "An unexpected error occurred while generating the checklist.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = (values: FormValues) => {
    if (generatedItems.length === 0) {
        toast({
            variant: "destructive",
            title: "No Checklist Items",
            description: "Please generate checklist items before saving the template.",
        });
        return;
    }

    const newTemplate = {
      name: values.name,
      description: values.description,
      items: generatedItems.map((item, index) => ({ id: `item_${Date.now()}_${index}`, text: item.text })),
      createdBy: getCurrentUser().id,
      createdAt: new Date().toISOString(),
    };

    addTemplate(newTemplate);

    toast({
      title: "Template Created",
      description: `The "${values.name}" template has been successfully created.`,
    });

    router.push("/templates");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
             <Card>
                <CardHeader>
                    <CardTitle>Template Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Template Name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Software Engineer Onboarding" {...field} />
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
                            <Textarea
                            placeholder="A brief description of this template's purpose."
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </CardContent>
             </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="text-primary" />
                        Generate Checklist
                    </CardTitle>
                    <CardDescription>Provide details about the role and company to generate a tailored onboarding checklist using AI.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Job Role</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Senior Product Manager" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Company Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="e.g., A fast-growing SaaS startup in the fintech industry." {...field} />
                        </FormControl>
                         <FormMessage />
                        </FormItem>
                    )}
                    />
                     <Button type="button" onClick={handleGenerateItems} disabled={isGenerating}>
                        {isGenerating ? "Generating..." : "Generate Items"}
                    </Button>
                </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2">
            <Card className="min-h-full">
                <CardHeader>
                    <CardTitle>Generated Checklist</CardTitle>
                    <CardDescription>Review the AI-generated items below. They will be saved with the template.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isGenerating && (
                        <div className="space-y-4">
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-[80%]" />
                            <Skeleton className="h-8 w-[90%]" />
                        </div>
                    )}
                    {!isGenerating && generatedItems.length === 0 && (
                        <div className="text-center text-muted-foreground py-12">
                            <p>Checklist items will appear here after generation.</p>
                        </div>
                    )}
                    {generatedItems.length > 0 && (
                        <ul className="space-y-3">
                            {generatedItems.map((item, index) => (
                                <li key={index} className="flex items-start gap-3 text-sm">
                                    <ListChecks className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </CardContent>
            </Card>
          </div>
        </div>
        <Button type="submit" size="lg" disabled={generatedItems.length === 0 || isGenerating}>
            Save Template
        </Button>
      </form>
    </Form>
  );
}
