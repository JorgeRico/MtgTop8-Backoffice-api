
import { Router } from 'express';
import { validateDeck } from '../schemas/deck.js';

var deckRouter = Router();

/**
 * @route GET /decks/
 * @desc Test decks route
 * @access Public
 */
deckRouter.get('/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({"message": "Deck id is required"});
    }

    res.status(200).json({"message": "Backoffice API is running - decks endpoint id: " + id});
});

/**
 * @route PUT /decks/:id
 * @desc Test decks update route with id parameter
 * @access Public
 */
deckRouter.put('/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({"message": "Deck id is required"});
    }

    const result = validateDeck(req.body);
        
    if (result.error) {
        return res.status(400).json({"message": "Invalid deck data", "errors": result.errors});
    }

    req.status(200).json({"message": "Backoffice API is running - decks endpoint update id: " + id});
});

/**
 * @route POST /decks/
 * @desc Test decks create route
 * @access Public
 */
deckRouter.post('/', (req, res) => {
    const result = validateDeck(req.body);
        
    if (result.error) {
        return res.status(400).json({"message": "Invalid deck data", "errors": result.errors});
    }

    req.status(200).json({"message": "Backoffice API is running - decks endpoint create"});
});

/**
 * @route DELETE /decks/:id
 * @desc Test decks delete route with id parameter
 * @access Public
 */
deckRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({"message": "Deck id is required"});
    }

    req.status(200).json({"message": "Backoffice API is running - decks endpoint delete id: " + id});
});

export default deckRouter;