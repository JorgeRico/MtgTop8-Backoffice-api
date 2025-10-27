
import { Router } from 'express';
import { validatePlayer, validateIdPlayer } from '../schemas/players.js';

export const playersRouter = Router();

/**
 * @route GET /players/
 * @desc Test players route
 * @access Public
 */
playersRouter.get('/', (req, res) => {
    let { page, limit } = req.query;

    if (!page) {
        page = 1;
    }

    if (!limit) {
        limit = 10;
    }

    res.status(200).json({"message": "Backoffice API is running - players endpoint - players with no condition, page: " + page + ", limit: " + limit});
});

/** 
 * @route GET /players/:id
 * @desc Test players route with id parameter
 * @access Public
 */
playersRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const result = validateIdPlayer(parseInt(id));
    
    if (result.error) {      
        return res.status(400).json({"message": "League id is required or invalid", "errors": JSON.parse(result.error)});
    }

    res.status(200).json({"message": "Backoffice API is running - players endpoint id: " + id});
});

/** 
 * @route GET /players/:id/decks
 * @desc Test players route with id parameter
 * @access Public
 */
playersRouter.get('/:id/decks', (req, res) => {
    const { id } = req.params;
    const result = validateIdPlayer(parseInt(id));
    
    if (result.error) {      
        return res.status(400).json({"message": "League id is required or invalid", "errors": JSON.parse(result.error)});
    }

    res.status(200).json({"message": "Backoffice API is running - player decks endpoint id: " + id});
});

/**
 * @route PUT /players/:id
 * @desc Test players update route with id parameter
 * @access Public
 */
playersRouter.put('/:id', (req, res)=> {
    const { id } = req.params;
    const result = validateIdPlayer(parseInt(id));
    
    if (result.error) {      
        return res.status(400).json({"message": "League id is required or invalid", "errors": JSON.parse(result.error)});
    }

    const resultPlayer = validatePlayer(req.body);
        
    if (resultplayersRouter.error) {
        return res.status(400).json({"message": "Invalid player data", "errors": JSON.parse(resultplayersRouter.error)});
    }

    res.status(200).json({"message": "Backoffice API is running - players endpoint update id: " + id});
});

/**
 * @route POST /players/
 * @desc Test players create route
 * @access Public
 */
playersRouter.post('/', (req, res) => {
    const result = validatePlayer(req.body);
        
    if (result.error) {
        return res.status(400).json({"message": "Invalid player data", "errors": JSON.parse(result.error)});
    }

    res.status(200).json({"message": "Backoffice API is running - players endpoint create"});
});

/**
 * @route DELETE /players/:id       
 * @desc Test players delete route with id parameter
 * @access Public
 */
playersRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    const result = validateIdPlayer(parseInt(id));
    
    if (result.error) {      
        return res.status(400).json({"message": "League id is required or invalid", "errors": JSON.parse(result.error)});
    }

    res.status(200).json({"message": "Backoffice API is running - players endpoint delete id: " + id});
});