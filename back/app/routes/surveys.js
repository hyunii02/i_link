const express = require("express");
const path = require("path");
const router = express.Router();

const surveysController = require(path.join(__dirname, "..", "controllers", "surveys"));

/**
 * @swagger
 * paths:
 *  /surveys/register:
 *    post:
 *      summary: "설문 등록"
 *      description: "post 방식으로 설문 등록"
 *      tags: [Surveys]
 *      requestBody:
 *          description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (설문 등록)
 *          required: true
 *          content:
 *            application/x-www-form-urlencoded:
 *              schema:
 *                type: object
 *                properties:
 *                  kidNo:
 *                    type: integer
 *                    description: "아이 번호"
 *                  surveyResult:
 *                    type: string
 *                    description: "설문 결과(1슬픔 2그저그럼 3좋음 4상당히좋음)"
 *      responses:
 *        "200":
 *          description: 설문 등록 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "설문 등록 완료"
 *
 *        "500":
 *          description: 설문 등록 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "설문 등록 실패"
 */
router.post("/register", surveysController.survey_regist);

/**
 * @swagger
 * paths:
 *  /surveys/list/{kidNo}:
 *    get:
 *      summary: "설문 목록 조회"
 *      description: "get 방식으로 설문 목록 조회"
 *      tags: [Surveys]
 *      parameters:
 *        - in: path
 *          name: kidNo
 *          required: true
 *          description: 아이 번호
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 설문 목록 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                    [{"설문1": "설문 정보1"},{"설문2": "설문 정보2"}]
 *        "500":
 *          description: 설문 조회 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "목록 조회 과정에 문제 발생"
 */
router.get("/list/:kidNo", surveysController.survey_list);

/**
 * @swagger
 * paths:
 *  /surveys/{surveyNo}:
 *    get:
 *      summary: "설문 정보 조회"
 *      description: "get 방식으로 설문 정보 조회"
 *      tags: [Surveys]
 *      parameters:
 *        - in: path
 *          name: surveyNo
 *          required: true
 *          description: 설문 번호
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 설문 정보 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  kidNo:
 *                    type: integer
 *                    example: 4
 *                  surveyResult:
 *                    type: string
 *                    example: "좋음"
 *                  surveyDate:
 *                    type: string
 *                    example: "2022-08-03"
 *        "500":
 *          description: 설문 정보 조회 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "해당 정보를 찾을 수 없습니다."
 */
router.get("/:surveyNo", surveysController.survey_detail);

module.exports = router;
