// created by 강민재 20220802
import { createContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

const UserProvider = ({children}) => {
  // 세션에 저장된 데이터가 있다면 가져옴 
  const [userName, setUserName] = useState(()=>sessionStorage.getItem('userName'))
  const [userType, setUserType] = useState(()=>sessionStorage.getItem('userType'))
  const [userNo, setUserNo] = useState(()=>sessionStorage.getItem('userNo'))
  const [userPhone, setUserPhone] = useState(()=>sessionStorage.getItem('userPhone'))
  const [userGroup, setUserGroup] = useState(()=>sessionStorage.getItem('userGroup'))
  const [userCenter, setUserCenter] = useState(()=>sessionStorage.getItem('userCenter'))
  const [accessToken, setAccessToken] = useState(()=>sessionStorage.getItem('accessToken'))
  const [refreshToken, setRefreshToken] = useState(()=>sessionStorage.getItem('refreshToken'))

  // 값이 변경되면 세션에 적용
  useEffect(()=>{
    sessionStorage.setItem('userName',userName)
  },[userName])

  useEffect(()=>{
    sessionStorage.setItem('userType',userType)
  },[userType])
  
  useEffect(()=>{
    sessionStorage.setItem('userNo',userNo)
  },[userNo])

  useEffect(()=>{
    sessionStorage.setItem('userPhone',userPhone)
  },[userPhone])

  useEffect(()=>{
    sessionStorage.setItem('userGroup',userGroup)
  },[userGroup])

  useEffect(()=>{
    sessionStorage.setItem('userCenter',userCenter)
  },[userCenter])

  useEffect(()=>{
    sessionStorage.setItem('accessToken',accessToken)
  },[accessToken])

  useEffect(()=>{
    sessionStorage.setItem('refreshToken',refreshToken)
  },[refreshToken])

  const value = {
  userNo,
  userName,
  userType,
  userPhone,
  userGroup,
  userCenter,
  accessToken,
  refreshToken,
  setUserNo,
  setUserName,
  setUserType,
  setUserPhone,
  setUserGroup,
  setUserCenter,
  setAccessToken,
  setRefreshToken,
  }
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider, UserContext };
