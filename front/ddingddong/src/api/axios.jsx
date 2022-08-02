import axios from 'axios';

const SERVER_URL = 'http://i7e102.p.ssafy.io:8000';

// GET 방식으로 Server API에 요청해서 데이터를 받아들임.
// param[0] : 위 SERVER_URL 이후의 주소를 입력
const getApiData = async (url) => {
  const er = SERVER_URL + '/user/1';
  console.log(er);
  const response = await axios.get(er);
  console.log('response:', response);
  return response.data;
};

// POST 방식으로 Server API에 데이터를 body에 전송
// param[0] :
// param[1] :
const postApiData = async (url) => {
  const fullUrl = SERVER_URL + '/user/register';
  const user = {
    user_type: 1,
    user_email: 'abcde@naver.com',
    user_pw: '1q2w3e4r',
    user_name: '김감김감김',
    user_phone: '',
    user_profile_url: '',
    class_no: '',
    preschool_no: '',
  };

  const response = await axios.post(fullUrl, user);
  console.log(response);
};

export { getApiData, postApiData };
