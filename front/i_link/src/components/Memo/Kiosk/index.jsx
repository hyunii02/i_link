import React from "react";
import { getToday } from "../../../commonFuction";
import { axios, urls } from "../../../api/axios";
import { useEffect, useState } from "react";
import { ItemsList, KioskTitle } from "../../Common";

const MemoKiosk = () => {
  const [memo, setMemo] = useState(null);
  useEffect(() => {
    const surveyDay = localStorage.getItem(
      localStorage.getItem("kidName") + "SurveyDay"
    );
    if (surveyDay === getToday()) {
      getMomos(localStorage.getItem("userGroup"), getToday(true));
    } else {
      getMomos(localStorage.getItem("userGroup"), getToday());
    }
  }, []);

  const styles = {
    fontFamily: "NanumGimYuICe",
    fontSize: "4vh",
  };

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
      <KioskTitle
        title="알림장
      "
      />
      <div style={styles}>
        {!memo && <div>오늘은 준비물이 없어요!</div>}
        <ItemsList items={memo} />
      </div>
    </div>
  );
};

export default MemoKiosk;
