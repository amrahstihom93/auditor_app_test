'use server';
/**
 * @fileOverview A flow for generating onboarding audit templates.
 *
 * - generateOnboardingTemplate - A function that generates an onboarding checklist.
 * - OnboardingTemplateInput - The input type for the function.
 * - OnboardingTemplateOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const OnboardingTemplateInputSchema = z.object({
  role: z.string().describe('The job role for the new employee.'),
  companyDescription: z
    .string()
    .describe('A brief description of the company and its industry.'),
});
export type OnboardingTemplateInput = z.infer<typeof OnboardingTemplateInputSchema>;

const OnboardingTemplateOutputSchema = z.array(z.object({
    text: z.string().describe('A single checklist item for the onboarding process.')
}));
export type OnboardingTemplateOutput = z.infer<typeof OnboardingTemplateOutputSchema>;


export async function generateOnboardingTemplate(input: OnboardingTemplateInput): Promise<OnboardingTemplateOutput> {
  return generateOnboardingTemplateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateOnboardingTemplatePrompt',
  input: { schema: OnboardingTemplateInputSchema },
  output: { schema: OnboardingTemplateOutputSchema, format: 'json' },
  prompt: `You are an expert in HR and compliance. Generate a comprehensive onboarding checklist for a new employee.

Role: {{{role}}}
Company: {{{companyDescription}}}

Create a list of specific, actionable items that should be completed during the new employee's first week. Cover areas like paperwork, equipment setup, introductions, and initial training.
`,
});

const generateOnboardingTemplateFlow = ai.defineFlow(
  {
    name: 'generateOnboardingTemplateFlow',
    inputSchema: OnboardingTemplateInputSchema,
    outputSchema: OnboardingTemplateOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
