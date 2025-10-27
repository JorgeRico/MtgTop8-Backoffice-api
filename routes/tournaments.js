
import { Router } from 'express';
import { TournamentController } from '../controllers/tournament.js';

export const tournamentsRouter = Router();

/** 
 * @route GET /tournaments/
 * @desc Test tournaments route
 * @access Public
 */
tournamentsRouter.get('/', TournamentController.getAllTournaments);

/**
 * @route GET /tournaments/
 * @desc Test tournaments route
 * @access Public
 */
tournamentsRouter.get('/:id', TournamentController.getTournamentById);

/** 
 * @route POST /tournaments/        
 * @desc Test tournaments create route
 * @access Public
 */
tournamentsRouter.post('/', TournamentController.createTournament);

/**
 * @route PUT /tournaments/:id
 * @desc Test tournaments update route with id parameter
 * @access Public
 */
tournamentsRouter.put('/:id', TournamentController.updateTournamentById);

/** 
 * @route DELETE /tournaments/:id
 * @desc Test tournaments delete route with id parameter
 * @access Public
 */
tournamentsRouter.delete('/:id', TournamentController.deleteTournamentById);

/**
 * @route GET /tournaments/:id/players
 * @desc Test tournaments players route with id parameter
 * @access Public
 */
tournamentsRouter.get('/:id/players', TournamentController.getPlayersByTournamentId);
