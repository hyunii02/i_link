import * as React from 'react';
import { Box, Container, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from './header/';
import SideBar from './sidebar/';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const wer = () => {
  return <h1>EWF</h1>;
};

const bol = false;
const a = 3;

const LayOut = (props) => {
  const { children } = props;
  return (
    <Box>
      <Header></Header>
      <Container maxwidth="fluid" style={{ marginTop: 10 }}>
        <Grid container spacing={1}>
          <Grid item xs={a}>
            <SideBar />
          </Grid>
          <Grid item xs={9}>
            <Box
              style={{
                border: '1px solid rgba(0, 0, 0, 0.3)',
                width: '100%',
                height: 800,
              }}
            >
              {children}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LayOut;
