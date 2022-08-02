import { createContext, useState } from 'react';

const UserContext = createContext(null);

const UserProvider = ({children}) => {
  const [userName, setUserName] = useState('김싸피');
  const [userType, setUserType] = useState('원장');

  const value = {
    state: { userName, userType },
    actions: { setUserName, setUserType },
  }
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider };
