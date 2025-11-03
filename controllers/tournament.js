import { validateTournament } from '../schemas/tournaments.js';
import { ErrorController } from './errors.js';
import { validateId } from '../schemas/utils.js';
import { UtilsController } from './utils.js';

export class TournamentController {
    constructor({ tournamentModel }) {
        this.tournamentModel = tournamentModel;
    }

    /**
     * Get all tournaments with pagination
     * @params req, res 
     * @returns data 
     */
    getAllTournaments = async (req, res) => {
        const limit = UtilsController.setLimit(req.query.limit);
        const page  = UtilsController.setPagination(req.query.page, limit);

        const resultTournamentModel = await this.tournamentModel.getAllTournaments({ page: parseInt(page), limit: parseInt(limit) });
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
    getTournamentById = async (req, res) => {
        const { id } = req.params;
        const result = validateId(parseInt(id));
        
        if (result.error) {      
            return res.status(400).json({"message": "Tournament id is required or invalid", "errors": JSON.parse(result.error)});
        }
    
        const resultTournamentModel = await this.tournamentModel.getTournamentById( { id: result.data})
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
    createTournament = async (req, res) => {
        const result = validateTournament(req.body);
        if (result.error) {
            return res.status(400).json(ErrorController.getErrorMessage("Tournament invalid values", result.error));
        }
        
        result.data.date = this.getDateConverted(result.data.date);

        const resultTournamentModel = await this.tournamentModel.createTournament({data: result.data});
        if (!resultTournamentModel || resultTournamentModel.data.length == 0) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(201).json(resultTournamentModel);
    }

    /**
     * Date conversion
     * Create Web date format (scrapped)
     */
    getDateConverted(value) {
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
    updateTournamentById = async (req, res) => {
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

        const resultTournamentModel = await this.tournamentModel.updateTournamentById({id: result.data, data: resultTournament.data});
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
    deleteTournamentById = async (req, res) => {
        const { id } = req.params;
        const result = validateId(parseInt(id));
        if (result.error) {      
            return res.status(400).json(ErrorController.getErrorMessage("Tournament id is required or invalid", result.error));
        }
    
        const resultTournamentModel = await this.tournamentModel.deleteTournamentById({ id: result.data });
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
    getPlayersByTournamentId = async (req, res) => {
        const { id } = req.params;
        const result = validateId(parseInt(id));
        if (result.error) {      
            return res.status(400).json(ErrorController.getErrorMessage("Tournament id is required or invalid", result.error));
        }
        
        const resultTournamentModel = await this.tournamentModel.getPlayersByTournamentId({ id: result.data });
        if (!resultTournamentModel || resultTournamentModel.data.length == 0) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(200).json(resultTournamentModel);
    }
}