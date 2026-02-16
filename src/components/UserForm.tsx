import React, { useState, useEffect, useCallback } from 'react';
import {
  TextField,
  Grid,
  MenuItem,
} from '@mui/material';
import type { FieldConfig } from '../types/user';
import { validateField } from '../utils/validations';

interface UserFormProps {
  fields: FieldConfig[];
  values: Record<string, string>;
  onChange: (values: Record<string, string>) => void;
  validate?: boolean;
  onValidationChange?: (isValid: boolean) => void;
}

const UserForm: React.FC<UserFormProps> = ({
  fields,
  values,
  onChange,
  validate = false,
  onValidationChange,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (validate) {
      const newErrors: Record<string, string> = {};
      let valid = true;
      for (const field of fields) {
        const err = validateField(field, values[field.name] ?? '');
        if (err) {
          newErrors[field.name] = err;
          valid = false;
        }
      }
      setErrors(newErrors);
      setTouched(fields.reduce((acc, f) => ({ ...acc, [f.name]: true }), {}));
      onValidationChange?.(valid);
    }
  }, [validate, fields, values, onValidationChange]);

  const handleChange = useCallback(
    (fieldName: string, value: string) => {
      onChange({ ...values, [fieldName]: value });

      if (touched[fieldName]) {
        const field = fields.find((f) => f.name === fieldName);
        if (field) {
          const err = validateField(field, value);
          setErrors((prev) => ({ ...prev, [fieldName]: err }));
        }
      }
    },
    [values, onChange, touched, fields],
  );

  const handleBlur = useCallback(
    (fieldName: string) => {
      setTouched((prev) => ({ ...prev, [fieldName]: true }));
      const field = fields.find((f) => f.name === fieldName);
      if (field) {
        const err = validateField(field, values[fieldName] ?? '');
        setErrors((prev) => ({ ...prev, [fieldName]: err }));
      }
    },
    [fields, values],
  );

  return (
    <Grid container spacing={2}>
      {fields.map((field) => (
        <Grid size={{ xs: 12, sm: field.gridSize ?? 12 }} key={field.name}>
          {field.type === 'select' ? (
            <TextField
              select
              fullWidth
              label={field.label}
              value={values[field.name] ?? ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              onBlur={() => handleBlur(field.name)}
              error={touched[field.name] === true && Boolean(errors[field.name])}
              helperText={touched[field.name] === true ? errors[field.name] : ''}
              required={field.validation.required}
              size="small"
            >
              <MenuItem value="">
                <em>Select…</em>
              </MenuItem>
              {field.options?.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
          ) : field.type === 'textarea' ? (
            <TextField
              fullWidth
              multiline
              minRows={3}
              label={field.label}
              placeholder={field.placeholder}
              value={values[field.name] ?? ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              onBlur={() => handleBlur(field.name)}
              error={touched[field.name] === true && Boolean(errors[field.name])}
              helperText={touched[field.name] === true ? errors[field.name] : ''}
              required={field.validation.required}
              size="small"
            />
          ) : (
            <TextField
              fullWidth
              type={field.type}
              label={field.label}
              placeholder={field.placeholder}
              value={values[field.name] ?? ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              onBlur={() => handleBlur(field.name)}
              error={touched[field.name] === true && Boolean(errors[field.name])}
              helperText={touched[field.name] === true ? errors[field.name] : ''}
              required={field.validation.required}
              slotProps={{
                inputLabel: field.type === 'date' ? { shrink: true } : undefined,
              }}
              size="small"
            />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default UserForm;
