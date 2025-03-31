import { z } from 'zod';

export const createAdoptionSchema = {
    body: z.object({
        owner: z.string().regex(/^[a-f\d]{24}$/i, {message: "invalid ObjectID"}),
        pet: z.string().regex(/^[a-f\d]{24}$/i, {message: "invalid ObjectID"}),
    }),
};

export const getAdoptionSchema = {
    params: z.object({
        id: z.string().regex(/^[a-f\d]{24}$/i, {message: "invalid ObjectID"}),
    }),
};