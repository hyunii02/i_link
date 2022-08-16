// 2022.08.03 강민재 구조 수정
// 2022.08.08 강민재 엑시오스 인스턴스 생성
// 2022.08.16 강민재 인터럽트 추가
import Axios from "axios"; // 인스턴스와 구분하기 위해 대문자 사용
import { useNavigate } from "react-router-dom";

const baseURL = "https://i7e102.p.ssafy.io:8000";

const urls = {
  fetchLogin: "/users/login",
  fetchLogout: "/users/logout",
  fetchUsersRegister: "/users/register",
  fetchUsersDetail: "/users/",
  fetchUsersUpdate: "/users/",
  fetchUsersDelete: "/users/",
  fetchCentersRegister: "/centers/register",
  fetchCentersDetial: "/centers/",
  fetchCentersUpdate: "/centers/",
  fetchCentersDelete: "/centers/",
  fetchGroupsList: "/groups/list/",
  fetchGroupsRegister: "/groups/register",
  fetchGroupsDetail: "/groups/",
  fetchGroupsUpdate: "/groups/",
  fetchGroupsDelete: "/groups/",
  fetchTeachersList: "/users/list/",
  fetchKidsRegister: "/kids/register",
  fetchKidsDetail: "/kids/",
  fetchKidsUpdate: "/kids/",
  fetchKidsDelete: "/kids/",
  fetchKids: "/kids/list/",
  fetchParentKids: "/kids/list/parent/",
  fetchNotices: "/notices/list/",
  fetchNoticsRegister: "/notices/register",
  fetchNoticesDetail: "/notices/",
  fetchNoticesUpdate: "/notices/",
  fetchNoticesDelete: "/notices/",
  fetchGroupsReport: "/reports/list/",
  fetchKidsReport: "/reports/list/",
  fetchReportsRegister: "/reports/register", //안정현 수정
  fetchReportsDetail: "/reports/",
  fetchReportsUpdate: "/reports/",
  fetchReportsDelete: "/reports/",
  fetchMealsList: "/meals/list/",
  fetchMealsRegister: "/meals/register",
  fetchMealsDetail: "/meals/",
  fetchTodaysMeals: "/meals/",
  fetchMealsUpdate: "/meals/",
  fetchMealsDelete: "/meals/",
  fetchMemosList: "/memos/list/",
  fetchMemosRegister: "/memos/register",
  fetchMemosDetail: "/memos/",
  fetchMemosUpdate: "/memos/",
  fetchMemosDelete: "/memos/",
  fetchTodaysMemos: "/memos/",
  fetchSurveysList: "/surveys/list/",
  fetchSurveysRegister: "/surveys/register",
  fetchSurveysDetail: "/surveys/",
  fetchStamps: "/stamp/",
  fetchTodaysWeathers: "/weathers/",
  fetchQuizsList: "/quiz/list/",
  // 2022-08-09 김국진 추가
  fetchSubmitWaitTeacher: "/members/manage/teacher/", // 가입 승인 대기 교사 목록
  fetchSubmitWaitKids: "/members/manage/kids/", // 가입 승인 대기 원아 목록
  fetchSubmitTeacher: "/members/manage/teacher/", // 가입 등록 승인 교사
  fetchSubmitKids: "/members/manage/kids/", // 가입 등록 승인 원아
  fetchMemberTeacherList: "/members/teacher/", // 유치원 반별 교사 목록 조회
  fetchMemberKidsList: "/members/kids/", // 유치원 반별 원아 목록 조회
  fetchKidsStateChange: "/kids/attendance/",
  fetchTeacherCenterSet: "/users/center/modify", // 선생님용 유치원 정보 수정
  featchQuizRegister: "/quiz/register", // 퀴즈 등록
  fetchQuizDelete: "/quiz/", // 퀴즈 삭제
  fetchQuizTodaySet: "/quiz/today/", // 퀴즈 오늘 날짜로 지정
  fetchQuizTodayList: "/quiz/today/", // 오늘의 퀴즈 정보 조회
  fetchQuizKidsDetail: "/quiz/kids/", // 아이별 퀴즈 결과 조회
  fetchKidsMemoUpdate: "/kids/memos/", // 아이별 메모 업데이트
  fetchKidsAnswer: "/quiz/kids/register", // 아이 퀴즈 정답 제출
  fetchStampPlus: "/stamps/stamping", // 스탬프 하나 추가
};

const axios = Axios.create({
  baseURL: baseURL,
  headers: { Authorization: "Bearer " + sessionStorage.getItem("accessToken") },
});

/*
    1. 요청 인터셉터를 작성합니다.
    2개의 콜백 함수를 받습니다.

    1) 요청 바로 직전 - 인자값: axios config
    2) 요청 에러 - 인자값: error
*/
axios.interceptors.request.use(
  function (config) {
    // 요청 바로 직전
    // axios 설정값에 대해 작성합니다.
    return config;
  },
  function (error) {
    // 요청 에러 처리를 작성합니다.
    return Promise.reject(error);
  }
);

/*
  2. 응답 인터셉터를 작성합니다.
  2개의 콜백 함수를 받습니다.

  1) 응답 정성 - 인자값: http response
  2) 응답 에러 - 인자값: http error
*/

axios.interceptors.response.use(
  function (response) {
    /*
      http status가 200인 경우
      응답 바로 직전에 대해 작성합니다. 
      .then() 으로 이어집니다.
  */
    return response;
  },

  async (error) => {
    /*
      http status가 200이 아닌 경우
      응답 에러 처리를 작성합니다.
      .catch() 으로 이어집니다.    
  */
    // // 비로그인 상태 처리
    // if (400 === error.response.status) {
    //   console.log("히히");
    //   const navigage = useNavigate();
    //   navigage("/");
    // }

    // // 토큰 만료 시 처리
    // if (
    //   401 === error.response.status &&
    //   sessionStorage.getItem("refreshToken")
    // ) {
    //   try {
    //     const response = await Axios.post(baseURL + "/users/auth/refresh", {
    //       token: sessionStorage.getItem("refreshToken"),
    //       userNo: sessionStorage.getItem("userNo"),
    //     });
    //     const accessToken = response.data.token.access_token;
    //     const refreshToken = response.data.token.refresh_token;
    //     sessionStorage.setItem("accessToken", accessToken);
    //     sessionStorage.setItem("refreshToken", refreshToken);
    //     return Axios(error.config);
    //   } catch (err) {}
    // } else {
    // }
    return Promise.reject(error);
  }
);

export { axios, baseURL, urls };
