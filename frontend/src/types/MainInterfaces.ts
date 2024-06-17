export interface IObjProps {
    id: string
    deviceName: string;
    deviceModel: string;
    inventoryName: string,
    factoryNumber: string,
    userName: string,
    dateOfIssue: string | null,
    note: string,
    verificationEndDate: string | null,
    haveMetal: string,
    deviceType: {value: any, label: string},
    files: any[]
}

export const roles = {
    ROLE_BASE: "employee",
    ROLE_ADMIN: "admin",
    ROLE_EDITOR: "editor"
}
export type userRole = 'admin' | 'editor' | 'employee'
