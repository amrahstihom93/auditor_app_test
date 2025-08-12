export type UserRole = "Admin" | "Auditor" | "Viewer";
export type UserStatus = "Active" | "Inactive" | "Pending";

export type Organization = {
  id: string;
  name: string;
  avatar: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  status: UserStatus;
  organizationId: string;
};

export type AuditStatus = "Passed" | "Failed" | "In Progress" | "Pending";

export type Audit = {
  id: string;
  name: string;
  status: AuditStatus;
  groupId: string;
  organizationId: string;
  findings: string;
  summary?: string;
  date: string;
  auditorId: string;
};

export type Group = {
  id: string;
  name: string;
  description: string;
  organizationId: string;
};

export type ManagedFile = {
  id: string;
  name: string;
  type: "pdf" | "docx" | "xlsx";
  size: string;
  uploadedAt: string;
  auditId: string;
  organizationId: string;
};

export type AuditTemplate = {
  id: string;
  name: string;
  description: string;
  items: { id: string; text: string }[];
  organizationId: string;
  createdBy: string;
  createdAt: string;
};
