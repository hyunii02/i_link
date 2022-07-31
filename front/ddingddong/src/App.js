
import LayOut from './layout/';
import { Routes, Route } from 'react-router-dom'

import './App.css';
import UserLogin from './pages/User/Login/UserLogin';
import UserSignUp from './pages/User/SignUp/UserSignUp';
import UserUpdate from './pages/User/Update/UserUpdate';
import KioskAward from './pages/Kiosk/Award/KioskAward';
import KioskMain from './pages/Kiosk/Main/KioskMain';
import KioskQuiz from './pages/Kiosk/Quiz/KioskQuiz';
import KioskVote from './pages/Kiosk/Vote/KioskVote';
import MasterDiet from './pages/Master/Diet/MasterDiet';
import MasterManageGroup from './pages/Master/ManageGroup/MasterManageGroup';
import MasterManageMember from './pages/Master/ManageMember/MasterManageMember';
import MasterMemo from './pages/Master/Memo/MasterMemo';
import MasterNotice from './pages/Master/Notice/MasterNotice';
import MasterRegistAcademy from './pages/Master/RegistAcademy/MasterRegistAcademy';
import ParentsDiet from './pages/Parents/Diet/ParentsDiet';
import ParentsHome from './pages/Parents/Home/ParentsHome';
import ParentsNotice from './pages/Parents/Notice/ParentsNotice';
import ParentsQuiz from './pages/Parents/Quiz/ParentsQuiz';
import ParentsRegistKid from './pages/Parents/RegistKid/ParentsRegistKid';
import TeacherDiet from './pages/Teacher/Diet/TeacherDiet';
import TeacherManagement from './pages/Teacher/Management/TeacherManagement';
import TeacherDetail from './pages/Teacher/Detail/TeacherDetail';
import TeacherMemo from './pages/Teacher/Memo/TeacherMemo';
import TeacherNotice from './pages/Teacher/Notice/TeacherNotice';
import TeacherQuiz from './pages/Teacher/Quiz/TeacherQuiz';
import Error from './pages/Error/Error'
import LayoutWithoutSidebar from './layout/WithoutSidebar';
import { useState } from 'react';
import { ColorProvider } from './context/color';


const App = () => {
  const [color, setColor] = useState('blue');

  return (
    <ColorProvider>
      <Routes>
        <Route element={<LayoutWithoutSidebar />} >
          <Route path='/' element={<UserLogin />} />
          <Route path='/user/signup' element={<UserSignUp />} />
          <Route path='/user/update' element={<UserUpdate />} />
        </Route>

        <Route element={<LayOut />}>

          <Route path='/master/diet' element={<MasterDiet />} />
          <Route path='/master/managegroup' element={<MasterManageGroup />} />
          <Route path='/master/managemember' element={<MasterManageMember />} />
          <Route path='/master/memo' element={<MasterMemo />} />
          <Route path='/master/notice' element={<MasterNotice />} />
          <Route path='/master/registacademy' element={<MasterRegistAcademy />} />


          <Route path='/parents/diet' element={<ParentsDiet />} />
          <Route path='/parents/home' element={<ParentsHome />} />
          <Route path='/parents/notice' element={<ParentsNotice />} />
          <Route path='/parents/quiz' element={<ParentsQuiz />} />
          <Route path='/parents/registkid' element={<ParentsRegistKid />} />


          <Route path='/teacher/detail' element={<TeacherDetail />} />
          <Route path='/teacher/diet' element={<TeacherDiet />} />
          <Route path='/teacher/management' element={<TeacherManagement />} />
          <Route path='/teacher/memo' element={<TeacherMemo />} />
          <Route path='/teacher/notice' element={<TeacherNotice />} />
          <Route path='/teacher/quiz' element={<TeacherQuiz />} />
        </Route>

        <Route path='*' element={<Error />} />
        <Route path='/kiosk/award' element={<KioskAward />} />
        <Route path='/kiosk/main' element={<KioskMain />} />
        <Route path='/kiosk/quiz' element={<KioskQuiz />} />
        <Route path='/kiosk/vote' element={<KioskVote />} />

      </Routes>
    </ColorProvider>
  );
};

export default App;