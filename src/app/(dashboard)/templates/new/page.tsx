import { CreateTemplateForm } from "@/components/templates/create-template-form";
import { PageHeader } from "@/components/shared/page-header";
import { addTemplate } from "@/lib/data";

export default function NewTemplatePage() {
  return (
    <div>
      <PageHeader
        title="Create New Template"
        description="Use AI to generate a checklist for a new onboarding template."
      />
      <CreateTemplateForm addTemplate={addTemplate} />
    </div>
  );
}
