
import { Router } from 'express';
import { validateLeague, validateIdLeague } from '../schemas/leagues.js';

export const leaguesRouter = Router();

/**
 * @route GET /leagues/
 * @desc Test leagues route
 * @access Public
 */
leaguesRouter.get('/', (req, res) => {
    const { current, year } = req.query;
    let { page, limit }     = req.query;

    if (!page) {
        page = 1;
    }

    if (!limit) {
        limit = 10;
    }

    if (current !== undefined) {
        res.status(200).json({"message": "Backoffice API is running - leagues endpoint - all leagues, current: " + current + ", page: " + page + ", limit: " + limit});
    } else if (year !== undefined) {
        res.status(200).json({"message": "Backoffice API is running - leagues endpoint - all leagues, year: " + year + ", page: " + page + ", limit: " + limit});
    } else {
        res.status(200).json({"message": "Backoffice API is running - leagues endpoint - leagues with no condition, page: " + page + ", limit: " + limit});
    }
});

/**
 * @route GET /leagues/:id
 * @desc Test leagues route with id parameter
 * @access Public
 */
leaguesRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const result = validateIdLeague(parseInt(id));

    if (result.error) {      
        return res.status(400).json({"message": "League id is required or invalid", "errors": JSON.parse(result.error)});
    }

    res.status(200).json({"message": "Backoffice API is running - leagues endpoint - test route id: " + id});
});

/** 
 * @route PUT /leagues/:id
 * @desc Test leagues update route with id parameter
 * @access Public
 */
leaguesRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const result = validateIdLeague(parseInt(id));

    if (result.error) {      
        return res.status(400).json({"message": "League id is required or invalid", "errors": JSON.parse(result.error)});
    }

    const resultLeague = validateLeague(req.body);
        
    if (resultleaguesRouter.error) {
        return res.status(400).json({"message": "Invalid league data", "errors": JSON.parse(resultleaguesRouter.error)});
    }

    res.status(200).json({"message": "Backoffice API is running - leagues endpoint - update league id: " + id});
});

/**
 * @route POST /leagues/
 * @desc Test leagues create route
 * @access Public
 */
leaguesRouter.post('/', (req, res) => {
    const result = validateLeague(req.body);
        
    if (result.error) {
        return res.status(400).json({"message": "Invalid league data", "errors": JSON.parse(result.error)});
    }
    
    res.status(200).json({"message": "Backoffice API is running - leagues endpoint - create league"});
});

/** 
 * @route DELETE /leagues/:id
 * @desc Test leagues delete route with id parameter
 * @access Public
 */
leaguesRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    const result = validateIdLeague(parseInt(id));

    if (result.error) {      
        return res.status(400).json({"message": "League id is required or invalid", "errors": JSON.parse(result.error)});
    }

    res.status(200).json({"message": "Backoffice API is running - leagues endpoint - delete league id: " + id});
})

/**
 * @route GET /leagues/:id/tournaments
 * @desc Test leagues tournaments route with id parameter
 * @access Public
 */
leaguesRouter.get('/:id/tournaments', (req, res) => {
    const { id } = req.params;
    const result = validateIdLeague(parseInt(id));

    if (result.error) {      
        return res.status(400).json({"message": "League id is required or invalid", "errors": JSON.parse(result.error)});
    }

    res.status(200).json({"message": "Backoffice API is running - leagues endpoint - tournaments for league id: " + id});
});