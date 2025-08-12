
import type { Organization, User, Process, Group, ManagedFile, AuditTemplate, Ticket } from './types';

// In-memory data store
let organizations: Organization[] = [
  { id: 'org_1', name: 'Innovate Inc.', avatar: 'https://placehold.co/32x32.png' },
  { id: 'org_2', name: 'CyberSafe Solutions', avatar: 'https://placehold.co/32x32.png' },
  { id: 'org_3', name: 'HealthData Corp', avatar: 'https://placehold.co/32x32.png' },
];

let users: User[] = [
  { id: 'user_1', name: 'Alice Johnson', email: 'alice@innovate.com', avatar: 'https://placehold.co/40x40.png', role: 'Admin', status: 'Active', organizationId: 'org_1' },
  { id: 'user_2', name: 'Bob Williams', email: 'bob@cybersafe.com', avatar: 'https://placehold.co/40x40.png', role: 'Auditor', status: 'Active', organizationId: 'org_2' },
  { id: 'user_3', name: 'Charlie Brown', email: 'charlie@healthdata.com', avatar: 'https://placehold.co/40x40.png', role: 'Viewer', status: 'Inactive', organizationId: 'org_3' },
  { id: 'user_4', name: 'Diana Prince', email: 'diana@innovate.com', avatar: 'https://placehold.co/40x40.png', role: 'Auditor', status: 'Active', organizationId: 'org_1' },
  { id: 'user_5', name: 'Ethan Hunt', email: 'ethan@cybersafe.com', avatar: 'https://placehold.co/40x40.png', role: 'Admin', status: 'Pending', organizationId: 'org_2' },
  { id: 'user_6', name: 'Frank Castle', email: 'frank@innovate.com', avatar: 'https://placehold.co/40x40.png', role: 'Viewer', status: 'Active', organizationId: 'org_1' },
];

let groups: Group[] = [
    { id: 'group_1', name: 'SOC 2 Compliance', description: 'Audits related to SOC 2 Type II certification.', organizationId: 'org_1' },
    { id: 'group_2', name: 'Internal Security Audits', description: 'Regular internal security assessments and controls.', organizationId: 'org_1' },
    { id: 'group_3', name: 'ISO 27001 Controls', description: 'Audits for ISO 27001 information security standard.', organizationId: 'org_2' },
    { id: 'group_4', name: 'HIPAA Security Rule', description: 'Audits covering ePHI protection and HIPAA compliance.', organizationId: 'org_3' },
];

let processes: Process[] = [
  { id: 'audit_1', name: 'Q1 2024 User Access Review', status: 'Passed', groupId: 'group_1', organizationId: 'org_1', date: '2024-03-20', auditorId: 'user_4', findings: 'Quarterly user access review completed for all critical systems. Access levels for 98% of users were appropriate for their roles. Minor recommendation to formalize the process for role change approvals.', processOwnerName: 'IT Security', processOwnerEmail: 'itsec@innovate.com' },
  { id: 'audit_2', name: 'AWS Infrastructure Security Audit', status: 'In Progress', groupId: 'group_1', organizationId: 'org_1', date: '2024-06-25', auditorId: 'user_4', findings: 'Audit is currently in the evidence gathering phase. Initial automated scans of S3 bucket policies and IAM roles have been completed. Manual review of network ACLs is pending.', processOwnerName: 'Cloud Operations', processOwnerEmail: 'cloudops@innovate.com' },
  { id: 'audit_3', name: 'Vendor Risk Assessment - CoreWeave', status: 'Failed', groupId: 'group_2', organizationId: 'org_1', date: '2024-05-15', auditorId: 'user_4', findings: 'The vendor CoreWeave failed to provide sufficient evidence of their data encryption at rest controls (SOC 2 Control CC7.1). Their BCP/DR plan also lacks a defined RTO. This poses a significant risk to data integrity.', processOwnerName: 'Procurement', processOwnerEmail: 'procurement@innovate.com' },
  { id: 'audit_4', name: 'ISO 27001 Annex A.12.1.2', status: 'Passed', groupId: 'group_3', organizationId: 'org_2', date: '2024-04-18', auditorId: 'user_2', findings: 'Protection against malware controls are implemented effectively. Anti-malware software is deployed on all endpoints and is updated regularly. User awareness training on phishing is comprehensive.', processOwnerName: 'CyberDefense Team', processOwnerEmail: 'defense@cybersafe.com' },
  { id: 'audit_5', name: 'HIPAA Contingency Plan Test', status: 'Pending', groupId: 'group_4', organizationId: 'org_3', date: '2024-07-10', auditorId: 'user_3', findings: '', processOwnerName: 'Compliance Office', processOwnerEmail: 'compliance@healthdata.com' },
  { id: 'audit_6', name: 'Data Center Physical Security Review', status: 'Passed', groupId: 'group_2', organizationId: 'org_1', date: '2024-02-28', auditorId: 'user_4', findings: 'Physical access controls to the data center are robust. Biometric scanners, mantraps, and surveillance systems are fully operational and logs are reviewed monthly. No unauthorized access attempts were recorded.', processOwnerName: 'IT Operations', processOwnerEmail: 'itops@innovate.com' },
  { id: 'audit_7', name: 'Employee Offboarding Process Review', status: 'Failed', groupId: 'group_2', organizationId: 'org_1', date: '2024-06-05', auditorId: 'user_4', findings: 'Audit found that 2 out of 15 terminated employees in Q2 still had active VPN accounts for more than 48 hours post-termination. This violates the internal policy on timely access revocation (Control AC-2).', processOwnerName: 'Human Resources', processOwnerEmail: 'hr@innovate.com' },
];

let tickets: Ticket[] = [
    { id: 'ticket_1', processId: 'audit_3', organizationId: 'org_1', title: 'Follow up with CoreWeave on Encryption Evidence', description: 'CoreWeave did not provide their latest SOC 2 report. Procurement to escalate and request evidence for control CC7.1 within 14 days.', status: 'In Progress', priority: 'High', assigneeId: 'user_1', createdAt: '2024-05-16' },
    { id: 'ticket_2', processId: 'audit_3', organizationId: 'org_1', title: 'Define RTO in CoreWeave BCP/DR Plan', description: 'The Business Continuity Plan from CoreWeave is missing a clearly defined Recovery Time Objective. This needs to be addressed in the next contract renewal.', status: 'Open', priority: 'Medium', assigneeId: 'user_1', createdAt: '2024-05-16' },
    { id: 'ticket_3', processId: 'audit_1', organizationId: 'org_1', title: 'Formalize Role Change Approval Process', description: 'IT needs to document and implement a formal approval workflow for any changes to user roles and permissions in Okta.', status: 'Resolved', priority: 'Low', assigneeId: 'user_4', createdAt: '2024-03-21' },
    { id: 'ticket_4', processId: 'audit_7', organizationId: 'org_1', title: 'Automate VPN Access Revocation', description: 'The current manual offboarding process is prone to error. IT and HR to collaborate on a script to automatically disable VPN access upon employee termination flagged in the HRIS.', status: 'Open', priority: 'High', assigneeId: 'user_4', createdAt: '2024-06-06' },
];

let files: ManagedFile[] = [
    { id: 'file_1', name: 'Q1_User_Access_Review_Evidence.xlsx', type: 'xlsx', size: '1.8 MB', uploadedAt: '2024-03-19', auditId: 'audit_1', organizationId: 'org_1' },
    { id: 'file_2', name: 'CoreWeave_SOC2_Report_2023.pdf', type: 'pdf', size: '3.2 MB', uploadedAt: '2024-05-10', auditId: 'audit_3', organizationId: 'org_1' },
    { id: 'file_3', name: 'AWS_S3_Scan_Results.pdf', type: 'pdf', size: '950 KB', uploadedAt: '2024-06-24', auditId: 'audit_2', organizationId: 'org_1' },
    { id: 'file_4', name: 'Offboarding_Checklist_Evidence.docx', type: 'docx', size: '450 KB', uploadedAt: '2024-06-04', auditId: 'audit_7', organizationId: 'org_1' },
];

let templates: AuditTemplate[] = [
    { id: 'template_1', name: 'Cloud Vendor Security Assessment', description: 'A standard template for assessing the security posture of cloud service providers.', organizationId: 'org_1', createdBy: 'user_1', createdAt: '2024-01-10', items: [
        { id: 'item_1', text: 'Review vendor SOC 2 Type II report for relevant trust service criteria.' },
        { id: 'item_2', text: 'Validate data encryption policies for data at rest and in transit.' },
        { id: 'item_3', text: 'Assess vendor BCP/DR documentation and test results.' },
        { id: 'item_4', text: 'Review vendor incident response plan.' },
    ]},
    { id: 'template_2', name: 'Employee Onboarding/Offboarding', description: 'Checklist for ensuring secure employee lifecycle management.', organizationId: 'org_1', createdBy: 'user_4', createdAt: '2024-02-15', items: [
        { id: 'item_1', text: 'Verify identity and complete background check before access is granted.' },
        { id: 'item_2', text: 'Ensure principle of least privilege is applied to initial system access.' },
        { id: 'item_3', text: 'Confirm all company assets are returned upon termination.' },
        { id: 'item_4', text: 'Ensure all system access is revoked within 24 hours of termination.' },
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
    return tickets.filter(t => t.processId === processId && t.organizationId === orgId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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
