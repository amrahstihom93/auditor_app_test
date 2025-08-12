'use server';
/**
 * @fileOverview A flow for summarizing audit findings using AI.
 *
 * - summarizeAuditFindings - A function that summarizes audit findings.
 * - SummarizeAuditFindingsInput - The input type for the summarizeAuditFindings function.
 * - SummarizeAuditFindingsOutput - The return type for the summarizeAuditFindings function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeAuditFindingsInputSchema = z.object({
  auditFindings: z
    .string()
    .describe('The detailed findings from an audit report.'),
});
export type SummarizeAuditFindingsInput = z.infer<typeof SummarizeAuditFindingsInputSchema>;

const SummarizeAuditFindingsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the audit findings.'),
});
export type SummarizeAuditFindingsOutput = z.infer<typeof SummarizeAuditFindingsOutputSchema>;

export async function summarizeAuditFindings(input: SummarizeAuditFindingsInput): Promise<SummarizeAuditFindingsOutput> {
  return summarizeAuditFindingsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeAuditFindingsPrompt',
  input: {schema: SummarizeAuditFindingsInputSchema},
  output: {schema: SummarizeAuditFindingsOutputSchema},
  prompt: `You are an expert auditor. Please summarize the following audit findings, highlighting the key issues and critical areas that need attention.\n\nAudit Findings:\n{{{auditFindings}}}`,
});

const summarizeAuditFindingsFlow = ai.defineFlow(
  {
    name: 'summarizeAuditFindingsFlow',
    inputSchema: SummarizeAuditFindingsInputSchema,
    outputSchema: SummarizeAuditFindingsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
