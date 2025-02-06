export interface Employee {
    id: number;
    name: string;
    department: string;
    localnr: string;
    landline: string;
    mobile: string;
}

export interface EditModalProps {
    open: boolean;
    onClose: () => void;
    employee: Employee | null;
    onSave: (employee: Employee) => void;
  }

export interface SearchBarProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }