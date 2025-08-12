
import type { Organization, User, Process, Group, ManagedFile, AuditTemplate, Ticket } from './types';

// In-memory data store
let organizations: Organization[] = [
  { id: 'org_1', name: 'Innovate Inc.', avatar: 'https://placehold.co/32x32.png' },
  { id: 'org_2', name: 'SecureSoft', avatar: 'https://placehold.co/32x32.png' },
  { id: 'org_3', name: 'DataCorp', avatar: 'https://placehold.co/32x32.png' },
];

let users: User[] = [
  { id: 'user_1', name: 'Alice Johnson', email: 'alice@innovate.com', avatar: 'https://placehold.co/40x40.png', role: 'Admin', status: 'Active', organizationId: 'org_1' },
  { id: 'user_2', name: 'Bob Williams', email: 'bob@securesoft.com', avatar: 'https://placehold.co/40x40.png', role: 'Auditor', status: 'Active', organizationId: 'org_2' },
  { id: 'user_3', name: 'Charlie Brown', email: 'charlie@datacorp.com', avatar: 'https://placehold.co/40x40.png', role: 'Viewer', status: 'Inactive', organizationId: 'org_3' },
  { id: 'user_4', name: 'Diana Prince', email: 'diana@innovate.com', avatar: 'https://placehold.co/40x40.png', role: 'Auditor', status: 'Active', organizationId: 'org_1' },
  { id: 'user_5', name: 'Ethan Hunt', email: 'ethan@securesoft.com', avatar: 'https://placehold.co/40x40.png', role: 'Admin', status: 'Pending', organizationId: 'org_2' },
];

let groups: Group[] = [
    { id: 'group_1', name: 'SOC 2 Compliance', description: 'Processes related to SOC 2 Type II certification.', organizationId: 'org_1' },
    { id: 'group_2', name: 'Internal Security', description: 'Regular internal security assessments.', organizationId: 'org_1' },
    { id: 'group_3', name: 'Financial Systems', description: 'Processes for financial system integrity.', organizationId: 'org_2' },
];

let processes: Process[] = [
  { id: 'audit_1', name: 'Q1 2024 SOC 2', status: 'Passed', groupId: 'group_1', organizationId: 'org_1', date: '2024-03-15', auditorId: 'user_4', findings: 'All controls were met. No exceptions noted. Strong encryption and access control mechanisms are in place. Recommend continuous monitoring of firewall rules.', processOwnerName: 'Product Team', processOwnerEmail: 'product@innovate.com' },
  { id: 'audit_2', name: 'Q2 2024 SOC 2', status: 'In Progress', groupId: 'group_1', organizationId: 'org_1', date: '2024-06-20', auditorId: 'user_4', findings: 'Process is currently underway. Initial review of access logs shows no anomalies.', processOwnerName: 'Product Team', processOwnerEmail: 'product@innovate.com' },
  { id: 'audit_3', name: 'Penetration Test', status: 'Failed', groupId: 'group_2', organizationId: 'org_1', date: '2024-05-01', auditorId: 'user_4', findings: 'Critical vulnerability found in the main web application (SQL Injection). Several medium-risk vulnerabilities related to outdated server software were also identified. Immediate remediation is required.', processOwnerName: 'Engineering Team', processOwnerEmail: 'eng@innovate.com' },
  { id: 'audit_4', name: 'Payment Gateway Audit', status: 'Passed', groupId: 'group_3', organizationId: 'org_2', date: '2024-04-10', auditorId: 'user_2', findings: 'Transaction processing is secure and compliant with PCI DSS standards.', processOwnerName: 'Finance Dept', processOwnerEmail: 'finance@securesoft.com' },
  { id: 'audit_5', name: 'HR System Access Control', status: 'Pending', groupId: 'group_3', organizationId: 'org_2', date: '2024-07-05', auditorId: 'user_2', findings: '', processOwnerName: 'HR Team', processOwnerEmail: 'hr@securesoft.com' },
  { id: 'audit_6', name: 'Data Center Physical Security', status: 'Passed', groupId: 'group_2', organizationId: 'org_1', date: '2024-02-28', auditorId: 'user_4', findings: 'Physical access controls are robust. Biometric scanners and surveillance systems are fully operational.', processOwnerName: 'IT Operations', processOwnerEmail: 'itops@innovate.com' },
];

let tickets: Ticket[] = [
    { id: 'ticket_1', processId: 'audit_3', organizationId: 'org_1', title: 'Remediate SQL Injection Vulnerability', description: 'The main web application is vulnerable to SQL injection on the login page.', status: 'In Progress', priority: 'High', assigneeId: 'user_4', createdAt: '2024-05-02' },
    { id: 'ticket_2', processId: 'audit_3', organizationId: 'org_1', title: 'Update Apache Server Version', description: 'Server is running an outdated version of Apache with known vulnerabilities.', status: 'Open', priority: 'Medium', assigneeId: 'user_4', createdAt: '2024-05-02' },
    { id: 'ticket_3', processId: 'audit_1', organizationId: 'org_1', title: 'Review Firewall Rule #4815', description: 'Firewall rule #4815 seems overly permissive. Review and tighten if necessary.', status: 'Resolved', priority: 'Low', assigneeId: 'user_1', createdAt: '2024-03-16' },
];

let files: ManagedFile[] = [
    { id: 'file_1', name: 'SOC2_Report_Q1_2024.pdf', type: 'pdf', size: '2.5 MB', uploadedAt: '2024-03-20', auditId: 'audit_1', organizationId: 'org_1' },
    { id: 'file_2', name: 'pentest_results.docx', type: 'docx', size: '800 KB', uploadedAt: '2024-05-02', auditId: 'audit_3', organizationId: 'org_1' },
    { id: 'file_3', name: 'evidence_logs.xlsx', type: 'xlsx', size: '5.1 MB', uploadedAt: '2024-06-18', auditId: 'audit_2', organizationId: 'org_1' },
];

let templates: AuditTemplate[] = [
    { id: 'template_1', name: 'Standard Web App Security Process', description: 'A template for auditing typical web applications.', organizationId: 'org_1', createdBy: 'user_1', createdAt: '2024-01-10', items: [
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

// In a real app, this would be determined by the authentication state.
let currentUserId = 'user_1';
let currentOrganizationId = 'org_1';

export const getCurrentUser = (): User => {
    return users.find(u => u.id === currentUserId)!;
};

export const getCurrentOrganization = (): Organization => {
    return organizations.find(o => o.id === currentOrganizationId)!;
};

// --- DATA ACCESS FUNCTIONS (MULTI-TENANT AWARE) ---

export const getOrganizations = (): Organization[] => {
    // In a real multi-tenant app, you might restrict which orgs are visible.
    // For now, we return all.
    return organizations;
}

export const getUsers = (): User[] => {
    const orgId = getCurrentOrganization().id;
    return users.filter(u => u.organizationId === orgId);
};

export const getUser = (id: string): User | undefined => {
    const orgId = getCurrentOrganization().id;
    return users.find(u => u.id === id && u.organizationId === orgId);
}

export const getProcesses = (): Process[] => {
    const orgId = getCurrentOrganization().id;
    return processes.filter(a => a.organizationId === orgId);
};

export const getProcess = (id: string): Process | undefined => {
    const orgId = getCurrentOrganization().id;
    return processes.find(a => a.id === id && a.organizationId === orgId);
}

export const getGroups = (): Group[] => {
    const orgId = getCurrentOrganization().id;
    return groups.filter(g => g.organizationId === orgId);
}

export const getGroup = (id: string): Group | undefined => {
    const orgId = getCurrentOrganization().id;
    return groups.find(g => g.id === id && g.organizationId === orgId);
}

export const getFiles = (): ManagedFile[] => {
    const orgId = getCurrentOrganization().id;
    return files.filter(f => f.organizationId === orgId);
}

export const getTemplates = (): AuditTemplate[] => {
    const orgId = getCurrentOrganization().id;
    return templates.filter(t => t.organizationId === orgId);
}

export const getTicketsForProcess = (processId: string): Ticket[] => {
    const orgId = getCurrentOrganization().id;
    return tickets.filter(t => t.processId === processId && t.organizationId === orgId);
}


// --- DATA MUTATION FUNCTIONS ---

export function updateUser(userId: string, data: Partial<Pick<User, 'name' | 'email'>>): User | undefined {
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex > -1) {
        users[userIndex] = { ...users[userIndex], ...data };
        return users[userIndex];
    }
    return undefined;
}

export function updateOrganization(orgId: string, data: Partial<Pick<Organization, 'name'>>): Organization | undefined {
     const orgIndex = organizations.findIndex(o => o.id === orgId);
    if (orgIndex > -1) {
        organizations[orgIndex] = { ...organizations[orgIndex], ...data };
        return organizations[orgIndex];
    }
    return undefined;
}


export function addTicket(ticket: Omit<Ticket, 'id' | 'organizationId' | 'createdAt'>): Ticket {
    const newTicket: Ticket = {
        id: `ticket_${Date.now()}`,
        organizationId: getCurrentOrganization().id,
        createdAt: new Date().toISOString(),
        ...ticket
    };
    tickets.unshift(newTicket);
    return newTicket;
}

export function addTemplate(template: Omit<AuditTemplate, 'id' | 'organizationId'>) {
    const newTemplate: AuditTemplate = {
        id: `template_${Date.now()}`,
        organizationId: getCurrentOrganization().id,
        ...template
    };
    templates.unshift(newTemplate);
}

export function addUserAndOrganization({ orgName, userName, userEmail }: { orgName: string, userName: string, userEmail: string }) {
    const newOrgId = `org_${Date.now()}`;
    const newUserId = `user_${Date.now()}`;

    const newOrg: Organization = {
        id: newOrgId,
        name: orgName,
        avatar: 'https://placehold.co/32x32.png',
    };
    organizations.unshift(newOrg);

    const newUser: User = {
        id: newUserId,
        name: userName,
        email: userEmail,
        avatar: 'https://placehold.co/40x40.png',
        role: 'Admin', // First user in an org is always an Admin
        status: 'Active',
        organizationId: newOrg.id,
    };
    users.unshift(newUser);

    // Switch the current session to the new user and org
    currentUserId = newUserId;
    currentOrganizationId = newOrgId;
}

export function addUserToCurrentOrg(user: Omit<User, 'id' | 'organizationId' | 'avatar' | 'status'>): User {
    const newId = `user_${Date.now()}`;
    const newUser: User = {
        id: newId,
        organizationId: getCurrentOrganization().id,
        avatar: `https://placehold.co/40x40.png?text=${user.name.charAt(0)}`,
        status: 'Pending',
        ...user,
    };
    users.push(newUser);
    return newUser;
}

export function addFile(fileData: Omit<ManagedFile, 'id' | 'organizationId' | 'uploadedAt' | 'size'>): ManagedFile {
    const newFile: ManagedFile = {
        id: `file_${Date.now()}`,
        organizationId: getCurrentOrganization().id,
        uploadedAt: new Date().toISOString(),
        size: `${(Math.random() * 5).toFixed(1)} MB`, // Simulate file size
        ...fileData,
    };
    files.unshift(newFile);
    return newFile;
}

export function deleteFile(fileId: string) {
    files = files.filter(f => f.id !== fileId);
}
