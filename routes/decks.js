
import { Router } from 'express';
import { DeckController } from '../controllers/deck.js';

export const createDeckRouter = ({ deckModel }) => {
    const decksRouter    = Router();
    const deckController = new DeckController({ deckModel });

    /**
     * @route GET /decks/
     * @desc Test decks route
     * @access Public
     */
    decksRouter.get('/', deckController.getAllDecks);

    /**
     * @route GET /decks/num
     * @desc Test decks route
     * @access Public
     */
    decksRouter.get('/num', deckController.getNumDecks);

    /**
     * @route GET /decks/
     * @desc Test decks route
     * @access Public
     */
    decksRouter.get('/:id', deckController.getDeckById);

    /**
     * @route PUT /decks/:id
     * @desc Test decks update route with id parameter
     * @access Public
     */
    decksRouter.put('/:id', deckController.updateDeckById);

    /**
     * @route POST /decks/
     * @desc Test decks create route
     * @access Public
     */
    decksRouter.post('/', deckController.createDeck);

    /**
     * @route DELETE /decks/:id
     * @desc Test decks delete route with id parameter
     * @access Public
     */
    decksRouter.delete('/:id', deckController.deleteDeckById);

    return decksRouter;
}
