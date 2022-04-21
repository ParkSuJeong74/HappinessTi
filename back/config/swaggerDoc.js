const swaggerUi = require("swagger-ui-express")
const swaggerJSDoc = require("swagger-jsdoc")

const options = {
  swaggerDefinition: {
    info: {
      title: "Test API",
      version: "1.0.0",
      description: "Test API with express",
    },
    host: "localhost:5000",
    basePath: "/",
  },
  apis: ["../src/routers/*.js", "../src/swagger/*"],
}

const specs = swaggerJSDoc(options)

module.exports = { swaggerUi, specs }
