import { z } from 'zod';

const IdSchema = z.number().int().positive("ID must be a positive integer");

export const validateId = (input) => {
    return IdSchema.safeParse(input);
}
