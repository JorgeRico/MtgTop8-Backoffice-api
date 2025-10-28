import { validateTournament } from '../schemas/tournaments.js';
import { TournamentModel } from '../models/tournament.js';
import { ErrorController } from './errors.js';
import { validateId } from '../schemas/utils.js';
import { UtilsController } from './utils.js';

export class TournamentController {
    /**
     * Get all tournaments with pagination
     * @params req, res 
     * @returns data 
     */
    static async getAllTournaments(req, res) {
        const limit = UtilsController.setLimit(req.query.limit);
        const page  = UtilsController.setPagination(req.query.page, limit);

        const resultTournamentModel = await TournamentModel.getAllTournaments({ page: parseInt(page), limit: parseInt(limit) });
        if (!resultTournamentModel || resultTournamentModel.error) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(200).json(resultTournamentModel.data);
    }

    /**
     * Get Tournament by id
     * @params req, res 
     * @returns 
     */
    static async getTournamentById(req, res) {
        const { id } = req.params;
        const result = validateId(parseInt(id));
        
        if (result.error) {      
            return res.status(400).json({"message": "Tournament id is required or invalid", "errors": JSON.parse(result.error)});
        }
    
        const resultTournamentModel = await TournamentModel.getTournamentById( { id: result.data})
        if (!resultTournamentModel || resultTournamentModel.data.length == 0) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(200).json(resultTournamentModel.data);
    }

    /**
     * Create tournament
     * @params req, res 
     * @returns data 
     */
    static async createTournament(req, res) {
        const result = validateTournament(req.body);
        if (result.error) {
            return res.status(400).json(ErrorController.getErrorMessage("Tournament invalid values", result.error));
        }
        
        result.data.date = await TournamentController.getDateConverted(result.data.date);

        const resultTournamentModel = await TournamentModel.createTournament({data: result.data});
        if (!resultTournamentModel || resultTournamentModel.data.length == 0) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(201).json(resultTournamentModel);
    }

    /**
     * Date conversion
     * Create Web date format (scrapped)
     */
    static async getDateConverted(value) {
        let dateValue   = value.toLocaleDateString('es-ES')
        let splitValues = dateValue.split('/');

        let day         = splitValues[0];
        let month       = splitValues[1]
        let year        = splitValues[2].substr(splitValues[2].length - 2)

        return day + '/' + month + '/' + year;
    }

    /**
     * Update tournament by id
     * @params req, res 
     * @returns 
     */
    static async updateTournamentById(req, res) {
        const { id } = req.params;
        const result = validateId(parseInt(id));
        if (result.error) {      
            return res.status(400).json(ErrorController.getErrorMessage("Tournament id is required or invalid", result.error));
        }
    
        const resultTournament = validateTournament(req.body);
        if (resultTournament.error) {
            return res.status(400).json(ErrorController.getErrorMessage("Tournament id is required or Tournament invalid values", result.error));
        }
    
        resultTournament.data.date = await TournamentController.getDateConverted(resultTournament.data.date);

        const resultTournamentModel = await TournamentModel.updateTournamentById({id: result.data, data: resultTournament.data});
        if (!resultTournamentModel || resultTournamentModel.data.length == 0) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(200).json(resultTournamentModel);
    }

    /**
     * Delete tournament by id
     * @params req, res 
     * @returns 
     */
    static async deleteTournamentById(req, res) {
        const { id } = req.params;
        const result = validateId(parseInt(id));
        if (result.error) {      
            return res.status(400).json(ErrorController.getErrorMessage("Tournament id is required or invalid", result.error));
        }
    
        const resultTournamentModel = await TournamentModel.deleteTournamentById({ id: result.data });
        if (!resultTournamentModel || resultTournamentModel.data.length == 0) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(204).json(resultTournamentModel);
    }

    /**
     * Get players from tournament
     * @params req,  res 
     * @returns 
     */
    static async getPlayersByTournamentId(req, res) {
        const { id } = req.params;
        const result = validateId(parseInt(id));
        if (result.error) {      
            return res.status(400).json(ErrorController.getErrorMessage("Tournament id is required or invalid", result.error));
        }
        
        const resultTournamentModel = await TournamentModel.getPlayersByTournamentId({ id: result.data });
        if (!resultTournamentModel || resultTournamentModel.data.length == 0) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(200).json(resultTournamentModel);
    }
}