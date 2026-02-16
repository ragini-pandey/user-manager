import type { FieldConfig } from '../types/user';

export function validateField(field: FieldConfig, value: string): string {
  const { validation, errorMessages } = field;
  const trimmed = value.trim();

  if (validation.required && trimmed.length === 0) {
    return errorMessages?.required ?? `${field.label} is required`;
  }

  if (trimmed.length === 0) return '';

  if (validation.minLength && trimmed.length < validation.minLength) {
    return (
      errorMessages?.minLength ??
      `${field.label} must be at least ${validation.minLength} characters`
    );
  }

  if (validation.maxLength && trimmed.length > validation.maxLength) {
    return (
      errorMessages?.maxLength ??
      `${field.label} must be ${validation.maxLength} characters or fewer`
    );
  }

  if (validation.pattern && !validation.pattern.test(trimmed)) {
    return errorMessages?.pattern ?? `${field.label} is invalid`;
  }

  if (validation.custom) {
    const customError = validation.custom(trimmed);
    if (customError) return customError;
  }

  return '';
}

export function validateAllFields(
  fields: FieldConfig[],
  values: Record<string, string>,
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const field of fields) {
    const error = validateField(field, values[field.name] ?? '');
    if (error) errors[field.name] = error;
  }

  return errors;
}
