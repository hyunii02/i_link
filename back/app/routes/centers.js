const express = require("express");
const path = require("path");
const router = express.Router();

const centerController = require(path.join(__dirname, "..", "controllers", "centers"));

/**
 * @swagger
 * paths:
 *  /centers/register:
 *    post:
 *      summary: "유치원 등록"
 *      description: "post 방식으로 유치원 등록"
 *      tags: [Centers]
 *      requestBody:
 *          description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유치원 등록)
 *          required: true
 *          content:
 *            application/x-www-form-urlencoded:
 *              schema:
 *                type: object
 *                properties:
 *                  centerName:
 *                    type: string
 *                    description: "유치원 이름"
 *                  centerAddr:
 *                    type: string
 *                    description: "유치원 주소"
 *                  centerTel:
 *                    type: string
 *                    description: "유치원 전화번호"
 *                  userNo:
 *                    type: integer
 *                    description: "원장 회원번호(front에서 hidden으로 전달)"
 *      responses:
 *        "200":
 *          description: 유치원 등록 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "유치원 등록 완료"
 *
 *        "400":
 *          description: 유치원 등록 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "유치원 등록 실패"
 */
router.post("/register", centerController.center_regist);

/**
 * @swagger
 * paths:
 *  /centers/list:
 *    get:
 *      summary: "유치원 목록 조회"
 *      description: "get 방식으로 유치원 목록 조회"
 *      tags: [Centers]
 *      parameters:
 *        - in: query
 *          name: keyword
 *          required: true
 *          description: 검색키워드
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: 유치원 목록 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                    [{ "center_no": 1, "center_name": "단밤 유치원", "center_addr": "부산광역시 남구 대연동", "center_tel": "051-222-1234", "master_no": 29 },
 *                     { "center_no": 3, "center_name": "꿀밤 유치원", "center_addr": "부산광역시 남구 대연동", "center_tel": "051-111-1234", "master_no": 4 }]
 *        "400":
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
router.get("/list", centerController.center_list);

/**
 * @swagger
 * /centers/{centerNo}:
 *  get:
 *    summary: "유치원 정보 조회"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [Centers]
 *    parameters:
 *      - in: path
 *        name: centerNo
 *        required: true
 *        description: 유치원 번호
 *        schema:
 *          type: integer
 *    responses:
 *      "200":
 *        description: 유치원 정보 조회 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                center_no:
 *                  type: integer
 *                  example: 3
 *                center_name:
 *                  type: string
 *                  example: "꿀밤 유치원"
 *                center_addr:
 *                  type: string
 *                  example: "부산광역시 남구 대연동"
 *                center_tel:
 *                  type: string
 *                  example: "051-111-1234"
 *                master_no:
 *                  type: integer
 *                  example: 4
 *      "400":
 *        description: 유치원 정보 조회 실패
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example:
 *                      "해당 유치원을 찾을 수 없습니다."
 */
router.get("/:centerNo", centerController.center_detail);

/**
 * @swagger
 * paths:
 *  /centers/{centerNo}:
 *    put:
 *      summary: "유치원 정보 수정"
 *      description: "put 방식으로 유치원 정보 수정"
 *      tags: [Centers]
 *      parameters:
 *        - in: path
 *          name: centerNo
 *          required: true
 *          description: 유치원 번호
 *          schema:
 *            type: integer
 *      requestBody:
 *          description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. ( 유치원 정보 수정)
 *          required: true
 *          content:
 *            application/x-www-form-urlencoded:
 *              schema:
 *                type: object
 *                properties:
 *                  centerName:
 *                    type: string
 *                    description: "유치원 이름"
 *                  centerAddr:
 *                    type: string
 *                    description: "유치원 주소"
 *                  centerTel:
 *                    type: string
 *                    description: "유치원 전화번호"
 *      responses:
 *        "200":
 *          description: 유치원 수정 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "유치원 수정 완료"
 *
 *        "400":
 *          description: 유치원 수정 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "유치원 수정 실패"
 */
router.put("/:centerNo", centerController.center_update);

/**
 * @swagger
 * paths:
 *  /centers/{centerNo}:
 *    delete:
 *      summary: "유치원 삭제"
 *      description: "delete 방식으로 유치원 삭제"
 *      tags: [Centers]
 *      parameters:
 *        - in: path
 *          name: centerNo
 *          required: true
 *          description: 유치원 번호
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 유치원 삭제 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "유치원 삭제 완료"
 *
 *        "400":
 *          description: 유치원 삭제 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "유치원 삭제 실패"
 */
router.delete("/:centerNo", centerController.center_remove);

module.exports = router;
