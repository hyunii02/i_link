// created by 강민재 20220802
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  // 세션에 저장된 데이터가 있다면 가져옴 
  const [userName, setUserName] = useState(() => sessionStorage.getItem('userName'))
  const [userType, setUserType] = useState(() => sessionStorage.getItem('userType'))
  const [userNo, setUserNo] = useState(() => sessionStorage.getItem('userNo'))
  const [userPhone, setUserPhone] = useState(() => sessionStorage.getItem('userPhone'))
  const [userGroup, setUserGroup] = useState(() => sessionStorage.getItem('userGroup'))
  const [userCenter, setUserCenter] = useState(() => sessionStorage.getItem('userCenter'))
  const [accessToken, setAccessToken] = useState(() => sessionStorage.getItem('accessToken'))
  const [refreshToken, setRefreshToken] = useState(() => sessionStorage.getItem('refreshToken'))
  // 부모 로그인 시, 부모의 아이들 리스트를 배열객체 형식으로 저장
  const [kidsList, setKidsList] = useState(() => JSON.parse(sessionStorage.getItem('kidsList')))
  // 부모 로그인 시, 부모의 아이들 리스트 중 대표 아이 상태 저장
  const [firstKid, setFirstKid] = useState(() => JSON.parse(sessionStorage.getItem('firstKid')))
  // 개인 이미지 url 주소
  const [userProfileUrl, setUserProfileUrl] = useState(() => sessionStorage.getItem('userProfileUrl'))

  const navigate = useNavigate();

  // 값이 변경되면 세션에 적용
  useEffect(() => {
    sessionStorage.setItem('userName', userName)
  }, [userName])

  useEffect(() => {
    sessionStorage.setItem('userType', userType)
  }, [userType])

  useEffect(() => {
    sessionStorage.setItem('userNo', userNo)
  }, [userNo])

  useEffect(() => {
    sessionStorage.setItem('userPhone', userPhone)
  }, [userPhone])

  useEffect(() => {
    sessionStorage.setItem('userGroup', userGroup)
  }, [userGroup])

  useEffect(() => {
    sessionStorage.setItem('userCenter', userCenter)
  }, [userCenter])

  useEffect(() => {
    sessionStorage.setItem('accessToken', accessToken)
  }, [accessToken])

  useEffect(() => {
    sessionStorage.setItem('refreshToken', refreshToken)
  }, [refreshToken])

  useEffect(() => {
    sessionStorage.setItem('kidsList', JSON.stringify(kidsList))
  }, [kidsList])

  useEffect(() => {
    sessionStorage.setItem('firstKid', JSON.stringify(firstKid))
  }, [firstKid])

  useEffect(() => {
    sessionStorage.setItem('userProfileUrl', userProfileUrl);
  }, [userProfileUrl])

  const value = {
    userNo,
    userName,
    userType,
    userPhone,
    userGroup,
    userCenter,
    accessToken,
    refreshToken,
    kidsList,
    firstKid,
    userProfileUrl,
    setUserNo,
    setUserName,
    setUserType,
    setUserPhone,
    setUserGroup,
    setUserCenter,
    setAccessToken,
    setRefreshToken,
    setKidsList,
    setFirstKid,
    setUserProfileUrl,
  }
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider, UserContext };
