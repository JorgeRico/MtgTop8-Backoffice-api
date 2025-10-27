
import { Router } from 'express';
import { validateDeck, validateIdDeck } from '../schemas/decks.js';

var deck = Router();

/**
 * @route GET /decks/
 * @desc Test decks route
 * @access Public
 */
deck.get('/', (req, res) => {
    let { page, limit } = req.query;

    if (!page) {
        page = 1;
    }

    if (!limit) {
        limit = 10;
    }

    res.status(200).json({"message": "Backoffice API is running - decks endpoint - decks with no condition, page: " + page + ", limit: " + limit});
});

/**
 * @route GET /decks/
 * @desc Test decks route
 * @access Public
 */
deck.get('/:id', (req, res) => {
    const { id } = req.params;
    const result = validateIdDeck(parseInt(id));
    
    if (result.error) {      
        return res.status(400).json({"message": "Tournament id is required or invalid", "errors": JSON.parse(result.error)});
    }

    res.status(200).json({"message": "Backoffice API is running - decks endpoint id: " + id});
});

/**
 * @route PUT /decks/:id
 * @desc Test decks update route with id parameter
 * @access Public
 */
deck.put('/:id', (req, res) => {
    const { id } = req.params;
    const result = validateIdDeck(parseInt(id));
    
    if (result.error) {      
        return res.status(400).json({"message": "Tournament id is required or invalid", "errors": JSON.parse(result.error)});
    }

    const resultDeck = validateDeck(req.body);
        
    if (resultDeck.error) {
        return res.status(400).json({"message": "Invalid deck data", "errors": JSON.parse(resultDeck.error)});
    }

    res.status(200).json({"message": "Backoffice API is running - decks endpoint update id: " + id});
});

/**
 * @route POST /decks/
 * @desc Test decks create route
 * @access Public
 */
deck.post('/', (req, res) => {
    const result = validateDeck(req.body);
        
    if (result.error) {
        return res.status(400).json({"message": "Invalid deck data", "errors": JSON.parse(result.error)});
    }

    res.status(200).json({"message": "Backoffice API is running - decks endpoint create"});
});

/**
 * @route DELETE /decks/:id
 * @desc Test decks delete route with id parameter
 * @access Public
 */
deck.delete('/:id', (req, res) => {
    const { id } = req.params;
    const result = validateIdDeck(parseInt(id));
    
    if (result.error) {      
        return res.status(400).json({"message": "Tournament id is required or invalid", "errors": JSON.parse(result.error)});
    }

    res.status(200).json({"message": "Backoffice API is running - decks endpoint delete id: " + id});
});

export default deck;