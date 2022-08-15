import KidsDetailInfo from "../../components/Detail/Teacher";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";

const KidsDetail = () => {
  const { state } = useLocation();
  const [kidNo, setKidNo] = useState(state.kidNo);

  return (
    <div>
      <KidsDetailInfo kidNo={kidNo} />
    </div>
  );
};

export default KidsDetail;
