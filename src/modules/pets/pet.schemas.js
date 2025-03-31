import { z } from "zod";

export const petsMocksSchema = {
  params: z.object({
    amount: z.coerce
      .number({ invalid_type_error: "The value must be a number" })
      .int("The number must be a integer")
      .positive("The number must be a positive"),
  })
};