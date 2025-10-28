import { z } from 'zod';

const CardSchema = z.object({
    name     : z.string("Selection must be a valid name").min(3, "Name must be at least 3 characters long"),
    num      : z.int().positive("Select a valid card number"),
    idDeck   : z.int().positive("Select a valid deck"),
    board    : z.enum(["md", "sb"]),
    cardType : z.enum(['creature', 'planeswalker', 'instant', 'sorcery', 'enchantment', 'artifact', 'land']),
    imgUrl   : z.url("Select a valid image URL"),
});

export const validateCard = (object) => {
    return CardSchema.safeParse(object);
}