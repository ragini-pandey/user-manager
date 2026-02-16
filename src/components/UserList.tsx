import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  Skeleton,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { User, FieldConfig } from '../types/user';

interface UserListProps {
  users: User[];
  fields: FieldConfig[];
  loading: boolean;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, fields, loading, onEdit, onDelete }) => {
  if (loading && users.length === 0) {
    return (
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>#</TableCell>
              {fields.map((f) => (
                <TableCell key={f.name} sx={{ fontWeight: 600 }}>
                  {f.label}
                </TableCell>
              ))}
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton width={20} />
                </TableCell>
                {fields.map((f) => (
                  <TableCell key={f.name}>
                    <Skeleton width="80%" />
                  </TableCell>
                ))}
                <TableCell>
                  <Skeleton width={60} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  if (!loading && users.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          border: '1px dashed',
          borderColor: 'divider',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No users found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Click "Add User" to create your first user.
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'action.hover' }}>
            <TableCell sx={{ fontWeight: 600 }}>#</TableCell>
            {fields.map((f) => (
              <TableCell key={f.name} sx={{ fontWeight: 600 }}>
                {f.label}
              </TableCell>
            ))}
            <TableCell align="right" sx={{ fontWeight: 600 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow
              key={user.id}
              hover
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{index + 1}</TableCell>
              {fields.map((f) => (
                <TableCell key={f.name}>{String(user[f.name] ?? '—')}</TableCell>
              ))}
              <TableCell align="right">
                <Tooltip title="Edit">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => onEdit(user)}
                    aria-label={`Edit ${user.firstName}`}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => onDelete(user)}
                    aria-label={`Delete ${user.firstName}`}
                    sx={{ ml: 0.5 }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
