// 2022.08.02 강민재 함수 수정
import axios from "axios";

const baseURL = "http://i7e102.p.ssafy.io:8000";

// GET 방식으로 Server API에 요청해서 데이터를 받아들임.
// param[0] : 위 SERVER_URL 이후의 주소를 입력
const getApiData = async (url, path_params) => {
  const URL = baseURL + url;
  if (path_params) {
    URL += path_params;
  }
  const response = await axios.get(URL);
  console.log("response:", response);
  return response.data;
};

// POST 방식으로 Server API에 데이터를 body에 전송
// param[0] :
// param[1] :
const postApiData = async (url, path_params, body) => {
  const URL = baseURL + url;
  if (path_params) {
    URL += path_params;
  }

  const response = await axios.post(URL, body);
  console.log("response:", response);
  return response.data;
};

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
  fetchNotices: "/notices/list/",
  fetchNoticsRegister: "/notices/register",
  fetchNoticesDetail: "/notices/",
  fetchNoticesUpdate: "/notices/",
  fetchNoticesDelete: "/notices/",
  fetchGroupsReport: "/reports/list/",
  fetchKidsReport: "/reports/list/",
  fetchReportsRegister: "/reports",
  fetchReportsDetail: "/reports/",
  fetchReportsUpdate: "/reports/",
  fetchReportsDelete: "/reports/",
  fetchMealsList: "/meals/list/",
  fetchMealsRegister: "/meals",
  fetchMealsDetail: "/meals/",
  fetchTodaysMeals: "/meals/",
  fetchMealsUpdate: "/meals/",
  fetchMealsDelete: "/meals/",
  fetchMemosList: "/memos/list/",
  fetchMemosRegister: "/memos",
  fetchMemosDetail: "/memos/",
  fetchMemosUpdate: "/memos/",
  fetchMemosDelete: "/memos/",
  fetchTodaysMemos: "/memos/",
  fetchSurveysList: "/surveys/list/",
  fetchSurveysRegister: "/surveys",
  fetchSurveysDetail: "/surveys/",
  fetchStamps: "/stamp/",
  fetchTodaysWeathers: "/weathers/",
  fetchQuizsList: "/quizs/list/",
};

export { getApiData, postApiData, urls };
