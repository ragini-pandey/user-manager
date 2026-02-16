import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'grey.50' }}>
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <PeopleAltIcon sx={{ mr: 1.5 }} />
        <Typography variant="h6" component="h1" fontWeight={600}>
          User Management
        </Typography>
      </Toolbar>
    </AppBar>

    <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
      {children}
    </Container>

    <Box
      component="footer"
      sx={{ textAlign: 'center', py: 2, color: 'text.secondary', fontSize: 13 }}
    >
      © {new Date().getFullYear()} User Management App — Built with React &amp; Material-UI
    </Box>
  </Box>
);
