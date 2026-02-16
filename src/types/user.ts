export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  [key: string]: unknown; // allows extensible fields
}

export type FieldType = 'text' | 'email' | 'password' | 'tel' | 'textarea' | 'select';

export interface ValidationRule {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
}

export interface FieldConfig{
  type: FieldType;
  name: string;
  validationRule: ValidationRule;
  label: string;
  placeholder: string;
  defaultValue: string;
  options?: { label : string; value: string}[];
  gridSize?: number;
  errorMessages: {
    required?: string;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  }
}