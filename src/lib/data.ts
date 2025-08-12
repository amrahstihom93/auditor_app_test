import type { Organization, User, Audit, Group, ManagedFile, AuditTemplate } from './types';

export const organizations: Organization[] = [
  { id: 'org_1', name: 'Innovate Inc.', avatar: 'https://placehold.co/32x32.png' },
  { id: 'org_2', name: 'SecureSoft', avatar: 'https://placehold.co/32x32.png' },
  { id: 'org_3', name: 'DataCorp', avatar: 'https://placehold.co/32x32.png' },
];

export let users: User[] = [
  { id: 'user_1', name: 'Alice Johnson', email: 'alice@innovate.com', avatar: 'https://placehold.co/32x32.png', role: 'Admin', organizationId: 'org_1' },
  { id: 'user_2', name: 'Bob Williams', email: 'bob@securesoft.com', avatar: 'https://placehold.co/32x32.png', role: 'Auditor', organizationId: 'org_2' },
  { id: 'user_3', name: 'Charlie Brown', email: 'charlie@datacorp.com', avatar: 'https://placehold.co/32x32.png', role: 'Viewer', organizationId: 'org_3' },
  { id: 'user_4', name: 'Diana Prince', email: 'diana@innovate.com', avatar: 'https://placehold.co/32x32.png', role: 'Auditor', organizationId: 'org_1' },
  { id: 'user_5', name: 'Ethan Hunt', email: 'ethan@securesoft.com', avatar: 'https://placehold.co/32x32.png', role: 'Admin', organizationId: 'org_2' },
];

export const groups: Group[] = [
    { id: 'group_1', name: 'SOC 2 Compliance', description: 'Audits related to SOC 2 Type II certification.', organizationId: 'org_1' },
    { id: 'group_2', name: 'Internal Security', description: 'Regular internal security assessments.', organizationId: 'org_1' },
    { id: 'group_3', name: 'Financial Systems', description: 'Audits for financial system integrity.', organizationId: 'org_2' },
];

export const audits: Audit[] = [
  { id: 'audit_1', name: 'Q1 2024 SOC 2 Audit', status: 'Passed', groupId: 'group_1', organizationId: 'org_1', date: '2024-03-15', auditorId: 'user_4', findings: 'All controls were met. No exceptions noted. Strong encryption and access control mechanisms are in place. Recommend continuous monitoring of firewall rules.' },
  { id: 'audit_2', name: 'Q2 2024 SOC 2 Audit', status: 'In Progress', groupId: 'group_1', organizationId: 'org_1', date: '2024-06-20', auditorId: 'user_4', findings: 'Audit is currently underway. Initial review of access logs shows no anomalies.' },
  { id: 'audit_3', name: 'Penetration Test', status: 'Failed', groupId: 'group_2', organizationId: 'org_1', date: '2024-05-01', auditorId: 'user_4', findings: 'Critical vulnerability found in the main web application (SQL Injection). Several medium-risk vulnerabilities related to outdated server software were also identified. Immediate remediation is required.' },
  { id: 'audit_4', name: 'Payment Gateway Audit', status: 'Passed', groupId: 'group_3', organizationId: 'org_2', date: '2024-04-10', auditorId: 'user_2', findings: 'Transaction processing is secure and compliant with PCI DSS standards.' },
  { id: 'audit_5', name: 'HR System Access Control', status: 'Pending', groupId: 'group_3', organizationId: 'org_2', date: '2024-07-05', auditorId: 'user_2', findings: '' },
  { id: 'audit_6', name: 'Data Center Physical Security', status: 'Passed', groupId: 'group_2', organizationId: 'org_1', date: '2024-02-28', auditorId: 'user_4', findings: 'Physical access controls are robust. Biometric scanners and surveillance systems are fully operational.' },
];

export const files: ManagedFile[] = [
    { id: 'file_1', name: 'SOC2_Report_Q1_2024.pdf', type: 'pdf', size: '2.5 MB', uploadedAt: '2024-03-20', auditId: 'audit_1', organizationId: 'org_1' },
    { id: 'file_2', name: 'pentest_results.docx', type: 'docx', size: '800 KB', uploadedAt: '2024-05-02', auditId: 'audit_3', organizationId: 'org_1' },
    { id: 'file_3', name: 'evidence_logs.xlsx', type: 'xlsx', size: '5.1 MB', uploadedAt: '2024-06-18', auditId: 'audit_2', organizationId: 'org_1' },
];

export let templates: AuditTemplate[] = [
    { id: 'template_1', name: 'Standard Web App Security Audit', description: 'A template for auditing typical web applications.', organizationId: 'org_1', createdBy: 'user_1', createdAt: '2024-01-10', items: [
        { id: 'item_1', text: 'Check for SQL injection vulnerabilities.' },
        { id: 'item_2', text: 'Verify Cross-Site Scripting (XSS) protection.' },
        { id: 'item_3', text: 'Ensure proper session management.' },
    ]},
    { id: 'template_2', name: 'ISO 27001 Compliance Checklist', description: 'Checklist for ISO 27001 information security standard.', organizationId: 'org_2', createdBy: 'user_5', createdAt: '2024-02-15', items: [
        { id: 'item_1', text: 'Review Information Security Policy document.' },
        { id: 'item_2', text: 'Assess asset management procedures.' },
        { id: 'item_3', text: 'Verify access control mechanisms.' },
    ]},
];

// Helper functions to get data
export const getAudit = (id: string) => audits.find(a => a.id === id);
export const getUser = (id: string) => users.find(u => u.id === id);
export const getGroup = (id: string) => groups.find(g => g.id === id);
export const getOrganization = (id: string) => organizations.find(o => o.id === id);

// For demo purposes, we'll hardcode the current user and organization
export const getCurrentUser = () => users[0];
export const getCurrentOrganization = () => organizations[0];

// Function to add a new template to the in-memory array
export function addTemplate(template: Omit<AuditTemplate, 'id' | 'organizationId'>) {
    const newTemplate: AuditTemplate = {
        id: `template_${Date.now()}`,
        organizationId: getCurrentOrganization().id,
        ...template
    };
    templates.unshift(newTemplate);
}

// Function to add a new user and organization
export function addUserAndOrganization({ orgName, userName, userEmail }: { orgName: string, userName: string, userEmail: string }) {
    const newOrg: Organization = {
        id: `org_${Date.now()}`,
        name: orgName,
        avatar: 'https://placehold.co/32x32.png',
    };
    organizations.unshift(newOrg);

    const newUser: User = {
        id: `user_${Date.now()}`,
        name: userName,
        email: userEmail,
        avatar: 'https://placehold.co/32x32.png',
        role: 'Admin', // First user in an org is always an Admin
        organizationId: newOrg.id,
    };
    users.unshift(newUser);
}

// Function to add a user to the current organization
export function addUserToCurrentOrg(user: Omit<User, 'id' | 'organizationId' | 'avatar'>): User {
    const newId = `user_${Date.now()}`;
    const newUser: User = {
        id: newId,
        organizationId: getCurrentOrganization().id,
        avatar: 'https://placehold.co/32x32.png',
        ...user,
    };
    users.push(newUser);
    return newUser;
}
