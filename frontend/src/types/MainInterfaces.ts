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

export const options = [
    {
      
      label: 'Нет',
      value: 'Нет',
    },
    {
      label: 'Да',
      value: 'Да',
    },
    {
        label: 'Нет информации',
        value: 'Нет информации',
      },
  ]
export const DEVICE_TYPE = {value: 'Нет информации', label: "Нет информации"}

export const defaultObj = {
    id: "",
    deviceName: "",
    deviceModel: "",
    inventoryName: "",
    factoryNumber: "",
    userName: "",
    dateOfIssue: "05-12-2024",
    note: "",
    verificationEndDate: "05-12-2024",
    haveMetal: "Нет информации",
    deviceType: DEVICE_TYPE,
    files: []
  }
export const DATE_FORMAT = 'YYYY-MM-DD';

export const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };