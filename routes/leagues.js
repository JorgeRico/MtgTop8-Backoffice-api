
import { Router } from 'express';
import { LeagueController } from '../controllers/league.js';

export const leaguesRouter = Router();

/**
 * @route GET /leagues/
 * @desc Test leagues route
 * @access Public
 */
leaguesRouter.get('/', LeagueController.getAllLeagues);

/**
 * @route GET /leagues/:id
 * @desc Test leagues route with id parameter
 * @access Public
 */
leaguesRouter.get('/:id', LeagueController.getLeagueById);

/** 
 * @route PUT /leagues/:id
 * @desc Test leagues update route with id parameter
 * @access Public
 */
leaguesRouter.put('/:id', LeagueController.updateLeagueById);

/**
 * @route POST /leagues/
 * @desc Test leagues create route
 * @access Public
 */
leaguesRouter.post('/', LeagueController.createLeague);

/** 
 * @route DELETE /leagues/:id
 * @desc Test leagues delete route with id parameter
 * @access Public
 */
leaguesRouter.delete('/:id', LeagueController.deleteLeagueById);

/**
 * @route GET /leagues/:id/tournaments
 * @desc Test leagues tournaments route with id parameter
 * @access Public
 */
leaguesRouter.get('/:id/tournaments', LeagueController.getTournamentsByLeagueId);