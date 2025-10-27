
import { Router } from 'express';
import { PlayerController } from '../controllers/player.js';

export const playersRouter = Router();

/**
 * @route GET /players/
 * @desc Test players route
 * @access Public
 */
playersRouter.get('/', PlayerController.getPlayerById);

/** 
 * @route GET /players/:id
 * @desc Test players route with id parameter
 * @access Public
 */
playersRouter.get('/:id', PlayerController.getPlayerDetailsById);

/** 
 * @route GET /players/:id/decks
 * @desc Test players route with id parameter
 * @access Public
 */
playersRouter.get('/:id/decks', PlayerController.getPlayerDecksById);

/**
 * @route PUT /players/:id
 * @desc Test players update route with id parameter
 * @access Public
 */
playersRouter.put('/:id', PlayerController.updatePlayerById);

/**
 * @route POST /players/
 * @desc Test players create route
 * @access Public
 */
playersRouter.post('/', PlayerController.createPlayer);

/**
 * @route DELETE /players/:id       
 * @desc Test players delete route with id parameter
 * @access Public
 */
playersRouter.delete('/:id', PlayerController.deletePlayerById);