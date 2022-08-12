const express = require("express");
const path = require("path");
const attachment = require("../utils/attachment");
const router = express.Router();

const noticeController = require(path.join(__dirname, "..", "controllers", "notices"));

/**
 * @swagger
 * paths:
 *  /notices/register:
 *    post:
 *      summary: "공지사항 등록"
 *      description: "post 방식으로 공지사항 등록"
 *      tags: [Notices]
 *      requestBody:
 *          description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (공지사항 등록)
 *          required: true
 *          content:
 *            multipart/form-data:
 *              schema:
 *                type: object
 *                properties:
 *                  centerNo:
 *                    type: integer
 *                    description: "유치원 번호"
 *                  noticeTitle:
 *                    type: string
 *                    description: "공지사항 제목"
 *                  noticeContent:
 *                    type: string
 *                    description: "공지사항 내용"
 *                  files:
 *                    type: file
 *                    description: "첨부파일 (전송 가능한 최대 파일 개수: 5, 총 25MB)"
 *      responses:
 *        "200":
 *          description: 공지사항 등록 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "공지 작성 완료"
 *
 *        "500":
 *          description: 공지사항 등록 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "공지 작성 실패"
 */
router.post("/register", attachment.array("files", 5), noticeController.notice_regist);

/**
 * @swagger
 * paths:
 *  /notices/list/{centerNo}:
 *    get:
 *      summary: "공지사항 목록 조회"
 *      description: "get 방식으로 공지사항 목록 조회"
 *      tags: [Notices]
 *      parameters:
 *        - in: path
 *          name: centerNo
 *          required: true
 *          description: 유치원 번호
 *          schema:
 *            type: integer
 *        - in: query
 *          name: keyword
 *          required: false
 *          description: 검색 키워드 (제목)
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: 공지사항 목록 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  notice_no:
 *                    type: integer
 *                    example: 1
 *                  notice_title:
 *                    type: string
 *                    example: "공지 제목"
 *                  notice_date:
 *                    type: string
 *                    example: "2022-08-03 07:28:21"
 *                  attachment:
 *                    type: integer
 *                    example: 0 (없음 - 0, 있음 - 1)
 *                example:
 *                    [{"notice_no": 21, "notice_title": "새로운공지제목", "notice_date": "2022-08-12 10:59:15", "attachment": 0 },
 *                     { "notice_no": 18, "notice_title": "폭우에 주의하세요", "notice_date": "2022-08-12 10:31:04", "attachment": 0 },
 *                     { "notice_no": 17, "notice_title": "test title", "notice_date": "2022-08-12 09:27:32", "attachment": 1 },
 *                     { "notice_no": 16, "notice_title": "공지입니다~", "notice_date": "2022-08-11 16:47:48", "attachment": 0 }]
 *        "500":
 *          description: 공지사항 조회 실패
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
router.get("/list/:centerNo", noticeController.notice_list);

/**
 * @swagger
 * paths:
 *  /notices/{noticeNo}:
 *    get:
 *      summary: "공지사항 정보 조회"
 *      description: "get 방식으로 공지사항 정보 조회"
 *      tags: [Notices]
 *      parameters:
 *        - in: path
 *          name: noticeNo
 *          required: true
 *          description: 공지사항 번호
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 공지사항 정보 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  notice_no:
 *                    type: integer
 *                    example: 1
 *                  notice_title:
 *                    type: string
 *                    example: "공지 제목"
 *                  notice_content:
 *                    type: string
 *                    example: "공지 내용"
 *                  notice_date:
 *                    type: string
 *                    example: "2022-08-03 07:28:21"
 *                  files:
 *                    type: object
 *                    properties:
 *                       file_no:
 *                         type: integer
 *                         example: 3
 *                       file_name:
 *                         type: string
 *                         example: "kid img.png"
 *                       file_location:
 *                         type: string
 *                         example: "/uploads/attachment/1660264052446.png"
 *                    example: [{ "file_no": 11, "file_name": "kid img.png", "file_location": "/uploads/attachment/1660280444914.png" },
 *                              { "file_no": 12, "file_name": "profile.png", "file_location": "/uploads/attachment/1660280444915.png" } ]
 *        "400":
 *          description: 공지사항 조회 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "해당 데이터가 없습니다."
 *        "500":
 *          description: 공지사항 조회 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "공지사항 조회 실패"
 */
router.get("/:noticeNo", noticeController.notice_detail);

/**
 * @swagger
 * paths:
 *  /notices/{noticeNo}:
 *    put:
 *      summary: "공지사항 정보 수정"
 *      description: "put 방식으로 공지사항 정보 수정"
 *      tags: [Notices]
 *      parameters:
 *        - in: path
 *          name: noticeNo
 *          required: true
 *          description: 공지사항 번호
 *          schema:
 *            type: integer
 *      requestBody:
 *          description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (공지사항 정보 수정)
 *          required: true
 *          content:
 *            multipart/form-data:
 *              schema:
 *                type: object
 *                properties:
 *                  noticeTitle:
 *                    type: string
 *                    description: "공지사항 제목"
 *                  noticeContent:
 *                    type: string
 *                    description: "공지사항 내용"
 *                  files:
 *                    type: file
 *                    description: "첨부파일 (전송 가능한 최대 파일 개수: 5, 총 25MB)"
 *      responses:
 *        "200":
 *          description: 공지사항 수정 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "공지사항 수정 완료"
 *        "400":
 *          description: 공지사항 수정 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "해당 정보를 찾을 수 없거나 데이터가 비어있음"
 *        "500":
 *          description: 공지사항 수정 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "공지사항 수정 실패"
 */
router.put("/:noticeNo", attachment.array("files", 5), noticeController.notice_update);

/**
 * @swagger
 * paths:
 *  /notices/{noticeNo}:
 *    delete:
 *      summary: "공지사항 삭제"
 *      description: "delete 방식으로 공지사항 삭제"
 *      tags: [Notices]
 *      parameters:
 *        - in: path
 *          name: noticeNo
 *          required: true
 *          description: 공지사항 번호
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 공지사항 삭제 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "삭제 완료"
 *        "400":
 *          description: 공지사항 삭제 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "해당 정보를 찾을 수 없습니다."
 *        "500":
 *          description: 공지사항 삭제 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "삭제 실패"
 */
router.delete("/:noticeNo", noticeController.notice_remove);

module.exports = router;
