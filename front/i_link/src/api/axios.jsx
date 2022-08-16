// 2022.08.03 강민재 구조 수정
// 2022.08.08 강민재 엑시오스 인스턴스 생성
// 2022.08.16 강민재 인터럽트 추가
import Axios from "axios"; // 인스턴스와 구분하기 위해 대문자 사용

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

    // 무한루프 방지를 위해 같은 에러가 2번 발생하면 재발급 처리 안함
    if (error.response.statusText === sessionStorage.getItem("statusText")) {
      return Promise.reject(error);
    }

    const config = error.response.config;
    if (401 === error.response.status) {
      const { data } = await axios.post("/users/auth/refresh", {
        token: sessionStorage.getItem("refreshToken"),
        userNo: sessionStorage.getItem("userNo"),
      });
      const { access_token, refresh_token } = data.token;
      sessionStorage.setItem("accessToken", access_token);
      sessionStorage.setItem("refreshToken", refresh_token);
      sessionStorage.setItem("statusText", error.response.statusText);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;

      return axios(config);
    }

    return Promise.reject(error);
  }
);

// 키오스크용 axios 인스턴스
const axiosKiosk = Axios.create({
  baseURL: baseURL,
  headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
});

axiosKiosk.interceptors.response.use(
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

    // 무한루프 방지를 위해 같은 에러가 2번 발생하면 재발급 처리 안함
    if (error.response.statusText === localStorage.getItem("statusText")) {
      return Promise.reject(error);
    }

    const config = error.response.config;
    if (401 === error.response.status) {
      const { data } = await axiosKiosk.post("/users/auth/refresh", {
        token: localStorage.getItem("refreshToken"),
        userNo: localStorage.getItem("userNo"),
      });
      const { access_token, refresh_token } = data.token;
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      localStorage.setItem("statusText", error.response.statusText);
      axiosKiosk.defaults.headers.common.Authorization = `Bearer ${access_token}`;

      return axiosKiosk(config);
    }

    return Promise.reject(error);
  }
);

export { axios, axiosKiosk, baseURL, urls };
