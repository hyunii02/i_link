// 2022.08.11 안정현
// 공통으로 쓰일 리스트 모양(알림장, 식단, 간식)
const TodayList = ({items}) =>{
  return (
    <ul style={{
      marginTop: "1vh",
      marginLeft: "1vh",
    }}>
      {items &&
        items.split(",").map((item) => (
          <li key={item} id="font_test">
            {item}
          </li>
        ))}
    </ul>
  )
}

export default TodayList