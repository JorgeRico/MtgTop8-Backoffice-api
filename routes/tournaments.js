
import { Router } from 'express';
import { TournamentController } from '../controllers/tournament.js';

export const createTournamentRouter = ({ tournamentModel }) => {
    const tournamentsRouter    = Router();
    const tournamentController = new TournamentController({ tournamentModel });

    /** 
     * @route GET /tournaments/
     * @desc Test tournaments route
     * @access Public
     */
    tournamentsRouter.get('/', tournamentController.getAllTournaments);

    /**
     * @route GET /tournaments/
     * @desc Test tournaments route
     * @access Public
     */
    tournamentsRouter.get('/:id', tournamentController.getTournamentById);

    /** 
     * @route POST /tournaments/        
     * @desc Test tournaments create route
     * @access Public
     */
    tournamentsRouter.post('/', tournamentController.createTournament);

    /**
     * @route PUT /tournaments/:id
     * @desc Test tournaments update route with id parameter
     * @access Public
     */
    tournamentsRouter.put('/:id', tournamentController.updateTournamentById);

    /** 
     * @route DELETE /tournaments/:id
     * @desc Test tournaments delete route with id parameter
     * @access Public
     */
    tournamentsRouter.delete('/:id', tournamentController.deleteTournamentById);

    /**
     * @route GET /tournaments/:id/players
     * @desc Test tournaments players route with id parameter
     * @access Public
     */
    tournamentsRouter.get('/:id/players', tournamentController.getPlayersByTournamentId);

    return tournamentsRouter
}
