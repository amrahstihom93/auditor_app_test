import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  actions?: ReactNode;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between rounded-lg mb-6">
      <div className="grid gap-1">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          {title}
        </h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {actions && <div>{actions}</div>}
    </div>
  );
}
