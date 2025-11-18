import { validatePlayer } from '../schemas/players.js';
import { validateId } from '../schemas/utils.js';
import { UtilsController } from './utils.js';
import { ErrorController } from './errors.js';

export class PlayerController {
    constructor ({ playerModel }) {
        this.playerModel = playerModel
    }

    /**
     * Get all players with pagination
     * @params req, res 
     * @returns data 
     */
    getAllPlayers = async (req, res) => {
        const page  = UtilsController.setPagination(req.query.page, req.query.limit);
        const limit = UtilsController.setLimit(req.query.page, req.query.limit);   

        const resultPlayerModel = await this.playerModel.getAllPlayers({ page: parseInt(page), limit: parseInt(limit) });
        if (!resultPlayerModel || resultPlayerModel.error) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(200).json(resultPlayerModel.data);
    }

    /**
     * Get player info
     * @params req,  res 
     * @returns data
     */
    getPlayerById = async (req, res) => {
        const { id } = req.params;
        const result = validateId(parseInt(id));
        
        if (result.error) {      
            return res.status(400).json({"message": "Player id is required or invalid", "errors": JSON.parse(result.error)});
        }
    
        const resultPlayerModel = await this.playerModel.getPlayerById( { id: result.data})
        if (!resultPlayerModel || resultPlayerModel.data.length == 0) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(200).json(resultPlayerModel.data);
    }

    /**
     * Get Player deck
     * @params req, res 
     * @returns 
     */
    getPlayerDeck = async (req, res) =>  {
        const { id } = req.params;
        const result = validateId(parseInt(id));
        
        if (result.error) {      
            return res.status(400).json({"message": "Player id is required or invalid", "errors": JSON.parse(result.error)});
        }
    
        const resultPlayerModel = await this.playerModel.getPlayerDeck( { id: result.data})
        if (!resultPlayerModel || resultPlayerModel.data.length == 0) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(200).json(resultPlayerModel.data);
    }

    /**
     * Update player info
     * @params req, res 
     * @returns 
     */
    updatePlayerById = async (req, res) => {
        const { id } = req.params;
        const result = validateId(parseInt(id));
        if (result.error) {      
            return res.status(400).json(ErrorController.getErrorMessage("Player id is required or invalid", result.error));
        }
    
        const resultPlayer = validatePlayer(req.body);
        if (resultPlayer.error) {
            return res.status(400).json(ErrorController.getErrorMessage("Player id is required or Player invalid values", result.error));
        }
    
        const resultPlayerModel = await this.playerModel.updatePlayerById({id: result.data, data: resultPlayer.data});
        if (!resultPlayerModel || resultPlayerModel.data.length == 0) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(200).json(resultPlayerModel);
    }

    /**
     * Create player
     * @params req, res 
     * @returns data 
     */
    createPlayer = async (req, res) =>  {
        const result = validatePlayer(req.body);
        if (result.error) {
            return res.status(400).json(ErrorController.getErrorMessage("Player invalid values", result.error));
        }
        
        const resultPlayerModel = await this.playerModel.createPlayer({data: result.data});
        if (!resultPlayerModel || resultPlayerModel.data.length == 0) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(201).json(resultPlayerModel);
    }

    /**
     * Delete player
     * @params req, res 
     * @returns data
     */
    deletePlayerById = async (req, res) =>  {
        const { id } = req.params;
        const result = validateId(parseInt(id));
        if (result.error) {      
            return res.status(400).json(ErrorController.getErrorMessage("Player id is required or invalid", result.error));
        }
    
        const resultPlayerModel = await this.playerModel.deletePlayerById({ id: result.data });
        if (!resultPlayerModel || resultPlayerModel.data.length == 0) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(204).json(resultPlayerModel);
    }

    /**
     * Get number of player items on db
     * @params  req, res 
     * @returns data
     */
    getNumPlayers = async (req, res) => {
        const resultPlayerModel = await this.playerModel.getNumPlayers();
        if (!resultPlayerModel || resultPlayerModel.error) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(200).json({count: resultPlayerModel.count});
    }
}