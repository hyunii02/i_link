import React from "react";
import { useState, useEffect } from "react";
import { getToday, getCurrentTime, getDayOfWeek } from "../../../commonFuction";
import { KioskTitle } from "../../Common";

const Clock = () => {
  const [time, setTime] = useState(getCurrentTime());
  const [today, setToday] = useState(getToday());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(getCurrentTime());
      setToday(getToday() + getDayOfWeek());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div>
      <KioskTitle title={today} />
      <div
        style={{
          fontFamily: "NanumJangMiCe",
          fontSize: "12vh",
          paddingLeft: "1vh",
          verticalAlign: "top",
        }}
      >
        {time}
      </div>
    </div>
  );
};

export default Clock;
