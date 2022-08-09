const express = require("express");
const path = require("path");
const router = express.Router();

const reportController = require(path.join(__dirname, "..", "controllers", "reports"));

/**
 * @swagger
 * paths:
 *  /reports/register:
 *    post:
 *      summary: "특이사항 등록"
 *      description: "post 방식으로 특이사항 등록"
 *      tags: [Reports]
 *      requestBody:
 *          description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (특이사항 등록)
 *          required: true
 *          content:
 *            application/x-www-form-urlencoded:
 *              schema:
 *                type: object
 *                properties:
 *                  kidNo:
 *                    type: integer
 *                    description: "아이 번호"
 *                  reportWriter:
 *                    type: integer
 *                    description: "특이사항 작성자 번호(userNo)"
 *                  reportType:
 *                    type: integer
 *                    description: "특이사항 타입"
 *                  reportContent:
 *                    type: string
 *                    description: "특이사항 내용"
 *      responses:
 *        "200":
 *          description: 특이사항 등록 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "특이사항 등록 완료"
 *
 *        "500":
 *          description: 특이사항 등록 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "특이사항 등록 실패"
 */
router.post("/register", reportController.report_regist);

/**
 * @swagger
 * paths:
 *  /reports/groups/{groupNo}:
 *    get:
 *      summary: "특이사항 목록 조회"
 *      description: "get 방식으로 특이사항 반 전체 목록 조회"
 *      tags: [Reports]
 *      parameters:
 *        - in: path
 *          name: groupNo
 *          required: true
 *          description: 반 번호
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 특이사항 목록 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                    [{"특이사항1": "특이사항 정보1"},{"특이사항2": "특이사항 정보2"}]
 *        "500":
 *          description: 특이사항 조회 실패
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
router.get("/groups/:groupNo", reportController.report_groupList);

/**
 * @swagger
 * paths:
 *  /reports/list/{kidNo}:
 *    get:
 *      summary: "특이사항 목록 조회"
 *      description: "get 방식으로 특이사항 개인 목록 조회"
 *      tags: [Reports]
 *      parameters:
 *        - in: path
 *          name: kidNo
 *          required: true
 *          description: 아이 번호
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 특이사항 목록 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                    [{"특이사항1": "특이사항 정보1"},{"특이사항2": "특이사항 정보2"}]
 *        "500":
 *          description: 특이사항 조회 실패
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
router.get("/list/:kidNo", reportController.report_kidList);

/**
 * @swagger
 * paths:
 *  /reports/{reportNo}:
 *    get:
 *      summary: "특이사항 정보 조회"
 *      description: "get 방식으로 특이사항 정보 조회"
 *      tags: [Reports]
 *      parameters:
 *        - in: path
 *          name: reportNo
 *          required: true
 *          description: 특이사항 번호
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 특이사항 정보 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  report_no:
 *                    type: integer
 *                    example: 4
 *                  kid_no:
 *                    type: integer
 *                    example: 1
 *                  report_writer:
 *                    type: integer
 *                    example: 1
 *                  report_type:
 *                    type: integer
 *                    example: 1
 *                  report_content:
 *                    type: string
 *                    example: "내용"
 *                  report_date:
 *                    type: string
 *                    example: "2022-08-03 07:28:21"
 *        "500":
 *          description: 특이사항 정보 조회 실패
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
router.get("/:reportNo", reportController.report_detail);

/**
 * @swagger
 * paths:
 *  /reports/{reportNo}:
 *    put:
 *      summary: "특이사항 정보 수정"
 *      description: "put 방식으로 특이사항 정보 수정"
 *      tags: [Reports]
 *      parameters:
 *        - in: path
 *          name: reportNo
 *          required: true
 *          description: 특이사항 번호
 *          schema:
 *            type: integer
 *      requestBody:
 *          description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. ( 특이사항 정보 수정)
 *          required: true
 *          content:
 *            application/x-www-form-urlencoded:
 *              schema:
 *                type: object
 *                properties:
 *                  reportType:
 *                    type: integer
 *                    description: "특이사항 타입"
 *                  reportContent:
 *                    type: string
 *                    description: "특이사항 내용"
 *      responses:
 *        "200":
 *          description: 특이사항 수정 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "특이사항 수정 완료"
 *
 *        "500":
 *          description: 특이사항 수정 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "특이사항 수정 실패"
 */
router.put("/:reportNo", reportController.report_update);

/**
 * @swagger
 * paths:
 *  /reports/{reportNo}:
 *    delete:
 *      summary: "특이사항 삭제"
 *      description: "delete 방식으로 특이사항 삭제"
 *      tags: [Reports]
 *      parameters:
 *        - in: path
 *          name: reportNo
 *          required: true
 *          description: 특이사항 번호
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 특이사항 삭제 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "특이사항 삭제 완료"
 *
 *        "500":
 *          description: 특이사항 삭제 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "특이사항 삭제 실패"
 */
router.delete("/:reportNo", reportController.report_remove);

module.exports = router;
