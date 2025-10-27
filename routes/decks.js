
import { Router } from 'express';
import { DeckController } from '../controllers/deck.js';

export const decksRouter = Router();

/**
 * @route GET /decks/
 * @desc Test decks route
 * @access Public
 */
decksRouter.get('/', DeckController.getAllDecks);

/**
 * @route GET /decks/
 * @desc Test decks route
 * @access Public
 */
decksRouter.get('/:id', DeckController.getDeckById);

/**
 * @route PUT /decks/:id
 * @desc Test decks update route with id parameter
 * @access Public
 */
decksRouter.put('/:id', DeckController.updateDeckById);

/**
 * @route POST /decks/
 * @desc Test decks create route
 * @access Public
 */
decksRouter.post('/', DeckController.createDeck);

/**
 * @route DELETE /decks/:id
 * @desc Test decks delete route with id parameter
 * @access Public
 */
decksRouter.delete('/:id', DeckController.deleteDeckById);