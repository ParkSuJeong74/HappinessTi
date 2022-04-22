const swaggerUi = require("swagger-ui-express")
const swaggerJSDoc = require("swagger-jsdoc")

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Test API",
      version: "1.0.0",
      description: "Test API with express",
    },
    servers: [
      {
        url: "localhost:5000",
      },
    ],
  },
  basePath: "/",
  apis: [__dirname + "/../routers/*.js", __dirname + "/../swagger/*"],
}

const specs = swaggerJSDoc(options)

module.exports = { swaggerUi, specs }
