// 원장>반관리 Page
import GroupManagement from '../../../components/Group/GroupManagement';
import RegistMember from '../../../components/Member/RegistMember';
import { Box } from '@mui/material';

const MasterManageGroup = () => {
  return (
    <Box style={{ borderRadius: '20px', background: 'white' }}>
      <GroupManagement />
      <Box style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />
      \
    </Box>
  );
};

export default MasterManageGroup;
