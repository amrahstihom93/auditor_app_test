'use server';

import { revalidatePath } from 'next/cache';
import { addTemplate as addTemplateData } from '@/lib/data';
import type { AuditTemplate } from '@/lib/types';
import { getCurrentUser } from '@/lib/data';

type OnboardingTemplateItem = {
    text: string;
};

interface CreateTemplatePayload {
    name: string;
    description: string;
    items: OnboardingTemplateItem[];
}

export async function createTemplateAction(payload: CreateTemplatePayload) {
    const newTemplate: Omit<AuditTemplate, 'id' | 'organizationId'> = {
        name: payload.name,
        description: payload.description,
        items: payload.items.map((item, index) => ({ id: `item_${Date.now()}_${index}`, text: item.text })),
        createdBy: getCurrentUser().id,
        createdAt: new Date().toISOString(),
    };

    addTemplateData(newTemplate);
    revalidatePath('/templates');

    return { success: true, message: `Template "${payload.name}" created.` };
}
