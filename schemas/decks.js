import { z } from 'zod';

const DeckSchema = z.object({
    name     : z.string("Selection must be a valid name").min(3, "Name must be at least 3 characters long"),
    idPlayer : z.int().positive("Select a valid player").optional()
});

export const validateDeck = (object) => {
    return DeckSchema.safeParse(object);
}

export const validateDeckParcial = (input) => {
    return DeckSchema.partial().safeParse(input)
}