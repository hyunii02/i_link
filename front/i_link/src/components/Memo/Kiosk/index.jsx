import React from "react";
import { getToday } from "../../../commonFuction";
import { axios, urls } from "../../../api/axios";
import { useEffect, useState } from "react";

const MemoKiosk = () => {
  const [memo, setMemo] = useState(null);
  useEffect(() => {
    getMomos("1", getToday());
  }, []);

  const getMomos = async (groupNo, today) => {
    try {
      const response = await axios.get(urls.fetchMemosList + groupNo);
      const todaysMemos = response.data.filter(
        (memo) => memo.memo_date === today
      );
      setMemo(todaysMemos);
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
        <div>오늘은 준비물이 없어요!</div>
        <div>{memo}</div>
      </div>
    </div>
  );
};

export default MemoKiosk;
