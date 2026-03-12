import { z } from "zod";

const TournamentType = z.object({
    name         : z.string().min(3, "Tournament name must be at least 3 characters long"),
    date         : z.string(),
    idLeague     : z.int().positive(0, "Select a valid league"),
    players      : z.int().min(1).max(512).positive("Number of players must be a positive integer"),
    idTournament : z.int().optional()
});

export const validateTournament = (object) => {
    return TournamentType.safeParse(object);
}
