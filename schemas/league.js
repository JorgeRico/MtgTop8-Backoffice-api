import { z } from 'zod';

const CardSchema = z.object({
    name    : z.string("Name must be a string").min(3, "Name must be at least 3 characters long"),
    year    : z.number().int().positive().min(2000, "Year must be a valid year"),
    current : z.boolean("Current must be a boolean"),
    active  : z.boolean("Active must be a boolean")
});

export const validateLeague = (object) => {
    return CardSchema.safeParse(object);
}

const CardIdSchema = z.number().int().positive("ID must be a positive integer");

export const validateIdLeague = (input) => {
    return CardIdSchema.safeParse(input);
}