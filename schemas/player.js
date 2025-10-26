import { z } from 'zod';

const CardSchema = z.object({
    name         : z.string("Name must be a string").min(3, "Name must be at least 3 characters long"),
    position     : z.int("Selection must be a valid position").positive("Position must be a positive integer").min(1, "Position must be at least 1"),
    idTournament : z.int().positive("Select a valid tournament"),
    idDeck       : z.int().positive("Select a valid deck")
});

export const validatePlayer = (object) => {
    return CardSchema.safeParse(object);
}