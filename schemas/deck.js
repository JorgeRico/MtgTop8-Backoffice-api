import { z } from 'zod';

const DeckSchema = z.object({
    name     : z.string("Selection must be a valid name").min(3, "Name must be at least 3 characters long"),
    idPlayer : z.int().positive("Select a valid player"),
});

export const validateDeck = (object) => {
    return DeckSchema.safeParse(object);
}
