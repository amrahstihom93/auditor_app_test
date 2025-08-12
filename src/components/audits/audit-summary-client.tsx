"use client";

import { useState } from "react";
import { summarizeAuditFindings } from "@/ai/flows/summarize-audit-findings";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Sparkles, Terminal } from "lucide-react";

export function AuditSummaryClient({ findings }: { findings: string }) {
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setError("");
    setSummary("");
    try {
      if (!findings) {
        setError("No findings available to summarize.");
        setIsLoading(false);
        return;
      }
      const result = await summarizeAuditFindings({ auditFindings: findings });
      setSummary(result.summary);
    } catch (e) {
      setError("Failed to generate summary. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="text-primary" />
          AI-Powered Summary
        </CardTitle>
        <CardDescription>
          Generate a concise summary of the audit findings using AI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={handleGenerateSummary} disabled={isLoading || !findings}>
            {isLoading ? "Generating..." : "Generate Summary"}
          </Button>
          {isLoading && <Skeleton className="h-24 w-full rounded-md" />}
          {error && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {summary && (
            <div className="prose prose-sm max-w-none rounded-md border bg-muted p-4 text-sm text-muted-foreground">
              <p>{summary}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
