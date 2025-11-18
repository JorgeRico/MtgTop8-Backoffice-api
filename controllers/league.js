import { validateLeague, validateLeagueParcial } from '../schemas/leagues.js';
import { validateId } from '../schemas/utils.js';
import { ErrorController } from './errors.js';
import { UtilsController } from './utils.js';
export class LeagueController {
    constructor({ leagueModel }) {
        this.leagueModel = leagueModel;
    }
    
    /**
     * Get league by ID
     * @params req, res 
     * @returns data
     */
    getLeagueById = async (req, res) => {
        const { id } = req.params;
        const result = validateId(parseInt(id));
        if (result.error) {      
            return res.status(400).json(ErrorController.getErrorMessage("League id is required or invalid", result.error));
        }
    
        const resultLeagueModel = await this.leagueModel.getLeagueById({ id: result.data });
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
    updateLeagueById = async (req, res) => {
        const { id } = req.params;
        const result = validateId(parseInt(id));
        if (result.error) {      
            return res.status(400).json(ErrorController.getErrorMessage("League id is required or invalid", result.error));
        }
    
        const resultLeague = validateLeague(req.body);
        if (resultLeague.error) {
            return res.status(400).json(ErrorController.getErrorMessage("League id is required or League invalid values", result.error));
        }
    
        const resultLeagueModel = await this.leagueModel.updateLeagueById({id: result.data, data: resultLeague.data});
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
    createLeague = async (req, res) =>{
        const result = validateLeague(req.body);
        if (result.error) {
            return res.status(400).json(ErrorController.getErrorMessage("League invalid values", result.error));
        }
        
        const resultLeagueModel = await this.leagueModel.createLeague({data: result.data});
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
    deleteLeagueById = async (req, res) => {
        const { id } = req.params;
        const result = validateId(parseInt(id));
        if (result.error) {      
            return res.status(400).json(ErrorController.getErrorMessage("League id is required or invalid", result.error));
        }
    
        const resultLeagueModel = await this.leagueModel.deleteLeagueById({ id: result.data });

        res.status(204).json(resultLeagueModel);
    }

    /**
     * Get Tournaments by idLeague
     * @params req, res 
     * @returns data
     */
    getTournamentsByLeagueId = async (req, res) =>{
        const { id } = req.params;
        const result = validateId(parseInt(id));
        if (result.error) {      
            return res.status(400).json(ErrorController.getErrorMessage("League id is required or invalid", result.error));
        }

        const resultLeagueModel = await this.leagueModel.getTournamentsByLeagueId({ id: result.data });
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
    getAllLeagues = async (req, res) => {
        const data = validateLeagueParcial(req.query);
        if (data.error) {      
            return res.status(400).json(ErrorController.getErrorMessage("Invalid params", data.error));
        }

        const page  = UtilsController.setPagination(req.query.page, req.query.limit);
        const limit = UtilsController.setLimit(req.query.page, req.query.limit);   

        const resultLeagueModel = await this.leagueModel.getAllLeagues({ data: data, page: parseInt(page), limit: parseInt(limit) });
        if (!resultLeagueModel || resultLeagueModel.error) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(200).json(resultLeagueModel.data);
    }

    /**
     * Get number of league items on db
     * @params  req, res 
     * @returns data
     */
    getNumLeagues = async (req, res) => {
        const resultLeagueModel = await this.leagueModel.getNumLeagues();
        if (!resultLeagueModel || resultLeagueModel.error) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(200).json({count: resultLeagueModel.count});
    }
}