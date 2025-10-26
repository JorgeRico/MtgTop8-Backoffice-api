
import { Router } from 'express';
import { validateTournament } from '../schemas/tournament.js';

var tournamentRouter = Router();

/**
 * @route GET /tournaments/
 * @desc Test tournaments route
 * @access Public
 */
tournamentRouter.get('/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({"message": "Tournament id is required"});
    }

    res.status(200).json({"message": "Backoffice API is running - tournaments endpoint id: " + id});
});

/** 
 * @route POST /tournaments/        
 * @desc Test tournaments create route
 * @access Public
 */
tournamentRouter.post('/', (req, res) => {
    const result = validateTournament(req.body);
    
    if (result.error) {
        return res.status(400).json({"message": "Invalid tournament data", "errors": result.errors});
    }

    res.status(200).json({"message": "Backoffice API is running - tournaments endpoint create"});
});

/**
 * @route PUT /tournaments/:id
 * @desc Test tournaments update route with id parameter
 * @access Public
 */
tournamentRouter.put(':id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({"message": "Tournament id is required"});
    }

    const result = validateTournament(req.body);
    
    if (result.error) {
        return res.status(400).json({"message": "Invalid tournament data", "errors": result.errors});
    }

    res.status(200).json({"message": "Backoffice API is running - tournaments endpoint update id: " + id});
});

/** 
 * @route DELETE /tournaments/:id
 * @desc Test tournaments delete route with id parameter
 * @access Public
 */
tournamentRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({"message": "Tournament id is required"});
    }   

    res.status(200).json({"message": "Backoffice API is running - tournaments endpoint delete id: " + id});
});

/**
 * @route GET /tournaments/:id/players
 * @desc Test tournaments players route with id parameter
 * @access Public
 */
tournamentRouter.get('/:id/players', (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({"message": "Tournament id is required"});
    }
    
    res.status(200).json({"message" : " Backoffice API is running - tournaments endpoint - players for tournament id: " + id});
});

export default tournamentRouter;