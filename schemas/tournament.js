import { z } from "zod";

const TournamentSchema = z.object({
    name     : z.string().min(3, "Tournament name must be at least 3 characters long"),
    date     : z.coerce.date("Invalid date format"),
    idLeague : z.int().positive("Select a valid league"),
    players  : z.int().min(1).max(512).positive("Number of players must be a positive integer"),
});


export const validateTournament = (object) => {
    return TournamentSchema.safeParse(object);
}

const CardIdSchema = z.number().int().positive("ID must be a positive integer");

export const validateIdTournament = (input) => {
    return CardIdSchema.safeParse(input);
}