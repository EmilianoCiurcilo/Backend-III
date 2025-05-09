import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8080");

describe("Test Adoption Integration Module", () => {
  let adoptionTest;

  it("[POST] /api/adoptions - Create Adoption", async () => {
      const newAdoption = {
          owner: "67ea8eb96bbafdc7e0451f9a",
          pet: "67ea8cc36bbafdc7e0451f31",
      };

      const { status, body } = await request.post("/api/adoptions").send(newAdoption);
      adoptionTest = body;

      expect(status).to.be.equal(201);
      expect(body).to.have.property("_id");
      expect(body.owner).to.be.equal("67ea8eb96bbafdc7e0451f9a");
      expect(body.pet).to.be.equal("67ea8cc36bbafdc7e0451f31");
      expect(body).to.be.an("object");
  });

  it("[GET] /api/adoptions/:id - Get one Adoption", async () => {
      const { status, body } = await request.get(`/api/adoptions/${adoptionTest._id}`);
      adoptionTest = body;

      expect(status).to.be.equal(200);
      expect(body).to.have.property("owner");
      expect(body).to.have.property("pet");
      expect(body).to.be.an("object");
  });

  it("[GET] /api/adoptions - Get all Adoptions", async () => {
      const { status, body } = await request.get("/api/adoptions");
      adoptionTest = body;

      expect(status).to.be.equal(200);
      expect(body).to.be.an("array");
  });

  after(async () => {
    try {
      await request.delete(`/api/adoptions/${adoptionTest._id}`);
    } catch (error) {
      console.log(error);
    }
  });
});