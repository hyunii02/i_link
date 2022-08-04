const express = require("express");
const path = require("path");
const router = express.Router();

const groupController = require(path.join(__dirname, "..", "controllers", "group"));

/**
 * @swagger
 * paths:
 *  /groups/register:
 *    post:
 *      summary: "반 등록"
 *      description: "post 방식으로 반 등록"
 *      tags: [Groups]
 *      requestBody:
 *          description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (반 등록)
 *          required: true
 *          content:
 *            application/x-www-form-urlencoded:
 *              schema:
 *                type: object
 *                properties:
 *                  centerNo:
 *                    type: integer
 *                    description: "유치원 번호"
 *                  groupName:
 *                    type: string
 *                    description: "반 이름"
 *      responses:
 *        "200":
 *          description: 반 등록 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "반 등록 완료"
 *
 *        "400":
 *          description: 반 등록 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "반 등록 실패"
 */
router.post("/register", groupController.group_regist);

/**
 * @swagger
 * paths:
 *  /groups/list/{center_no}:
 *    get:
 *      summary: "반 목록 조회"
 *      description: "get 방식으로 반 목록 조회"
 *      tags: [Groups]
 *      parameters:
 *        - in: path
 *          name: center_no
 *          required: true
 *          description: 유치원 번호
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 반 목록 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                    [{"반1": "반 정보1"},{"반2": "반정보2"}]
 *        "400":
 *          description: 반 목록 조회 실패
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
router.get("/list/:center_no", groupController.group_list);

/**
 * @swagger
 * paths:
 *  /groups/{group_no}:
 *    get:
 *      summary: "반 정보 조회"
 *      description: "get 방식으로 반 정보 조회"
 *      tags: [Groups]
 *      parameters:
 *        - in: path
 *          name: group_no
 *          required: true
 *          description: 반 번호
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 반 정보 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  group_no:
 *                    type: integer
 *                    example: 1
 *                  center_no:
 *                    type: integer
 *                    example: 3
 *                  group_name:
 *                    type: string
 *                    example: "햇님반"
 *        "400":
 *          description: 반 정보 조회 실패
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
router.get("/:group_no", groupController.group_detail);

/**
 * @swagger
 * paths:
 *  /groups/{group_no}:
 *    put:
 *      summary: "반 정보 수정"
 *      description: "put 방식으로 반 정보 수정"
 *      tags: [Groups]
 *      parameters:
 *        - in: path
 *          name: group_no
 *          required: true
 *          description: 반 번호
 *          schema:
 *            type: integer
 *      requestBody:
 *          description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. ( 반 정보 수정)
 *          required: true
 *          content:
 *            application/x-www-form-urlencoded:
 *              schema:
 *                type: object
 *                properties:
 *                  groupName:
 *                    type: string
 *                    description: "반 이름"
 *      responses:
 *        "200":
 *          description: 반 수정 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "반 수정 완료"
 *
 *        "400":
 *          description: 반 수정 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "반 수정 실패"
 */
router.put("/:group_no", groupController.group_update);

/**
 * @swagger
 * paths:
 *  /groups/{group_no}:
 *    delete:
 *      summary: "반 삭제"
 *      description: "delete 방식으로 반 삭제"
 *      tags: [Groups]
 *      parameters:
 *        - in: path
 *          name: group_no
 *          required: true
 *          description: 반 번호
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 반 삭제 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "반 삭제 완료"
 *
 *        "400":
 *          description: 반 삭제 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "반 삭제 실패"
 */
router.delete("/:group_no", groupController.group_remove);

module.exports = router;
