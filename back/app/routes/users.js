const express = require("express");
const path = require("path");
const router = express.Router();

const auth = require(path.join(__dirname, "..", "utils", "auth"));
const userController = require(path.join(__dirname, "..", "controllers", "users"));

// 토큰 검증 test
// auth.verifyToken을 통해 유효한 토큰인지 검증 후, 유효하다면 다음 경로 이동 가능, 그렇지 않다면 이동 불가
// 홈으로 이동하기 전 auth.verifyToken 미들웨어 사용
router.get("/", auth.verifyToken, userController.verify_token);

// 토큰 업데이트 test
router.post("/token", auth.verifyRefreshToken, userController.refresh_token);

/**
 * @swagger
 * paths:
 *  /users/register:
 *    post:
 *      summary: "회원가입"
 *      description: "post 방식으로 회원 가입"
 *      tags: [Users]
 *      requestBody:
 *          description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 회원가입)
 *          required: true
 *          content:
 *            application/x-www-form-urlencoded:
 *              schema:
 *                type: object
 *                properties:
 *                  userType:
 *                    type: integer
 *                    description: "유저 유형 (원장-1, 교사-2, 학부모-3)"
 *                  userEmail:
 *                    type: string
 *                    description: "유저 이메일아이디"
 *                  userName:
 *                    type: string
 *                    description: "유저 이름"
 *                  userPw:
 *                    type: string
 *                    description: "유저 비밀번호"
 *                  userPhone:
 *                    type: string
 *                    description: "유저 전화번호(xxx-xxxx-xxxx)"
 *                  userProfileUrl:
 *                    type: string
 *                    description: "유저 프로필 사진 주소"
 *      responses:
 *        "200":
 *          description: 회원 가입 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "회원가입 완료"
 *
 *        "400":
 *          description: 회원 가입 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "회원가입 실패"
 */
router.post("/register", userController.user_regist);

/**
 * @swagger
 * paths:
 *  /users/login:
 *    post:
 *      summary: "로그인"
 *      description: "post 방식으로 로그인"
 *      tags: [Users]
 *      requestBody:
 *          description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 로그인)
 *          required: true
 *          content:
 *            application/x-www-form-urlencoded:
 *              schema:
 *                type: object
 *                properties:
 *                  userEmail:
 *                    type: string
 *                    description: "유저 이메일아이디"
 *                  userPw:
 *                    type: string
 *                    description: "유저 비밀번호"
 *      responses:
 *        "200":
 *          description: 로그인 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    logined:
 *                      type: boolean
 *                      example:
 *                          "true"
 *                    message:
 *                      type: string
 *                      example:
 *                          "로그인 성공"
 *                    data:
 *                      type: object
 *                      example:
 *                          [
 *                              user : { "user_no": 13, "user_type": 3, "user_name": "유저1" },
 *                              token : {access_token: "afhwelrkl2kjlkjl23r", refresh_token: "jrl2qhrlkjqhfjj3enr"}
 *                          ]
 *        "400":
 *          description: 로그인 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "비밀번호 오류 or 아이디 없음"
 */
router.post("/login", userController.user_login);

/**
 * @swagger
 * paths:
 *  /users/logout:
 *    get:
 *      summary: "로그아웃"
 *      description: "get 방식으로 로그아웃"
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: 로그아웃
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    logined:
 *                      type: boolean
 *                      example:
 *                          "false"
 *                    message:
 *                      type: string
 *                      example:
 *                          "로그아웃"
 */
router.get("/logout", userController.user_logout);

/**
 * @swagger
 * /users/{userNo}:
 *  get:
 *    summary: "회원 정보 조회"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: userNo
 *        required: true
 *        description: 유저 회원 번호
 *        schema:
 *          type: integer
 *    responses:
 *      "200":
 *        description: 회원 정보 조회 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user_no:
 *                  type: integer
 *                  example: 13
 *                user_type:
 *                  type: integer
 *                  example: 1
 *                user_email:
 *                  type: string
 *                  example: "park@aaa.com"
 *                user_pw:
 *                  type: string
 *                  example: ""
 *                user_name:
 *                  type: string
 *                  example: "박원장"
 *                user_phone:
 *                  type: string
 *                  example: "010-1234-1234"
 *                user_profile_url:
 *                  type: string
 *                  example: "/xyz/abc/de"
 *                group_no:
 *                  type: integer
 *                  example: null
 *                center_no:
 *                  type: integer
 *                  example: 133
 *      "400":
 *        description: 회원 정보 조회 실패
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example:
 *                      "사용자를 찾을 수 없습니다."
 */
router.get("/:userNo", userController.user_detail);

/**
 * @swagger
 * paths:
 *  /users/{userNo}:
 *    put:
 *      summary: "회원 정보 수정"
 *      description: "put 방식으로 회원 정보 수정"
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: userNo
 *          required: true
 *          description: 유저 회원 번호
 *          schema:
 *            type: integer
 *      requestBody:
 *          description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (회원 수정)
 *          required: true
 *          content:
 *            application/x-www-form-urlencoded:
 *              schema:
 *                type: object
 *                properties:
 *                  userName:
 *                    type: string
 *                    description: "유저 이름"
 *                  currentPw:
 *                    type: string
 *                    description: "현재 비밀번호"
 *                  userPw:
 *                    type: string
 *                    description: "새로운 비밀번호"
 *                  userPhone:
 *                    type: string
 *                    description: "유저 전화번호(xxx-xxxx-xxxx)"
 *                  userProfileUrl:
 *                    type: string
 *                    description: "유저 프로필 사진 주소"
 *      responses:
 *        "200":
 *          description: 회원 수정 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "회원 수정 완료."
 *        "400":
 *          description: 회원 수정 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "해당 회원을 찾을 수 없거나 데이터가 비어있음."
 *        "500":
 *          description: 회원 수정 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "회원 수정 실패."
 */
router.put("/:userNo", userController.user_update);

/**
 * @swagger
 * paths:
 *  /users/{userNo}:
 *    delete:
 *      summary: "회원 탈퇴"
 *      description: "delete 방식으로 회원 탈퇴"
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: userNo
 *          required: true
 *          description: 유저 회원 번호
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 회원 탈퇴 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "회원 탈퇴 완료"
 *
 *        "400":
 *          description: 회원 탈퇴 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "회원 탈퇴 실패"
 */
router.delete("/:userNo", userController.user_remove);

module.exports = router;
