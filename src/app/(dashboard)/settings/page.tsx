
"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { getCurrentUser, getCurrentOrganization, updateUser, updateOrganization } from "@/lib/data";
import { SettingsForm, ProfileFormValues, OrgFormValues } from "@/components/settings/settings-form";
import { useToast } from "@/hooks/use-toast";
import { ThemeSettings } from "@/components/settings/theme-settings";

export default function SettingsPage() {
  const [user, setUser] = useState(() => getCurrentUser());
  const [organization, setOrganization] = useState(() => getCurrentOrganization());
  const { toast } = useToast();

  const handleProfileUpdate = (data: ProfileFormValues) => {
    const updatedUser = updateUser(user.id, data);
    if (updatedUser) {
      setUser(updatedUser);
      toast({
        title: "Profile Updated",
        description: "Your personal information has been successfully updated.",
      });
    }
  };

  const handleOrgUpdate = (data: OrgFormValues) => {
    const updatedOrg = updateOrganization(organization.id, data);
    if (updatedOrg) {
      setOrganization(updatedOrg);
      toast({
        title: "Organization Updated",
        description: "Your organization's information has been successfully updated.",
      });
    }
  };

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage your account and organization settings."
      />
      <div className="space-y-8">
        <SettingsForm
          type="profile"
          defaultValues={{ name: user.name, email: user.email }}
          onSubmit={handleProfileUpdate}
        />
        {user.role === 'Admin' && (
          <SettingsForm
            type="organization"
            defaultValues={{ name: organization.name }}
            onSubmit={handleOrgUpdate}
          />
        )}
        <ThemeSettings />
      </div>
    </div>
  );
}
