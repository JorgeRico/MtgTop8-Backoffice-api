
import { Router } from 'express';
import { validateTournament, validateIdTournament } from '../schemas/tournaments.js';

var tournament = Router();

/** 
 * @route GET /tournaments/
 * @desc Test tournaments route
 * @access Public
 */
tournament.get('/', (req, res) => {
    let { page, limit } = req.query;

    if (!page) {
        page = 1;
    }

    if (!limit) {
        limit = 10;
    }

    res.status(200).json({"message": "Backoffice API is running - tournament endpoint - tournaments with no condition, page: " + page + ", limit: " + limit});
});

/**
 * @route GET /tournaments/
 * @desc Test tournaments route
 * @access Public
 */
tournament.get('/:id', (req, res) => {
    const { id } = req.params;
    const result = validateIdTournament(parseInt(id));
    
    if (result.error) {      
        return res.status(400).json({"message": "Tournament id is required or invalid", "errors": JSON.parse(result.error)});
    }

    res.status(200).json({"message": "Backoffice API is running - tournaments endpoint id: " + id});
});

/** 
 * @route POST /tournaments/        
 * @desc Test tournaments create route
 * @access Public
 */
tournament.post('/', (req, res) => {
    const result = validateTournament(req.body);
    
    if (result.error) {
        return res.status(400).json({"message": "Invalid tournament data", "errors": JSON.parse(result.error)});
    }

    // {"name":"torneo chulo","players":51,"idLeague":1, "date": "2024-01-21"}
    // tournament date need to be converted to dd-mm-yy format
    res.status(200).json({"message": "Backoffice API is running - tournaments endpoint create"});
});

/**
 * @route PUT /tournaments/:id
 * @desc Test tournaments update route with id parameter
 * @access Public
 */
tournament.put('/:id', (req, res) => {
    const { id } = req.params;
    const result = validateIdTournament(parseInt(id));
    
    if (result.error) {      
        return res.status(400).json({"message": "Tournament id is required or invalid", "errors": JSON.parse(result.error)});
    }

    const resultTournament = validateTournament(req.body);
    
    if (resultTournament.error) {
        return res.status(400).json({"message": "Invalid tournament data", "errors": JSON.parse(resultTournament.error)});
    }

    // {"name":"torneo chulo","players":51,"idLeague":1, "date": "2024-01-21"}
    // tournament date need to be converted to dd-mm-yy format
    res.status(200).json({"message": "Backoffice API is running - tournaments endpoint update id: " + id});
});

/** 
 * @route DELETE /tournaments/:id
 * @desc Test tournaments delete route with id parameter
 * @access Public
 */
tournament.delete('/:id', (req, res) => {
    const { id } = req.params;
    const result = validateIdTournament(parseInt(id));
    
    if (result.error) {      
        return res.status(400).json({"message": "Tournament id is required or invalid", "errors": JSON.parse(result.error)});
    }   

    res.status(200).json({"message": "Backoffice API is running - tournaments endpoint delete id: " + id});
});

/**
 * @route GET /tournaments/:id/players
 * @desc Test tournaments players route with id parameter
 * @access Public
 */
tournament.get('/:id/players', (req, res) => {
    const { id } = req.params;
    const result = validateIdTournament(parseInt(id));
    
    if (result.error) {      
        return res.status(400).json({"message": "Tournament id is required or invalid", "errors": JSON.parse(result.error)});
    }
    
    res.status(200).json({"message" : " Backoffice API is running - tournaments endpoint - players for tournament id: " + id});
});

export default tournament;