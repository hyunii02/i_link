// 2022.08.11 안정현
// 공통으로 쓰일 리스트 모양(공지사항, 알림장, 식단, 간식)
const TodayList = ({items}) =>{
  return (
    <ul>
      {items &&
        items.split(",").map((item) => (
          <li key={item} style={{ marginLeft: "0px", mt:1 }} id="font_test">
            {item}
          </li>
        ))}
    </ul>
  )
}

export default TodayList