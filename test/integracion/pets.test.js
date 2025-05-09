import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8080");

describe("Test Pet Integration Module", () => {
  let petTest;

  it("[POST] /api/pets - Create Pet", async () => {
    const newPet = {
      name: "Carlitos",
      specie: "Oso",
      birthDate: "10-12-2021",
    };

    const { status, body, error } = await request.post("/api/pets").send(newPet);
    petTest = body;

    expect(status).to.be.equal(201);
    expect(body).to.have.property("_id");
    expect(body).to.have.property("name");
    expect(body).to.have.property("specie");
    expect(body).to.have.property("birthDate");
    expect(body.name).to.be.equal("Carlitos");
    expect(body.specie).to.be.equal("Oso");
    expect(body.birthDate).to.be.equal("2021-10-12T03:00:00.000Z");
  });

  it("[PUT] /api/pets/:id - Update one Pet", async () => {
    const data = {
      name: "Felix",
      specie: "Perro",
    };

    const { status, body, error } = await request.put(`/api/pets/${petTest._id}`).send(data);
    petTest = body;

    expect(status).to.be.equal(200);
    expect(body).to.have.property("_id");
    expect(body).to.have.property("name");
    expect(body).to.have.property("specie");
    expect(body.name).to.be.equal("Felix");
    expect(body.specie).to.not.be.equal("Oso");
    expect(body.specie).to.be.equal("Perro");
    expect(body.birthDate).to.be.equal("2021-10-12T03:00:00.000Z");
  });

  it("[GET] /api/pets/:id - Get one Pet", async () => {

    const { status, body, error } = await request.get(`/api/pets/${petTest._id}`);
    petTest = body;

    expect(status).to.be.equal(200);
    expect(body).to.have.property("_id");
    expect(body).to.have.property("name");
    expect(body).to.have.property("specie");
    expect(body.name).to.be.equal("Felix");
    expect(body.specie).to.not.be.equal("Gato");
    expect(body.specie).to.be.equal("Perro");
    expect(body.birthDate).to.be.equal("2021-10-12T03:00:00.000Z");
  });

  after(async () => {
    try {
      await request.delete(`/api/pets/${petTest._id}`);
    } catch (error) {
      console.log(error);
    }
  });
});