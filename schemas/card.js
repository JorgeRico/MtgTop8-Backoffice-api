import { z } from 'zod';

const CardSchema = z.object({
    name     : z.string("Selection must be a valid name").min(3, "Name must be at least 3 characters long"),
    num      : z.int().positive("Select a valid card number"),
    idDeck   : z.int().positive("Select a valid deck"),
    board    : z.string("Board must be a string").min(2, "Board must be at least 2 character long"),
    cardType : z.string("Select a valid card type").min(3, "Card type must be at least 3 characters long"),
    imgUrl   : z.url("Select a valid image URL"),
});

export const validateCard = (object) => {
    return CardSchema.safeParse(object);
}