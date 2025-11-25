import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie API Document",
      version: "1.0.0",
      description: "Prisma + Express Movie API Docs",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },

  // Swagger가 읽을 파일
  apis: ["./src/routes/*.js", "./src/docs/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
