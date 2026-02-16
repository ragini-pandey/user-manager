import React, { useState, useCallback } from 'react';
import { Button, Alert, Snackbar, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Layout } from './components/Layout';
import UserList from './components/UserList';
import UserDialog from './components/UserDialog';
import ConfirmDialog from './components/ConfirmDialog';
import { useUsers } from './hooks/useUser';
import { userFieldsConfig } from './config/formConfig';
import type { User, UserPayload } from './types/user';

const App: React.FC = () => {
  const { users, loading, error, fetchUsers, addUser, editUser, removeUser, clearError } =
    useUsers();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

  const [successMsg, setSuccessMsg] = useState<string | null>(null);


  const handleOpenCreate = useCallback(() => {
    setEditingUser(null);
    setDialogOpen(true);
  }, []);

  const handleOpenEdit = useCallback((user: User) => {
    setEditingUser(user);
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
    setEditingUser(null);
  }, []);

  const handleSubmit = useCallback(
    async (values: Record<string, string>) => {
      const payload = values as unknown as UserPayload;

      if (editingUser) {
        await editUser(editingUser.id, payload);
        setSuccessMsg('User updated successfully!');
      } else {
        await addUser(payload);
        setSuccessMsg('User created successfully!');
      }
    },
    [editingUser, editUser, addUser],
  );

  const handleDeleteRequest = useCallback((user: User) => {
    setDeleteTarget(user);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteTarget) return;
    try {
      await removeUser(deleteTarget.id);
      setSuccessMsg('User deleted successfully!');
    } catch {
    } finally {
      setDeleteTarget(null);
    }
  }, [deleteTarget, removeUser]);

  return (
    <Layout>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            Users ({users.length})
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={fetchUsers}
              disabled={loading}
              size="small"
            >
              Refresh
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenCreate}
              disabled={loading}
            >
              Add User
            </Button>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" onClose={clearError} sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <UserList
          users={users}
          fields={userFieldsConfig}
          loading={loading}
          onEdit={handleOpenEdit}
          onDelete={handleDeleteRequest}
        />

        <UserDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          onSubmit={handleSubmit}
          fields={userFieldsConfig}
          user={editingUser}
          loading={loading}
        />

        <ConfirmDialog
          open={Boolean(deleteTarget)}
          title="Delete User"
          message={
            deleteTarget
              ? `Are you sure you want to delete "${deleteTarget.firstName} ${deleteTarget.lastName}"? This action cannot be undone.`
              : ''
          }
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
          loading={loading}
        />

        <Snackbar
          open={Boolean(successMsg)}
          autoHideDuration={3000}
          onClose={() => setSuccessMsg(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            severity="success"
            variant="filled"
            onClose={() => setSuccessMsg(null)}
            sx={{ width: '100%' }}
          >
            {successMsg}
          </Alert>
        </Snackbar>
      </Layout>
  );
};

export default App;
