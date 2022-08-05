// 2022.08.04 김국진 sidebar 객체 배열 Data 추가

const constants = {

}

// 공통 Color 관리
const colorPalette = {
    BACKGROUND_COLOR: "#FAF8DF",
    BUTTON_COLOR: "#FF8A7B"
}

// 원장님 권한 ID NavBar Data, Path 관리 객체배열
const MASTER = [
    { id: 1, name: "원생관리", path: "/master/managemember", },
    { id: 2, name: "공지사항", path: "/master/notice", },
    { id: 3, name: "알림장", path: "/master/memo", },
    { id: 4, name: "식단관리", path: "/master/diet", },
    { id: 5, name: "활동사진", path: "", },
    { id: 6, name: "반관리", path: "/master/managegroup", }
]

// 선생님 권한 ID NavBar Data, Path 관리 객체배열
const TEACHER = [
    { id: 1, name: "원생관리", path: "/teacher/management", },
    { id: 2, name: "공지사항", path: "/teacher/notice", },
    { id: 3, name: "알림장", path: "/teacher/memo", },
    { id: 4, name: "식단관리", path: "/teacher/diet", },
    { id: 5, name: "퀴즈", path: "/teacher/quiz", },
    { id: 6, name: "활동사진", path: "", }
]

// 부모님 권한 ID NavBar Data, Path 관리 객체배열
const PARENTS = [
    { id: 1, name: "아이보기", path: "/parents/home", },
    { id: 2, name: "공지사항", path: "/parents/notice", },
    { id: 3, name: "특이사항", path: "/parents/repo", },
    { id: 4, name: "식단간식", path: "/parents/diet", },
    { id: 5, name: "키즈퀴즈", path: "/parents/quiz", },
    { id: 6, name: "활동사진", path: "", },
    { id: 7, name: "아이등록", path: "/parents/registkid", }
]

// 사이드바 객체배열
const sidebar = [
    MASTER, TEACHER, PARENTS
];

export { constants, sidebar, colorPalette }