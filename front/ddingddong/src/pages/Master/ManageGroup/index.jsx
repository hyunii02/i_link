import LayOut from '../../../layout/';
import GroupManagement from '../../../components/Group/GroupManagement/';
import { Box, Grid } from '@mui/material';

const ManageGroup = () => {
  return (
    <LayOut>
      <Box style={{ borderRadius: '20px', background: 'white' }}>
        <GroupManagement></GroupManagement>
      </Box>
    </LayOut>
  );
};

export default ManageGroup;
