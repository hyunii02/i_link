// 원장>반관리 Page
import GroupManagement from "../../../components/Group/GroupManagement";
import RegistKids from "../../../components/Kids/RegistKids";
import { Box } from "@mui/material";
import { useState, useEffect, React, useContext } from "react";
import axios from "axios";
import { baseURL, urls } from "../../../api/axios";
import { UserContext } from "../../../context/user";

const MasterManageGroup = () => {
  const [server, setServer] = useState([]);
  const [classData, setClassData] = useState([]);
  const [classList, setClassList] = useState([]);

  // 서버로부터 응답된 가입승인 명단 관리
  const [listItem, setListItem] = useState([]);
  // 가입승인을 위한 객체
  const [submitList, setSubmitList] = useState([]);
  // 원아/선생님 선택 버튼 상태 관리용
  const [selectedItem, setSelectedItem] = useState("1");

  const { userType, userCenter } = useContext(UserContext);

  // 유치원의 그룹 리스트를 가져오는 axios
  const getGroupList = () => {
    try {
      axios
        .get(baseURL + urls.fetchGroupsList + userCenter)
        .then((response) => setClassData(response.data));
    } catch (e) {
      console.log(e);
    }
  };

  // 반 삭제 시, 가입 승인 리스트 재 렌더링을 위한 함수
  const getsubmitList = () => {
    if (selectedItem === "1") {
      getKidsList();
    } else if (selectedItem === "2") {
      getTeacherList();
    }
  };

  // 원생 가입 승인 대기 목록 가져오는 axios
  const getKidsList = () => {
    axios
      .get(baseURL + urls.fetchSubmitWaitKids + userType)
      .then((response) => {
        // 받은 데이터를 화면에서 쓰기 위해 새롭게 포매팅
        const newArray = [];
        const newSubmitArray = [];
        response.data.map((data) => {
          // 가입승인요청 목록 표시용 상태관리
          const newObj = {
            no: data.kid_no,
            name: data.kid_name,
            profile_url: data.kid_profile_url,
          };
          newArray.push(newObj);

          // 가입승인용 상태관리
          const newSubmitObj = {
            kidNo: data.kid_no,
            groupNo: null,
          };
          newSubmitArray.push(newSubmitObj);
        });

        setListItem(newArray);
        setSubmitList(newSubmitArray);
      });
  };

  // 선생 가입 승인 대기 목록 가져오는 axios
  const getTeacherList = () => {
    axios
      .get(baseURL + urls.fetchSubmitWaitTeacher + userType)
      .then((response) => {
        // 받은 데이터를 화면에서 쓰기 위해 새롭게 포매팅
        const newArray = [];
        const newSubmitArray = [];
        response.data.map((data) => {
          // 가입승인요청 목록 표시용 상태관리
          const newObj = {
            no: data.user_no,
            name: data.user_name,
            profile_url: data.user_profile_url,
          };
          newArray.push(newObj);

          // 가입승인용 상태관리
          const newSubmitObj = {
            userNo: data.user_no,
            groupNo: null,
          };
          newSubmitArray.push(newSubmitObj);
        });

        setListItem(newArray);
        setSubmitList(newSubmitArray);
      });
  };

  useEffect(() => {
    getGroupList();
    getKidsList();
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
        getsubmitList={getsubmitList}
      />
      <Box style={{ width: "100%", marginTop: "10px", marginBottom: "10px" }} />
      <RegistKids
        classList={classList}
        getGroupList={getGroupList}
        listItem={listItem}
        setListItem={setListItem}
        submitList={submitList}
        setSubmitList={setSubmitList}
        getKidsList={getKidsList}
        getTeacherList={getTeacherList}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    </Box>
  );
};

export default MasterManageGroup;
