const express = require("express");
const path = require("path");
const router = express.Router();

const memosController = require(path.join(__dirname, "..", "controllers", "memos"));

/**
 * @swagger
 * paths:
 *  /memos/register:
 *    post:
 *      summary: "알림장 등록"
 *      description: "post 방식으로 알림장 등록"
 *      tags: [Memos]
 *      requestBody:
 *          description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (알림장 등록)
 *          required: true
 *          content:
 *            application/x-www-form-urlencoded:
 *              schema:
 *                type: object
 *                properties:
 *                  groupNo:
 *                    type: string
 *                    description: "반 번호"
 *                  memoContent:
 *                    type: string
 *                    description: "알림장 내용"
 *                  memoDate:
 *                    type: string
 *                    format: date
 *                    description: "알림장 날짜"
 *      responses:
 *        "200":
 *          description: 알림장 등록 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "알림장 등록 완료"
 *
 *        "500":
 *          description: 알림장 등록 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "알림장 등록 실패"
 */
router.post("/register", memosController.memo_regist);

/**
 * @swagger
 * paths:
 *  /memos/list/{groupNo}:
 *    get:
 *      summary: "알림장 목록 조회"
 *      description: "get 방식으로 알림장 목록 조회"
 *      tags: [Memos]
 *      parameters:
 *        - in: path
 *          name: groupNo
 *          required: true
 *          description: 반 번호
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 알림장 목록 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                    [{"알림장1": "알림장 정보1"},{"알림장2": "알림장 정보2"}]
 *        "500":
 *          description: 알림장 조회 실패
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
router.get("/list/:groupNo", memosController.memo_list);

/**
 * @swagger
 * paths:
 *  /memos/{memoNo}:
 *    get:
 *      summary: "알림장 정보 조회"
 *      description: "get 방식으로 알림장 정보 조회"
 *      tags: [Memos]
 *      parameters:
 *        - in: path
 *          name: memoNo
 *          required: true
 *          description: 알림장 번호
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 알림장 정보 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  memo_no:
 *                    type: integer
 *                    example: 4
 *                  group_no:
 *                    type: integer
 *                    example: 1
 *                  memo_content:
 *                    type: string
 *                    example: "크레파스"
 *                  memo_date:
 *                    type: string
 *                    example: "2022-08-03"
 *        "500":
 *          description: 알림장 정보 조회 실패
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
router.get("/:memoNo", memosController.memo_detail);

/**
 * @swagger
 * paths:
 *  /memos/{memoNo}:
 *    put:
 *      summary: "알림장 정보 수정"
 *      description: "put 방식으로 알림장 정보 수정"
 *      tags: [Memos]
 *      parameters:
 *        - in: path
 *          name: memoNo
 *          required: true
 *          description: 알림장 번호
 *          schema:
 *            type: integer
 *      requestBody:
 *          description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. ( 알림장 정보 수정)
 *          required: true
 *          content:
 *            application/x-www-form-urlencoded:
 *              schema:
 *                type: object
 *                properties:
 *                  memoContent:
 *                    type: string
 *                    description: "알림장 내용"
 *      responses:
 *        "200":
 *          description: 알림장 수정 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "알림장 수정 완료"
 *
 *        "500":
 *          description: 알림장 수정 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "알림장 수정 실패"
 */
router.put("/:memoNo", memosController.memo_update);

/**
 * @swagger
 * paths:
 *  /memos/{memoNo}:
 *    delete:
 *      summary: "알림장 삭제"
 *      description: "delete 방식으로 알림장 삭제"
 *      tags: [Memos]
 *      parameters:
 *        - in: path
 *          name: memoNo
 *          required: true
 *          description: 알림장 번호
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 알림장 삭제 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "알림장 삭제 완료"
 *
 *        "500":
 *          description: 알림장 삭제 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "알림장 삭제 실패"
 */
router.delete("/:memoNo", memosController.memo_remove);

module.exports = router;
