import { validateLeague, validateLeagueParcial } from '../schemas/leagues.js';
import { validateId } from '../schemas/utils.js';
import { LeagueModel } from '../models/league.js';
import { ErrorController } from './errors.js';
import { UtilsController } from './utils.js';
export class LeagueController {
    /**
     * Get league by ID
     * @params req, res 
     * @returns data
     */
    static async getLeagueById(req, res) {
        const { id } = req.params;
        const result = validateId(parseInt(id));
        if (result.error) {      
            return res.status(400).json(ErrorController.getErrorMessage("League id is required or invalid", result.error));
        }
    
        const resultLeagueModel = await LeagueModel.getLeagueById({ id: result.data });
        if (!resultLeagueModel || resultLeagueModel.data.length == 0) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(200).json(resultLeagueModel.data);
    }

    /**
     * Update league by id
     * @params req, res 
     * @returns data 
     */
    static async updateLeagueById(req, res) {
        const { id } = req.params;
        const result = validateId(parseInt(id));
        if (result.error) {      
            return res.status(400).json(ErrorController.getErrorMessage("League id is required or invalid", result.error));
        }
    
        const resultLeague = validateLeague(req.body);
        if (resultLeague.error) {
            return res.status(400).json(ErrorController.getErrorMessage("League id is required or League invalid values", result.error));
        }
    
        const resultLeagueModel = await LeagueModel.updateLeagueById({id: result.data, data: resultLeague.data});
        if (!resultLeagueModel || resultLeagueModel.data.length == 0) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(200).json(resultLeagueModel);
    }

    /**
     * Create League
     * @params req, res 
     * @returns 
     */
    static async createLeague(req, res){
        const result = validateLeague(req.body);
        if (result.error) {
            return res.status(400).json(ErrorController.getErrorMessage("League invalid values", result.error));
        }
        
        const resultLeagueModel = await LeagueModel.createLeague({data: result.data});
        if (!resultLeagueModel || resultLeagueModel.data.length == 0) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(201).json(resultLeagueModel);
    }

    /**
     * Delete league by id
     * @params req, res 
     * @returns  
     */
    static async deleteLeagueById(req, res) {
        const { id } = req.params;
        const result = validateId(parseInt(id));
        if (result.error) {      
            return res.status(400).json(ErrorController.getErrorMessage("League id is required or invalid", result.error));
        }
    
        const resultLeagueModel = await LeagueModel.deleteLeagueById({ id: result.data });

        res.status(204).json(resultLeagueModel);
    }

    /**
     * Get Tournaments by idLeague
     * @params req, res 
     * @returns data
     */
    static async getTournamentsByLeagueId(req, res){
        const { id } = req.params;
        const result = validateId(parseInt(id));
        if (result.error) {      
            return res.status(400).json(ErrorController.getErrorMessage("League id is required or invalid", result.error));
        }

        const resultLeagueModel = await LeagueModel.getTournamentsByLeagueId({ id: result.data });
        if (!resultLeagueModel || resultLeagueModel.data.length == 0) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(200).json(resultLeagueModel.data);
    }

    /**
     * Get all leagues with pagination.
     * Optional filters: current, year
     * @params  req, res 
     * @returns data
     */
    static async getAllLeagues(req, res) {
        const data = validateLeagueParcial(req.query);
        if (data.error) {      
            return res.status(400).json(ErrorController.getErrorMessage("Invalid params", data.error));
        }

        const limit = UtilsController.setLimit(req.query.limit);
        const page  = UtilsController.setPagination(req.query.page, limit);

        const resultLeagueModel = await LeagueModel.getAllLeagues({ data: data, page: parseInt(page), limit: parseInt(limit) });
        if (!resultLeagueModel || resultLeagueModel.error) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(200).json(resultLeagueModel.data);
    }
}