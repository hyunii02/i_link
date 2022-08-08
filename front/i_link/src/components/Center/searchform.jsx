import React, { useState } from "react";
import PopupPostCode from "./PopupPostCode";
import { Button } from "@mui/material";
// import PopupDom from './PopupDom';

const SearchForm = (props) => {
  const { addAddress } = props;
  // 팝업창 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 팝업창 열기
  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  // 팝업창 닫기
  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <Button sx={{ width: 120, height: 50,background:"#E7E9ED",border:3,color:"#414142" }} onClick={openPostCode}>
        우편번호 검색
      </Button>

      <div id="popupDom">
        {isPopupOpen && (
          <PopupPostCode addAddress={addAddress} onClose={closePostCode} />
        )}
      </div>
    </div>
  );
};

export default SearchForm;
