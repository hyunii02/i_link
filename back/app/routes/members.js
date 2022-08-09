const express = require("express");
const path = require("path");
const router = express.Router();

const memberController = require(path.join(__dirname, "..", "controllers", "members"));

/**
 * @swagger
 * paths:
 *  /members/manage/teacher/{centerNo}:
 *    get:
 *      summary: "승인 대기중인 교사 목록"
 *      description: "get 방식으로 승인 대기중인 교사 목록 조회"
 *      tags: [Members]
 *      parameters:
 *        - in: path
 *          name: centerNo
 *          required: true
 *          description: 유치원 번호
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 승인 대기중인 교사 목록 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                    [{"user_no": 72, "user_type": 2, "user_name": "선생님1", "user_profile_url": null},
 *                     { "user_no": 73, "user_type": 2, "user_name": "선생님2", "user_profile_url": null }]
 *        "500":
 *          description: 유치원 목록 조회 실패
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
router.get("/manage/teacher/:centerNo", memberController.member_teacher_getList);

/**
 * @swagger
 * paths:
 *  /members/manage/teacher/{centerNo}:
 *    put:
 *      summary: "유치원 등록 승인(유치원 반 배정)"
 *      description: "put 방식으로 유치원 등록 승인(유치원 반 배정)"
 *      tags: [Members]
 *      parameters:
 *        - in: path
 *          name: centerNo
 *          required: true
 *          description: 유치원 번호
 *          schema:
 *            type: integer
 *      requestBody:
 *          description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (승인 목록)
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                    teacherList:
 *                       type: array
 *                       items:
 *                           type: object
 *                           properties:
 *                               userNo:
 *                                  type: integer
 *                               groupNo:
 *                                  type: integer
 *                 example: [{"userNo": 35, "groupNo": 6}, {"userNo": 71, "groupNo": 8}]
 *      responses:
 *        "200":
 *          description: 승인 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "반 배정 완료."
 *
 *        "400":
 *          description: 승인 요청 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "반 배정 요청 실패."
 *        "500":
 *          description: 승인 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "반 배정 실패."
 */
router.put("/manage/teacher/:centerNo", memberController.member_teacher_approve);

/**
 * @swagger
 * paths:
 *  /members/remove/teacher:
 *    put:
 *      summary: "유치원에서 삭제"
 *      description: "put 방식으로 유치원에서 삭제"
 *      tags: [Members]
 *      requestBody:
 *          description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (교사 삭제)
 *          required: true
 *          content:
 *            application/x-www-form-urlencoded:
 *              schema:
 *                type: object
 *                properties:
 *                  userNo:
 *                    type: integer
 *      responses:
 *        "200":
 *            description: 삭제 성공
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                        type: string
 *                        example:
 *                            "유치원 목록에서 제거 완료."
 *
 *        "400":
 *            description: 요청 오류 발생
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                        type: string
 *                        example:
 *                            "요청 오류 발생."
 *        "500":
 *            description: 삭제 실패
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                        type: string
 *                        example:
 *                            "삭제 실패."
 */
router.put("/remove/teacher", memberController.member_teacher_remove);

/**
 * @swagger
 * paths:
 *  /members/manage/kids/{centerNo}:
 *    get:
 *      summary: "승인 대기중인 원생 목록"
 *      description: "get 방식으로 승인 대기중인 원생 목록 조회"
 *      tags: [Members]
 *      parameters:
 *        - in: path
 *          name: centerNo
 *          required: true
 *          description: 유치원 번호
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 승인 대기중인 원생 목록 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                    [{"kid_no": 5, "kid_name": "이하나", "kid_profile_url": null },
 *                     { "kid_no": 6, "kid_name": "이두나", "kid_profile_url": null },
 *                     { "kid_no": 7, "kid_name": "이세나", "kid_profile_url": null }]
 *        "500":
 *          description: 유치원 목록 조회 실패
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
router.get("/manage/kids/:centerNo", memberController.member_kid_getList);

/**
 * @swagger
 * paths:
 *  /members/manage/kids/{centerNo}:
 *    put:
 *      summary: "유치원 등록 승인(유치원 반 배정)"
 *      description: "put 방식으로 유치원 등록 승인(유치원 반 배정)"
 *      tags: [Members]
 *      parameters:
 *        - in: path
 *          name: centerNo
 *          required: true
 *          description: 유치원 번호
 *          schema:
 *            type: integer
 *      requestBody:
 *          description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (승인 목록)
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                    kidsList:
 *                       type: array
 *                       items:
 *                           type: object
 *                           properties:
 *                               kidNo:
 *                                  type: integer
 *                               groupNo:
 *                                  type: integer
 *                 example: [{"kidNo": 5, "groupNo": 6}, {"kidNo": 6, "groupNo": 8}, {"kidNo": 7, "groupNo": 7}]
 *      responses:
 *        "200":
 *          description: 승인 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "반 배정 완료."
 *
 *        "400":
 *          description: 승인 요청 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "반 배정 요청 실패."
 *        "500":
 *          description: 승인 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "반 배정 실패."
 */
router.put("/manage/kids/:centerNo", memberController.member_kid_approve);

/**
 * @swagger
 * paths:
 *  /members/remove/kids:
 *    put:
 *      summary: "유치원에서 삭제"
 *      description: "put 방식으로 유치원에서 삭제"
 *      tags: [Members]
 *      requestBody:
 *          description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (교사 삭제)
 *          required: true
 *          content:
 *            application/x-www-form-urlencoded:
 *              schema:
 *                type: object
 *                properties:
 *                  kidNo:
 *                    type: integer
 *      responses:
 *        "200":
 *            description: 삭제 성공
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                        type: string
 *                        example:
 *                            "유치원 목록에서 제거 완료."
 *
 *        "400":
 *            description: 요청 오류 발생
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                        type: string
 *                        example:
 *                            "요청 오류 발생."
 *        "500":
 *            description: 삭제 실패
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                        type: string
 *                        example:
 *                            "삭제 실패."
 */
router.put("/remove/kids", memberController.member_kid_remove);

/**
 * @swagger
 * paths:
 *  /members/teacher/{centerNo}:
 *    get:
 *      summary: "유치원/반별 교사 목록 조회"
 *      description: "get 방식으로 유치원별 교사 목록 조회"
 *      tags: [Members]
 *      parameters:
 *        - in: path
 *          name: centerNo
 *          required: true
 *          description: 유치원 번호
 *          schema:
 *            type: integer
 *        - in: query
 *          name: groupNo
 *          required: false
 *          description: 반 번호
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 교사 목록 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                    [{"user_no": 3, "user_type": 2, "user_name": "박선생", "user_profile_url": null },
 *                     { "user_no": 28, "user_type": 2, "user_name": "김국진", "user_profile_url": null },
 *                     { "user_no": 33, "user_type": 2, "user_name": "김국진", "user_profile_url": null }]
 *        "500":
 *          description: 유치원 목록 조회 실패
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
router.get("/teacher/:centerNo", memberController.member_teacherList);

/**
 * @swagger
 * paths:
 *  /members/kids/{centerNo}:
 *    get:
 *      summary: "유치원/반별 원생 목록 조회"
 *      description: "get 방식으로 유치원별 원생 목록 조회"
 *      tags: [Members]
 *      parameters:
 *        - in: path
 *          name: centerNo
 *          required: true
 *          description: 유치원 번호
 *          schema:
 *            type: integer
 *        - in: query
 *          name: groupNo
 *          required: false
 *          description: 반 번호
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 원생 목록 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                    [{ "kid_no": 1, "kid_name": "이키즈", "kid_profile_url": null },
 *                     { "kid_no": 2, "kid_name": "유키즈", "kid_profile_url": null },
 *                     { "kid_no": 3, "kid_name": "유희왕", "kid_profile_url": null }]
 *        "500":
 *          description: 유치원 목록 조회 실패
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
router.get("/kids/:centerNo", memberController.member_kidsList);

module.exports = router;
