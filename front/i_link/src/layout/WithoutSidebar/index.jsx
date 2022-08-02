import * as React from 'react';
import { Box, Container, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from '../Header';
import { Outlet } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const LayoutWithoutSidebar = (props) => {
  return (
    <Box style={{ background: 'rgba(0, 0, 0, 0.05)' }}>
      <Header></Header>
      <Container maxwidth="fluid" style={{ marginTop: 10 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box
              style={{
                border: '1px solid rgba(0, 0, 0, 0.3)',
                width: '100%',
                height: 800,
              }}
            >
              <Outlet />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LayoutWithoutSidebar;
