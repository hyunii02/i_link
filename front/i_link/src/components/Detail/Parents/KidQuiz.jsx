// 아이 퀴즈
import React from 'react';
import axios from 'axios';
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";

import { urls, baseURL } from '../../../api/axios';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../../context/user';
import { colorPalette } from "../../../constants/constants.js";
import QuizFrame from '../../Quiz/QuizFrame.jsx';


const KidQuiz = () => {
	  // 퀴즈 리스트 관리
		const [quizList, setQuizList] = useState([]);
		// 오늘의 퀴즈 리스트 관리
		const [todayQuizList, setTodayQuizList] = useState([]);
	
		const { userGroup, userNo } = useContext(UserContext);
	
		// 퀴즈 리스트 get
		const getQuizData = () => {
			try {
				const fullURL = baseURL + urls.fetchQuizsList + userNo;
				axios
					.get(fullURL)
					.then((response) => {
						if (response.status === 200) {
							setQuizList(response.data);
						}
					})
					.catch((error) => console.log(error));
			} catch (e) {
				console.log(e);
			}
		};
	
		const isEmpty = (array) => {
			if (array.length === 0) return false;
			return true;
		};
	
		// 오늘의 퀴즈 get
		const getTodayQuiz = () => {
			try {
				const fullURL = baseURL + urls.fetchQuizTodayList + userGroup;
				axios
					.get(fullURL)
					.then((response) => {
						if (response.status === 200) {
							setTodayQuizList(response.data);
						}
					})
					.catch((error) => console.log(error));
			} catch (e) {
				console.log(e);
			}
		};
	
		useEffect(() => {
			getQuizData();
			getTodayQuiz();
		}, []);
		return (

				<Box
					sx={{
						// background: colorPalette.BACKGROUND_COLOR,
						background:'white',
						borderRadius: "20px",
					}}
				>
					<Typography
						id="font_test"
						variant="h5"
						textAlign="center"
						sx={{ mt: "10px", mb: "30px", flexDirection: "column", }}
						>
						🧡 오늘의 퀴즈 🧡
					</Typography>
					<Grid container spacing={1}>
						{isEmpty(todayQuizList) && (
							<Box sx={{ width: "100%", display: "flex" }}>
								<Grid item xs={3}></Grid>
								<Grid
									container
									item
									xs={6}
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										flexDirection: "column",
										fontFamily: "NanumGimYuICe",
										marginBottom: "20px",
									}}
								>
									<QuizFrame
										sx={{height: "500px"}}
										data={todayQuizList[0]}
										getQuizData={getQuizData}
										getTodayQuiz={getTodayQuiz}
										state={1}
									/>
								</Grid>
								<Grid item xs={3}></Grid>
							</Box>
						)}
					</Grid>
				</Box>

		);
}

export default KidQuiz