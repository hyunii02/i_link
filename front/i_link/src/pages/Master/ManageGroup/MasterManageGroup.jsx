// 원장>반관리 Page
import GroupManagement from "../../../components/Group/GroupManagement";
import RegistKids from "../../../components/Kids/RegistKids";
import { Box } from "@mui/material";
import { useState, useEffect, React, useContext } from "react";
import axios from "axios";
import { baseURL } from "../../../api/axios";
import { UserContext } from "../../../context/user";

const MasterManageGroup = () => {
  const [server, setServer] = useState([]);
  const [classData, setClassData] = useState([]);
  const [classList, setClassList] = useState([]);

  const { userType } = useContext(UserContext);

  // 유치원의 그룹 리스트를 가져오는 axios
  const getGroupList = () => {
    try {
      axios
        .get(baseURL + "/groups/list/" + userType)
        .then((response) => setClassData(response.data));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getGroupList();
  }, []);

  useEffect(() => {
    const newArray = [];
    classData.map((data) => {
      const newObj = {
        id: data.group_no,
        group_name: data.group_name,
      };
      newArray.push(newObj);
    });
    setClassList(newArray);
  }, [classData]);

  return (
    <Box>
      <GroupManagement
        getGroupList={getGroupList}
        classData={classData}
        setClassData={setClassData}
      />
      <Box style={{ width: "100%", marginTop: "10px", marginBottom: "10px" }} />
      <RegistKids classList={classList} getGroupList={getGroupList} />
    </Box>
  );
};

export default MasterManageGroup;
