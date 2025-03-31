import { z } from "zod";

export const loginSchema = {
  body: z.object(
    {
      email: z.string().email("Invalid email"),
      password: z.string().min(6, "password must be at least 6 characters"),
    }
  )
}

export const registerSchema = {
  body: z.object({
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "password must be at least 6 characters"),
    role: z.enum(["admin", "user"]).optional()
  })
}