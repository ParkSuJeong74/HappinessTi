import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
const __dirname = path.resolve();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CrashingDev team API Docs",
      version: "1.0.0",
      description: "Elice 4th 14team crashing dev",
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
  basePath: "localhost:5005/",
  apis: [__dirname + "/src/routers/*.js", __dirname + "/src/swagger/*"],
};

export const specs = swaggerJSDoc(options);
