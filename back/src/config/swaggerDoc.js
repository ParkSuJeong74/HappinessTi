const swaggerUi = require("swagger-ui-express")
const swaggerJSDoc = require("swagger-jsdoc")

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Test API",
      version: "1.0.0",
      description: "Test API with express",
    },
    components: {
      securitySchemes: {
        Authorization: {
          type: "http",
          scheme: "Bearer",
          name: "Authorization",
          bearerFormat: "JWT",
          in: "header",
        },
      },
    },
  },
  swagger: "2.0",
  basePath: "/",
  apis: [__dirname + "/../routers/*.js", __dirname + "/../swagger/*"],
}

const specs = swaggerJSDoc(options)

module.exports = { swaggerUi, specs }
