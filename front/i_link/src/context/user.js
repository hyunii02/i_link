// created by 강민재 20220802
import { createContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

const UserProvider = ({children}) => {
  // 세션에 저장된 데이터가 있다면 가져옴 
  const [userName, setUserName] = useState(()=>sessionStorage.getItem('userName'))

  const [userType, setUserType] = useState(()=>sessionStorage.getItem('userType'))

  // 값이 변경되면 세션에 적용
  useEffect(()=>{
    sessionStorage.setItem('userName',userName)
  },[userName])

  useEffect(()=>{
    sessionStorage.setItem('userType',userType)
  },[userType])

  const value = {
  userName, userType, setUserName, setUserType
  }
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider, UserContext };
