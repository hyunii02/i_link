const express = require("express");
const path = require("path");
const router = express.Router();

const quizController = require(path.join(__dirname, "..", "controllers", "quiz"));

/**
 * @swagger
 * paths:
 *  /quiz/register:
 *    post:
 *      summary: "퀴즈 등록"
 *      description: "post 방식으로 퀴즈 등록"
 *      tags: [Quiz]
 *      requestBody:
 *          description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (퀴즈 등록)
 *          required: true
 *          content:
 *            application/x-www-form-urlencoded:
 *              schema:
 *                type: object
 *                properties:
 *                  quizWriter:
 *                    type: integer
 *                    description: "작성자 번호(작성자 userNo)"
 *                  groupNo:
 *                    type: integer
 *                    description: "반 번호"
 *                  quizContent:
 *                    type: string
 *                    description: "퀴즈 질문"
 *                  quizSel1:
 *                    type: string
 *                    description: "퀴즈 선택지 1"
 *                  quizSel2:
 *                    type: string
 *                    description: "퀴즈 선택지 2"
 *                  quizSel3:
 *                    type: string
 *                    description: "퀴즈 선택지 3"
 *                  quizSel4:
 *                    type: string
 *                    description: "퀴즈 선택지 4"
 *                  quizAns:
 *                    type: integer
 *                    description: "퀴즈 답(1,2,3,4)"
 *                  quizDate:
 *                    type: string
 *                    format: date
 *                    description: "퀴즈 날짜"
 *      responses:
 *        "200":
 *          description: 퀴즈 등록 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "퀴즈 등록 완료"
 *
 *        "500":
 *          description: 퀴즈 등록 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "퀴즈 등록 실패"
 */
router.post("/register", quizController.quiz_regist);

/**
 * @swagger
 * paths:
 *  /quiz/list/{userNo}:
 *    get:
 *      summary: "퀴즈 목록 조회"
 *      description: "get 방식으로 퀴즈 목록 조회"
 *      tags: [Quiz]
 *      parameters:
 *        - in: path
 *          name: userNo
 *          required: true
 *          description: 작성자 번호(userNo)
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 퀴즈 목록 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                    [{"퀴즈1": "퀴즈 정보1"},{"퀴즈2": "퀴즈 정보2"}]
 *        "500":
 *          description: 퀴즈 조회 실패
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
router.get("/list/:userNo", quizController.quiz_list);

/**
 * @swagger
 * paths:
 *  /quiz/{quizNo}:
 *    get:
 *      summary: "퀴즈 정보 조회"
 *      description: "get 방식으로 퀴즈 정보 조회"
 *      tags: [Quiz]
 *      parameters:
 *        - in: path
 *          name: quizNo
 *          required: true
 *          description: 퀴즈 번호
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 퀴즈 정보 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  quiz_no:
 *                    type: integer
 *                    example: 4
 *                  quiz_writer:
 *                    type: integer
 *                    example: 13
 *                  group_no:
 *                    type: integer
 *                    example: 1
 *                  quiz_content:
 *                    type: string
 *                    example: "이건 뭘까요?"
 *                  quiz_sel_1:
 *                    type: string
 *                    example: "크레파스"
 *                  quiz_sel_2:
 *                    type: string
 *                    example: "도레미파"
 *                  quiz_sel_3:
 *                    type: string
 *                    example: "물감"
 *                  quiz_sel_4:
 *                    type: string
 *                    example: "고양이"
 *                  quiz_ans:
 *                    type: integer
 *                    example: 4
 *                  quiz_date:
 *                    type: string
 *                    example: "2022-08-11"
 *        "500":
 *          description: 퀴즈 정보 조회 실패
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
router.get("/:quizNo", quizController.quiz_detail);

/**
 * @swagger
 * paths:
 *  /quiz/{quizNo}:
 *    put:
 *      summary: "퀴즈 정보 수정"
 *      description: "put 방식으로 퀴즈 정보 수정"
 *      tags: [Quiz]
 *      parameters:
 *        - in: path
 *          name: quizNo
 *          required: true
 *          description: 퀴즈 번호
 *          schema:
 *            type: integer
 *      requestBody:
 *          description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. ( 퀴즈 정보 수정)
 *          required: true
 *          content:
 *            application/x-www-form-urlencoded:
 *              schema:
 *                type: object
 *                properties:
 *                  quizContent:
 *                    type: string
 *                    description: "퀴즈 질문"
 *                  quizSel1:
 *                    type: string
 *                    description: "퀴즈 선택지 1"
 *                  quizSel2:
 *                    type: string
 *                    description: "퀴즈 선택지 2"
 *                  quizSel3:
 *                    type: string
 *                    description: "퀴즈 선택지 3"
 *                  quizSel4:
 *                    type: string
 *                    description: "퀴즈 선택지 4"
 *                  quizAns:
 *                    type: integer
 *                    description: "퀴즈 답(1,2,3,4)"
 *      responses:
 *        "200":
 *          description: 퀴즈 수정 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "퀴즈 수정 완료"
 *
 *        "500":
 *          description: 퀴즈 수정 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "퀴즈 수정 실패"
 */
router.put("/:quizNo", quizController.quiz_update);

/**
 * @swagger
 * paths:
 *  /quiz/{quizNo}:
 *    delete:
 *      summary: "퀴즈 삭제"
 *      description: "delete 방식으로 퀴즈 삭제"
 *      tags: [Quiz]
 *      parameters:
 *        - in: path
 *          name: quizNo
 *          required: true
 *          description: 퀴즈 번호
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 퀴즈 삭제 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "퀴즈 삭제 완료"
 *
 *        "500":
 *          description: 퀴즈 삭제 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "퀴즈 삭제 실패"
 */
router.delete("/:quizNo", quizController.quiz_remove);

module.exports = router;
