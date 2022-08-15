import React from "react";
import { Outlet } from "react-router-dom";
import Wrapper from "./styles";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";

const KioskLayout = () => {
  let theme = createTheme();
  responsiveFontSizes(theme, { breakpoints: ["xs", "sm", "md", "lg", "xl"] });

  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <div className="layout">
          <Outlet />
        </div>
      </ThemeProvider>
    </Wrapper>
  );
};

export default KioskLayout;
