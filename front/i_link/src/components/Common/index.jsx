import React from "react";

const ItemsList = ({ items }) => {
  return (
    <ul
      style={{
        listStyle: "none",
        fontFamily: "NanumGimYuICe",
        fontSize: "6vh",
        marginTop: "1vh",
        marginLeft: "1vh",
        paddingLeft: "0",
        color: "white",
      }}
    >
      {items &&
        items.split(",").map((item, index) => (
          <li key={index} style={{ marginLeft: "0px", marginBottom: "1vh" }}>
            {item}
          </li>
        ))}
    </ul>
  );
};

const KioskTitle = ({ title }) => {
  return (
    <div
      style={{
        fontFamily: "NanumJangMiCe",
        fontSize: "7vh",
        paddingLeft: "1vh",
        color: "white",
      }}
    >
      {title}
    </div>
  );
};

export { ItemsList, KioskTitle };
