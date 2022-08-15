import React from 'react';
import LayOut from './layout/';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import UserLogin from './pages/User/Login/UserLogin';
import UserSignUp from './pages/User/SignUp/UserSignUp';
import UserUpdate from './pages/User/Update/UserUpdate';
import KioskMain from './pages/Kiosk/Main/KioskMain';
import KioskQuiz from './pages/Kiosk/Quiz/KioskQuiz';
import KioskSurvey from './pages/Kiosk/Survey';
import KioskStamp from './pages/Kiosk/Stamp/KioskAward';
import KioskLoginPage from './pages/Kiosk/Login';
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
import ParentsRepo from "./pages/Parents/Repo/ParentsRepo";
import TeacherDiet from './pages/Teacher/Diet/TeacherDiet';
import TeacherManagement from './pages/Teacher/Management/TeacherManagement';
import TeacherDetail from './pages/Teacher/Detail/TeacherDetail';
import TeacherMemo from './pages/Teacher/Memo/TeacherMemo';
import TeacherNotice from './pages/Teacher/Notice/TeacherNotice';
import TeacherQuiz from './pages/Teacher/Quiz/TeacherQuiz';
import KioskLayout from './layout/KioskLayout';
import Error from './pages/Error/Error';
import LayoutWithoutHeader from './layout/WithoutHeader';
import { UserProvider } from './context/user';
import TeacherJoinCenter from "./pages/Teacher/JoinCenter/JoinCenter";
import ParentsJoinCenter from './pages/Parents/JoinCenter/JoinCenter';
import PictureBoard from "./pages/Common/PictureBoard";
import TeacherWait from "./pages/Teacher/Wait/TeacherWait";
import KidsDetail from "./pages/Common/KidsDetail";

const App = () => {
  return (
    <UserProvider>
      <Routes>
        {/* 키오스크 */}
        <Route element={<KioskLayout />}>
          <Route path="/kiosk" element={<KioskLoginPage />} />
          <Route path="/kiosk/main" element={<KioskMain />} />
          <Route path="/kiosk/stamp" element={<KioskStamp />} />
          <Route path="/kiosk/quiz" element={<KioskQuiz />} />
          <Route path="/kiosk/survey" element={<KioskSurvey />} />
        </Route>
        {/* 사이드바 없는 화면(로그인, 회원가입, 회원정보수정) */}
        <Route element={<LayoutWithoutHeader />}>
          <Route path="/" element={<UserLogin />} />
          <Route path="/user/signup" element={<UserSignUp />} />
          <Route path="/user/update" element={<UserUpdate />} />
          <Route path="/master/registacademy" element={<MasterRegistAcademy />} />
          <Route path="/teacher/joincenter" element={<TeacherJoinCenter />} />
          <Route path="/teacher/wait" element={<TeacherWait />} />
        </Route>
        {/* 원장님, 학부모, 선생님 */}
        <Route element={<LayOut />}>
          {/* 원장님 */}
          <Route path="/master/diet" element={<MasterDiet />} />
          <Route path="/master/managegroup" element={<MasterManageGroup />} />
          <Route path="/master/managemember" element={<MasterManageMember />} />
          <Route path="/master/memo" element={<MasterMemo />} />
          <Route path="/master/notice" element={<MasterNotice />} />
          <Route path="/master/kidsdetail" element={<KidsDetail />} />

          {/* 학부모 */}
          <Route path="/parents/diet" element={<ParentsDiet />} />
          <Route path="/parents/home" element={<ParentsHome />} />
          <Route path="/parents/notice" element={<ParentsNotice />} />
          <Route path="/parents/quiz" element={<ParentsQuiz />} />
          <Route path="/parents/registkid" element={<ParentsRegistKid />} />
          <Route path="/parents/repo" element={<ParentsRepo />} />
          <Route path="/parents/joincenter" element={<ParentsJoinCenter />} />

          {/* 선생님 */}
          <Route path="/teacher/detail" element={<TeacherDetail />} />
          <Route path="/teacher/diet" element={<TeacherDiet />} />
          <Route path="/teacher/management" element={<TeacherManagement />} />
          <Route path="/teacher/memo" element={<TeacherMemo />} />
          <Route path="/teacher/notice" element={<TeacherNotice />} />
          <Route path="/teacher/quiz" element={<TeacherQuiz />} />
          {/*<Route path="/teacher/joincenter" element={<TeacherJoinCenter />} />*/}
          <Route path="/teacher/kidsdetail" element={<KidsDetail />} />

        </Route>
        {/* 헤더, 사이드바 없는 화면 */}
        <Route path="*" element={<Error />} />
      </Routes>
    </UserProvider>
  );
};

export default App;
