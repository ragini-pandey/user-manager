export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  [key: string]: unknown;
}

export type UserPayload = Omit<User, 'id'>;


export type FieldType = 'text' | 'email' | 'tel' | 'date' | 'number' | 'textarea' | 'select';


export interface ValidationRule {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  custom?: (value: string) => string | null;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  validation: ValidationRule;
  errorMessages?: {
    required?: string;
    pattern?: string;
    minLength?: string;
    maxLength?: string;
  };
  gridSize?: number;
  options?: { label: string; value: string }[];
  defaultValue?: string;
}

export interface ApiError {
  message: string;
  status?: number;
}
