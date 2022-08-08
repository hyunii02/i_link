// 2022.08.03 강민재 구조 수정
/// 2022.08.08 강민재 엑시오스 인스턴스 생성
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
  fetchMealsRegister: "/meals/register",
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

const axios = Axios.create({
  baseURL: baseURL,
  headers: { Authorization: "Bearer " + sessionStorage.getItem("accessToken") },
});

export { axios, baseURL, urls };
