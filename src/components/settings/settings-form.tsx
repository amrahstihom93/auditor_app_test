
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid email address."),
});

const orgSchema = z.object({
  name: z.string().min(1, "Organization name is required."),
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type OrgFormValues = z.infer<typeof orgSchema>;

interface SettingsFormProps {
  type: "profile" | "organization";
  defaultValues: ProfileFormValues | OrgFormValues;
  onSubmit: (data: any) => void;
}

export function SettingsForm({ type, defaultValues, onSubmit }: SettingsFormProps) {
  const isProfile = type === "profile";
  const schema = isProfile ? profileSchema : orgSchema;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { isSubmitting, isDirty } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>{isProfile ? "My Profile" : "Organization"}</CardTitle>
            <CardDescription>
              {isProfile
                ? "Update your personal information."
                : "Manage your organization's details."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isProfile ? "Full Name" : "Organization Name"}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isProfile && (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <div className="flex w-full justify-between items-center">
                 <p className="text-sm text-muted-foreground">
                    {isDirty ? "You have unsaved changes." : "No changes to save."}
                </p>
                <Button type="submit" disabled={isSubmitting || !isDirty}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

export type { ProfileFormValues, OrgFormValues };
