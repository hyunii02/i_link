const express = require("express");
const path = require("path");
const router = express.Router();

const stampsController = require(path.join(__dirname, "..", "controllers", "stamps"));

/**
 * @swagger
 * paths:
 *  /stamps/stamping:
 *    put:
 *      summary: "칭찬 도장 + 1"
 *      description: "put 방식으로 칭찬 도장 찍어주기"
 *      tags: [Stamps]
 *      requestBody:
 *          description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. ( 칭찬 도장 정보 수정)
 *          required: true
 *          content:
 *            application/x-www-form-urlencoded:
 *              schema:
 *                type: object
 *                properties:
 *                  kidNo:
 *                    type: integer
 *                    description: "키즈 번호"
 *      responses:
 *        "200":
 *          description: 칭찬 도장 찍어주기 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "칭찬 도장 + 1"
 *
 *        "500":
 *          description: 칭찬 도장 찍기 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "칭찬 도장 찍기 실패"
 */
router.put("/stamping", stampsController.stamp_stamping);

/**
 * @swagger
 * paths:
 *  /stamps/{kidNo}:
 *    put:
 *      summary: "칭찬 도장 정보 수정"
 *      description: "put 방식으로 칭찬 도장 정보 수정"
 *      tags: [Stamps]
 *      parameters:
 *        - in: path
 *          name: kidNo
 *          required: true
 *          description: 키즈 번호
 *          schema:
 *            type: integer
 *      requestBody:
 *          description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. ( 칭찬 도장 정보 수정)
 *          required: true
 *          content:
 *            application/x-www-form-urlencoded:
 *              schema:
 *                type: object
 *                properties:
 *                  kidStamp:
 *                    type: integer
 *                    description: "칭찬 도장 갯수"
 *      responses:
 *        "200":
 *          description: 칭찬 도장 수정 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "칭찬 도장 수정 완료"
 *
 *        "500":
 *          description: 칭찬 도장 수정 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "칭찬 도장 수정 실패"
 */
router.put("/:kidNo", stampsController.stamp_update);

module.exports = router;
