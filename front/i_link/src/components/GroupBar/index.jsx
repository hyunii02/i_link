import { useState, useEffect } from "react";
import { Typography, AppBar, Tabs, Tab } from "@mui/material";

const AppBarTab = (props) => {
  const { groupList, getTotalList } = props;

  const [value, setValue] = useState(groupList[0].value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // selectedBox의 선택 값이 바뀌게 될 시, 선생/원아 목록을 다시 불러들임
  useEffect(() => {
    getTotalList(value);
  }, [value]);
  return (
    <AppBar position="static" color="default">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="action tabs example"
        sx={{ border: "6px solid #fae2e2", background: "#FAF1DA" }}
      >
        {groupList.map((list) => (
          <Tab
            label={
              <Typography id="font_test" variant="h5">
                {list.content}
              </Typography>
            }
            value={list.value}
            key={list.value}
            sx={{ background: "#FAF1DA" }}
          />
        ))}
      </Tabs>
    </AppBar>
  );
};

export default AppBarTab;
