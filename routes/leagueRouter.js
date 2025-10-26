
import { Router } from 'express';
import { validateLeague } from '../schemas/league.js';

var leagueRouter = Router();

/**
 * @route GET /leagues/
 * @desc Test leagues route
 * @access Public
 */
leagueRouter.get('/', (req, res) => {
    const { active } = req.query;
    let { page, limit } = req.query;

    if (!page) {
        page = 1;
    }

    if (!limit) {
        limit = 10;
    }

    if (active !== undefined) {
        res.status(200).json({"message": "Backoffice API is running - leagues endpoint - all leagues, active: " + active});
    } else {
        res.status(200).json({"message": "Backoffice API is running - leagues endpoint page: " + page + ", limit: " + limit});
    }
});

/**
 * @route GET /leagues/:id
 * @desc Test leagues route with id parameter
 * @access Public
 */
leagueRouter.get('/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {      
        return res.status(400).json({"message": "League id is required"});
    }

    res.status(200).json({"message": "Backoffice API is running - leagues endpoint - test route id: " + id});
});

/** 
 * @route PUT /leagues/:id
 * @desc Test leagues update route with id parameter
 * @access Public
 */
leagueRouter.put('/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({"message": "League id is required"});
    }

    const result = validateLeague(req.body);
        
    if (result.error) {
        return res.status(400).json({"message": "Invalid league data", "errors": result.errors});
    }

    res.status(200).json({"message": "Backoffice API is running - leagues endpoint - update league id: " + id});
});

/**
 * @route POST /leagues/
 * @desc Test leagues create route
 * @access Public
 */
leagueRouter.post('/', (req, res) => {
    const result = validateLeague(req.body);
        
    if (result.error) {
        return res.status(400).json({"message": "Invalid league data", "errors": result.errors});
    }
    
    res.status(200).json({"message": "Backoffice API is running - leagues endpoint - create league"});
});

/** 
 * @route DELETE /leagues/:id
 * @desc Test leagues delete route with id parameter
 * @access Public
 */
leagueRouter.delete(':id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({"message": "League id is required"});
    }

    req.status(200).json({"message": "Backoffice API is running - leagues endpoint - delete league id: " + id});
})

/**
 * @route GET /leagues/:id/tournaments
 * @desc Test leagues tournaments route with id parameter
 * @access Public
 */
leagueRouter.get(':id/tournaments', (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({"message": "League id is required"});
    }

    req.status(200).json({"message": "Backoffice API is running - leagues endpoint - tournaments for league id: " + id});
});

export default leagueRouter;