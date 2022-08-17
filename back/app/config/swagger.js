const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "아이 링크 API",
      description: "아이 링크 RestFul API 목록",
    },
    servers: [
      {
        url: "https://i7e102.p.ssafy.io:8000",
      },
      {
        url: "https://localhost:8000",
      },
    ],
    components: {
      securitySchemes: {
        Authorization: {
          type: "http",
          in: "header",
          name: "Authorization",
          scheme: "bearer",
        },
      },
    },
    security: [
      {
        Authorization: [],
      },
    ],
  },
  apis: ["./routes/*.js"], //Swagger 파일 연동
};
const specs = swaggereJsdoc(options);

const swaggerUiOptions = {
  explorer: true,
};

module.exports = { swaggerUi, specs, swaggerUiOptions };
