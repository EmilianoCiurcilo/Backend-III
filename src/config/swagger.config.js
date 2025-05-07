import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "Pets Adoption API Documentation",
      version: "1.0.0",
      description: "Pets Adoption API",
    },
  },
  apis: ["./src/docs/**/*.yaml"],
};

export const specs = swaggerJsDoc(swaggerOptions);
