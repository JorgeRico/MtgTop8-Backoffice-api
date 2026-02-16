import { z } from 'zod';

const LeagueSchema = z.object({
    name         : z.string("Name must be a string").min(3, "Name must be at least 3 characters long"),
    year         : z.coerce.number().min(2010, "Current must be greater than 2020"),
    current      : z.coerce.number().min(0, "Current must be 0 or 1").max(1, "Current must be 0 or 1"),
    active       : z.int().min(0, "Current must be 0 or 1").max(1, "Current must be 0 or 1"),
    location     : z.string().optional(),
    locationName : z.string().optional()
});

export const validateLeague = (input) => {
    return LeagueSchema.safeParse(input);
}

export const validateLeagueParcial = (input) => {
    return LeagueSchema.partial().safeParse(input)
}