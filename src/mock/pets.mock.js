import { fakerES as faker } from "@faker-js/faker";
import { createHash } from "../common/utils/hashPassword.js";

export const generatePetsMocks = (amount) => {
  const pets = [];

  for (let i = 0; i < amount; i++) {
    const pet = {
      name: faker.person.firstName(),
      specie: faker.helpers.arrayElement(["Perro", "Gato", "Conejo", "Hamster", "Pájaro", "Carpincho", "Leon", "Tigre", "Serpiente", "Tortuga"]),
      birthDate: faker.date.past({ years: 5 }),
      image: faker.image.urlLoremFlickr({ category: "animals" }),
    };

    pets.push(pet);
  }

  return pets;
};