
import { Router } from 'express';
import { PlayerController } from '../controllers/player.js';

export const createPlayerRouter = ({ playerModel }) => {
    const playersRouter    = Router();
    const playerController = new PlayerController({ playerModel });

    /**
     * @route GET /players/
     * @desc Test players route
     * @access Public
     */
    playersRouter.get('/', playerController.getAllPlayers);

    /**
     * @route GET /players/num
     * @desc Test players route
     * @access Public
     */
    playersRouter.get('/num', playerController.getNumPlayers);

    /** 
     * @route GET /players/:id
     * @desc Test players route with id parameter
     * @access Public
     */
    playersRouter.get('/:id', playerController.getPlayerById);

    /** 
     * @route GET /players/:id/decks
     * @desc Test players route with id parameter
     * @access Public
     */
    playersRouter.get('/:id/decks', playerController.getPlayerDeck);

    /**
     * @route PUT /players/:id
     * @desc Test players update route with id parameter
     * @access Public
     */
    playersRouter.put('/:id', playerController.updatePlayerById);

    /**
     * @route POST /players/
     * @desc Test players create route
     * @access Public
     */
    playersRouter.post('/', playerController.createPlayer);

    /**
     * @route DELETE /players/:id       
     * @desc Test players delete route with id parameter
     * @access Public
     */
    playersRouter.delete('/:id', playerController.deletePlayerById);

    return playersRouter;
}