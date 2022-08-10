import { Box, ListItemButton, Typography, Badge } from "@mui/material";
import ReportDetailView from "../ReportDetailView";

const Report = ({ title, list, viewState, setViewChange, idx }) => {
  // 특이사항 상세보기 핸들러
  const reportDetailClicked = (e) => {
    setViewChange(idx);
  };

  return (
    <Box sx={{ borderBottom: "1px solid black" }}>
      <ListItemButton
        sx={{ display: "flex", justifyContent: "space-between" }}
        onClick={reportDetailClicked}
        value="100000"
      >
        <Typography id="font_test" variant="h6">
          {title}
        </Typography>
        <Badge
          color="secondary"
          badgeContent={list.count}
          showZero
          fontSize="large"
        />
      </ListItemButton>
      {viewState &&
        list.content?.map((li, index) => (
          <ReportDetailView key={index} list={li} />
        ))}
    </Box>
  );
};

export default Report;
