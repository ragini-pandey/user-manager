import React, { useState, useCallback, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from '@mui/material';
import UserForm from './UserForm';
import type { User, FieldConfig } from '../types/user';
import { getDefaultFormValues } from '../config/formConfig';

interface UserDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Record<string, string>) => Promise<void>;
  fields: FieldConfig[];
  user?: User | null;
  loading?: boolean;
}

const UserDialog: React.FC<UserDialogProps> = ({
  open,
  onClose,
  onSubmit,
  fields,
  user,
  loading = false,
}) => {
  const isEdit = Boolean(user);
  const buildInitialValues = useCallback((): Record<string, string> => {
    if (user) {
      return fields.reduce(
        (acc, f) => {
          acc[f.name] = String(user[f.name] ?? '');
          return acc;
        },
        {} as Record<string, string>,
      );
    }
    return getDefaultFormValues();
  }, [user, fields]);
  const [formValues, setFormValues] = useState<Record<string, string>>(buildInitialValues);
  const [triggerValidation, setTriggerValidation] = useState(false);
  const isValidRef = useRef(false);
  React.useEffect(() => {
    if (open) {
      setFormValues(buildInitialValues());
      setTriggerValidation(false);
      isValidRef.current = false;
    }
  }, [open, buildInitialValues]);
  const handleValidationChange = useCallback((valid: boolean) => {
    isValidRef.current = valid;
  }, []);
  const handleSubmit = async () => {
    setTriggerValidation(true);
    await new Promise((r) => setTimeout(r, 0));
    if (!isValidRef.current) {
      setTriggerValidation(false);
      return;
    }

    try {
      await onSubmit(formValues);
      onClose();
    } catch {
    } finally {
      setTriggerValidation(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? 'Edit User' : 'Add New User'}</DialogTitle>
      <DialogContent dividers sx={{ pt: 2 }}>
        <UserForm
          fields={fields}
          values={formValues}
          onChange={setFormValues}
          validate={triggerValidation}
          onValidationChange={handleValidationChange}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} disabled={loading} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={18} color="inherit" /> : undefined}
        >
          {isEdit ? 'Save Changes' : 'Create User'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDialog;
