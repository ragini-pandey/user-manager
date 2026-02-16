import type { FieldConfig } from '../types/user';
export const userFieldsConfig: FieldConfig[] = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    placeholder: 'Enter first name',
    validation: {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-Z\s'-]+$/,
    },
    errorMessages: {
      required: 'First name is required',
      pattern: 'Only letters, spaces, hyphens, and apostrophes allowed',
      minLength: 'Must be at least 2 characters',
      maxLength: 'Must be 50 characters or fewer',
    },
    gridSize: 6,
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    placeholder: 'Enter last name',
    validation: {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-Z\s'-]+$/,
    },
    errorMessages: {
      required: 'Last name is required',
      pattern: 'Only letters, spaces, hyphens, and apostrophes allowed',
      minLength: 'Must be at least 2 characters',
      maxLength: 'Must be 50 characters or fewer',
    },
    gridSize: 6,
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'tel',
    placeholder: '+1-555-0100',
    validation: {
      required: true,
      pattern: /^[+]?[\d\s()-]{7,20}$/,
    },
    errorMessages: {
      required: 'Phone number is required',
      pattern: 'Enter a valid phone number (e.g. +1-555-0100)',
    },
    gridSize: 6,
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'user@example.com',
    validation: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    errorMessages: {
      required: 'Email address is required',
      pattern: 'Enter a valid email address',
    },
    gridSize: 6,
  },
];

 
export function getDefaultFormValues(): Record<string, string> {
  return userFieldsConfig.reduce(
    (acc, field) => {
      acc[field.name] = field.defaultValue ?? '';
      return acc;
    },
    {} as Record<string, string>,
  );
}
