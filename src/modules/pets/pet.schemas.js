import { z } from "zod";

export const petsMocksSchema = {
  params: z.object({
    amount: z.coerce
      .number({ invalid_type_error: "The value must be a number" })
      .int("The number must be an int")
      .positive("The number must be positive"),
  })
};

export const createPetSchema = {
  body: z.object({
    name: z.string(),
    specie: z.string(),
    birthDate: z.string(),
    image: z.string().optional()
  })
}

export const updatePetSchema = {
  params: z.object({
    id: z.string().regex(/^[a-fA-F0-9]{24}$/, "invalid ObjectId")
  }),
  body: z.object({
    name: z.string().optional(),
    specie: z.string().optional(),
    birthDate: z.string().optional(),
    image: z.string().optional()
  })
}