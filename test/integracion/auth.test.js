import { expect } from "chai";
import supertest from "supertest";
import { isValidPassword } from "../../src/common/utils/hashPassword.js";

const request = supertest("http://localhost:8080");

describe("Test Auth Integration Module", () => {
  let userTest;

  it("[POST] /api/auth/register - Register User", async () => {
    const newUser = {
      first_name: "Juan2",
      last_name: "Perez2",
      email: "jp@gmail2.com",
      password: "123456",
    };

    const { status, body, error } = await request.post("/api/auth/register").send(newUser);
    const checkPassword = isValidPassword(body, newUser.password);
    userTest = body;

    expect(status).to.be.equal(201);
    expect(body.first_name).to.be.equal("Juan2");
    expect(body.last_name).to.be.equal("Perez2");
    expect(body.email).to.be.equal("jp@gmail2.com");
    expect(body.password).to.not.be.equal("123456");
    expect(body).to.be.an("object");
  });

  it("[POST] /api/auth/login - Logging User", async () => {
    const data = {
      email: "jp@gmail.com",
      password: "123456",
    };

    const { status, body, error } = await request.post("/api/auth/login").send(data);
    const { user } = body;
    expect(status).to.be.equal(200);
    expect(user.first_name).to.be.equal("Juan");
    expect(user.last_name).to.be.equal("Perez");
    expect(user.email).to.be.equal("jp@gmail.com");
    expect(user.password).to.not.be.equal("123456");
    expect(body.token).to.be.an("string");
  });

  after(async () => {
    try {

      await request.delete(`/api/users/${userTest._id}`);
    } catch (error) {
      console.log(error);
    }

  });
});