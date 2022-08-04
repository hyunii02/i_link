// 원장>반관리 Page
import GroupManagement from "../../../components/Group/GroupManagement";
import RegistKids from "../../../components/Kids/RegistKids";
import { Box } from "@mui/material";
import { getApiData, postApiData } from "../../../api/axios";
import { useState, useEffect, React } from "react";

const MasterManageGroup = () => {
  const [server, setServer] = useState([]);

  // useEffect 함수 내에서 async await 동작하는 함수 생성 후, 바로 호출
  /*
  useEffect(() => {
    const getApi = async () => {
      const data = await postApiData("");
      setServer((server) => data);
      console.log("데이터:", server);
    };
    getApi("");
  }, []);
*/
  return (
    <Box>
      <GroupManagement />
      <Box style={{ width: "100%", marginTop: "10px", marginBottom: "10px" }} />
      <RegistKids />
    </Box>
  );
};

export default MasterManageGroup;
