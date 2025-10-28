
import { Router } from 'express';
import { LeagueController } from '../controllers/league.js';

export const createLeagueRouter = ({ leagueModel }) => {
    const leaguesRouter    = Router();
    const leagueController = new LeagueController({ leagueModel });

    /**
     * @route GET /leagues/
     * @desc Test leagues route
     * @access Public
     */
    leaguesRouter.get('/', leagueController.getAllLeagues);

    /**
     * @route GET /leagues/:id
     * @desc Test leagues route with id parameter
     * @access Public
     */
    leaguesRouter.get('/:id', leagueController.getLeagueById);

    /** 
     * @route PUT /leagues/:id
     * @desc Test leagues update route with id parameter
     * @access Public
     */
    leaguesRouter.put('/:id', leagueController.updateLeagueById);

    /**
     * @route POST /leagues/
     * @desc Test leagues create route
     * @access Public
     */
    leaguesRouter.post('/', leagueController.createLeague);

    /** 
     * @route DELETE /leagues/:id
     * @desc Test leagues delete route with id parameter
     * @access Public
     */
    leaguesRouter.delete('/:id', leagueController.deleteLeagueById);

    /**
     * @route GET /leagues/:id/tournaments
     * @desc Test leagues tournaments route with id parameter
     * @access Public
     */
    leaguesRouter.get('/:id/tournaments', leagueController.getTournamentsByLeagueId);

    return leaguesRouter;
}
