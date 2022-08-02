// created by 강민재 20220802
import { createContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

const UserProvider = ({children}) => {
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // 로그인시 isLogin을 변경하고 여기에서 세션 스토리지 작업 진행
  }, [isLogin])


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
