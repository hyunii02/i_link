const express = require("express");
const path = require("path");
const router = express.Router();

const mealsController = require(path.join(__dirname, "..", "controllers", "meals"));

/**
 * @swagger
 * paths:
 *  /meals/register:
 *    post:
 *      summary: "식단 등록"
 *      description: "post 방식으로 식단 등록"
 *      tags: [Meals]
 *      requestBody:
 *          description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (식단 등록)
 *          required: true
 *          content:
 *            application/x-www-form-urlencoded:
 *              schema:
 *                type: object
 *                properties:
 *                  centerNo:
 *                    type: string
 *                    description: "유치원 번호"
 *                  snackContent:
 *                    type: string
 *                    description: "간식 내용"
 *                  mealContent:
 *                    type: string
 *                    description: "식단 내용"
 *                  mealDate:
 *                    type: string
 *                    format: date
 *                    description: "식단 날짜"
 *      responses:
 *        "200":
 *          description: 식단 등록 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "식단 등록 완료"
 *
 *        "500":
 *          description: 식단 등록 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "식단 등록 실패"
 */
router.post("/register", mealsController.meal_regist);

/**
 * @swagger
 * paths:
 *  /meals/list/{centerNo}/{mealDate}:
 *    get:
 *      summary: "식단 목록 조회"
 *      description: "get 방식으로 식단 목록 조회"
 *      tags: [Meals]
 *      parameters:
 *        - in: path
 *          name: centerNo
 *          required: true
 *          description: 유치원 번호
 *          schema:
 *            type: integer
 *        - in: path
 *          name: mealDate
 *          required: true
 *          description: 식단 날짜
 *          schema:
 *            type: string
 *            format: date
 *      responses:
 *        "200":
 *          description: 식단 목록 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                    [{"식단1": "식단 정보1"},{"식단2": "식단 정보2"}]
 *        "500":
 *          description: 식단 조회 실패
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
router.get("/list/:centerNo/:mealDate", mealsController.meal_list);

/**
 * @swagger
 * paths:
 *  /meals/{mealNo}:
 *    get:
 *      summary: "식단 정보 조회"
 *      description: "get 방식으로 식단 정보 조회"
 *      tags: [Meals]
 *      parameters:
 *        - in: path
 *          name: mealNo
 *          required: true
 *          description: 식단 번호
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 식단 정보 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  mealNo:
 *                    type: integer
 *                    example: 4
 *                  centerNo:
 *                    type: integer
 *                    example: 1
 *                  snackContent:
 *                    type: string
 *                    example: "M"
 *                  mealContent:
 *                    type: string
 *                    example: "크레파스"
 *                  mealDate:
 *                    type: string
 *                    example: "2022-08-03"
 *        "500":
 *          description: 식단 정보 조회 실패
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
router.get("/:mealNo", mealsController.meal_detail);

/**
 * @swagger
 * paths:
 *  /meals/{mealNo}:
 *    put:
 *      summary: "식단 정보 수정"
 *      description: "put 방식으로 식단 정보 수정"
 *      tags: [Meals]
 *      parameters:
 *        - in: path
 *          name: mealNo
 *          required: true
 *          description: 식단 번호
 *          schema:
 *            type: integer
 *      requestBody:
 *          description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. ( 식단 정보 수정)
 *          required: true
 *          content:
 *            application/x-www-form-urlencoded:
 *              schema:
 *                type: object
 *                properties:
 *                  snackContent:
 *                    type: string
 *                    description: "간식 내용"
 *                  mealContent:
 *                    type: string
 *                    description: "식단 내용"
 *      responses:
 *        "200":
 *          description: 식단 수정 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "식단 수정 완료"
 *
 *        "500":
 *          description: 식단 수정 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "식단 수정 실패"
 */
router.put("/:mealNo", mealsController.meal_update);

/**
 * @swagger
 * paths:
 *  /meals/{mealNo}:
 *    delete:
 *      summary: "식단 삭제"
 *      description: "delete 방식으로 식단 삭제"
 *      tags: [Meals]
 *      parameters:
 *        - in: path
 *          name: mealNo
 *          required: true
 *          description: 식단 번호
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 식단 삭제 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "식단 삭제 완료"
 *
 *        "500":
 *          description: 식단 삭제 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "식단 삭제 실패"
 */
router.delete("/:mealNo", mealsController.meal_remove);

module.exports = router;
