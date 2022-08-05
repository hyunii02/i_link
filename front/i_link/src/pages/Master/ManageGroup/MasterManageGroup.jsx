// 원장>반관리 Page
import GroupManagement from "../../../components/Group/GroupManagement";
import RegistKids from "../../../components/Kids/RegistKids";
import { Box } from "@mui/material";
import { useState, useEffect, React } from "react";

const MasterManageGroup = () => {
  const [server, setServer] = useState([]);

  return (
    <Box>
      <GroupManagement />
      <Box style={{ width: "100%", marginTop: "10px", marginBottom: "10px" }} />
      <RegistKids />
    </Box>
  );
};

export default MasterManageGroup;
