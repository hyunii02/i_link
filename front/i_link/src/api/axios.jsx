// 2022.08.02 강민재 함수 수정
import axios from "axios";

const baseURL = "http://i7e102.p.ssafy.io:8000";

// GET 방식으로 Server API에 요청해서 데이터를 받아들임.
// param[0] : 위 SERVER_URL 이후의 주소를 입력
const getApiData = async (url, path_params) => {
  const URL = baseURL + url + path_params;
  const response = await axios.get(URL);
  console.log("response:", response);
  return response.data;
};

// POST 방식으로 Server API에 데이터를 body에 전송
// param[0] :
// param[1] :
const postApiData = async (url, path_params, body) => {
  const URL = baseURL + url + path_params;

  const response = await axios.post(URL, body);
  console.log("response:", response);
  return response.data;
};

export { getApiData, postApiData };
