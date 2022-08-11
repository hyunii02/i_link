import React from "react";
import { Outlet } from "react-router-dom";
import Wrapper from "./styles";

const KioskLayout = () => {
  return (
    <Wrapper>
      <div className="layout">
        <Outlet />
      </div>
    </Wrapper>
  );
};

export default KioskLayout;
