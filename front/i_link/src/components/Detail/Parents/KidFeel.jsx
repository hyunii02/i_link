// 2022.08.12 강민재, 안정현
// 아이 기분
import React from 'react'
import axios from 'axios'
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";

import { urls, baseURL } from '../../../api/axios'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../../context/user'
import { getToday } from '../../../commonFuction'

import happy from './FeelPng/happy.png'
import smile from './FeelPng/smile.png'
import so_so from './FeelPng/so_so.png'
import sad from './FeelPng/sad.png'

const KidFeel = ({feel, setFeel, centerName, setCenterName, groupName, setGroupName}) => {
  const {firstKid} = useContext(UserContext)
  const getFeel = async () => {
    try {
    const response = await axios.get(
      baseURL + urls.fetchSurveysList + firstKid.kid_no
    );
    const lenData = response.data.length
    const latestFeel = response.data[lenData-1]
    
    if (latestFeel.survey_date.slice(0,10) === getToday()) {
      setFeel(latestFeel.survey_result)
    } else {
      console.log('오늘의 기분이 아직 등록되지 않았습니다.')
    }
  } catch(err) {
    console.log(err)
  }
  };
  const getCenterName = async () => {
    const response = await axios.get(
      baseURL + urls.fetchCentersDetial + firstKid.center_no
    ) 
    setCenterName(response.data.center_name)
  }

  const getGroupName = async () => {
    const response = await axios.get(
      baseURL + urls.fetchGroupsDetail + firstKid.group_no
    ) 
    setGroupName(response.data.group_name)
  }
  useEffect(() => {
    getFeel()
    getCenterName()
    getGroupName()
  }, [])

  return (
    <Box>
      <Typography variant="h5" component="h2" id="font_test" align="center">
        오늘의 "{firstKid.kid_name}"의 기분
      </Typography>
      <Grid container sx={{ justifyContent:"center"}}>
        { feel === '1' && <img src={sad} alt="슬퍼요" style={{ width: "70%", height: "70%"}}/>}
        { feel === '2' && <img src={so_so} alt="그저 그래요" style={{ width: "70%", height: "70%"}}/>}
        { feel === '3' && <img src={smile} alt="좋아요" style={{ width: "70%", height: "70%"}}/>}
        { feel === '4' && <img src={happy} alt="행복해요" style={{ width: "70%", height: "70%"}}/>}
      </Grid>
      <Typography variant="body1" component="h2" id="font_test" align="center">
        {centerName||''}
      </Typography>
      <Typography variant="body1" component="h2" id="font_test" align="center">
        {groupName||''}
      </Typography>
    </Box>
  )
}

export default KidFeel