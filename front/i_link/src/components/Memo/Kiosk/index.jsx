import React from "react";
import { getToday } from "../../../commonFuction";
import { axios, urls } from "../../../api/axios";
import { useEffect, useState } from "react";

const MemoKiosk = () => {
  const [memo, setMemo] = useState(null);
  useEffect(() => {
    getMomos(localStorage.getItem("userGroup"), getToday());
  }, []);

  const getMomos = async (groupNo, today) => {
    try {
      const response = await axios.get(urls.fetchMemosList + groupNo);
      const todaysMemos = response.data.filter(
        (memos) => memos.memo_date === today
      );
      setMemo(todaysMemos[0].memo_content);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div
        style={{
          fontFamily: "NanumJangMiCe",
          fontSize: "5vh",
        }}
      >
        알림장
      </div>
      <div
        style={{
          fontFamily: "NanumGimYuICe",
          fontSize: "4vh",
        }}
      >
        {!memo && <div>오늘은 준비물이 없어요!</div>}
        <ul
          style={{
            listStyle: "none",
            fontFamily: "NanumGimYuICe",
            fontSize: "4vh",
            marginTop: "1vh",
            marginLeft: "1vh",
            paddingLeft: "0",
          }}
        >
          {memo &&
            memo.split(",").map((thing) => (
              <li
                key={thing}
                style={{ marginLeft: "0px", marginBottom: "1vh" }}
              >
                {thing}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default MemoKiosk;
