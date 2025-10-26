
import { Router } from 'express';
import { validatePlayer } from '../schemas/player.js';

var player = Router();

/** 
 * @route GET /players/:id
 * @desc Test players route with id parameter
 * @access Public
 */
player.get('/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({"message": "Player id is required"});
    }

    res.status(200).json({"message": "Backoffice API is running - players endpoint id: " + id});
});

/**
 * @route PUT /players/:id
 * @desc Test players update route with id parameter
 * @access Public
 */
player.put('/:id', (req, res)=> {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({"message": "Player id is required"});
    }

    const result = validatePlayer(req.body);
        
    if (result.error) {
        return res.status(400).json({"message": "Invalid player data", "errors": result.errors});
    }

    res.status(200).json({"message": "Backoffice API is running - players endpoint update id: " + id});
});

/**
 * @route POST /players/
 * @desc Test players create route
 * @access Public
 */
player.post('/', (req, res) => {
    const result = validatePlayer(req.body);
        
    if (result.error) {
        return res.status(400).json({"message": "Invalid player data", "errors": result.errors});
    }

    res.status(200).json({"message": "Backoffice API is running - players endpoint create"});
});

/**
 * @route DELETE /players/:id       
 * @desc Test players delete route with id parameter
 * @access Public
 */
player.delete('/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {          
        return res.status(400).json({"message": "Player id is required"});
    }

    res.status(200).json({"message": "Backoffice API is running - players endpoint delete id: " + id});
});

export default player;