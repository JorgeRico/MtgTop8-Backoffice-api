import { validateLeague, validateIdLeague } from '../schemas/leagues.js';
import { LeagueModel } from '../models/league.js';

export class LeagueController {
    static async getLeagueById(req, res) {
        const { id } = req.params;
        const result = validateIdLeague(parseInt(id));
    
        if (result.error) {      
            return res.status(400).json({"message": "League id is required or invalid", "errors": JSON.parse(result.error)});
        }
    
        // TODO: Fetch card from database using LeagueModel
        const resultLeagueModel = await LeagueModel.getLeagueById({ id: result.data });

        // For now, just return a success message
        res.status(200).json({"message": "Backoffice API is running - leagues endpoint - test route id: " + result.data});
    }

    static async updateLeagueById(req, res) {
        const { id } = req.params;
        const result = validateIdLeague(parseInt(id));
    
        if (result.error) {      
            return res.status(400).json({"message": "League id is required or invalid", "errors": JSON.parse(result.error)});
        }
    
        const resultLeague = validateLeague(req.body);
            
        if (resultLeague.error) {
            return res.status(400).json({"message": "Invalid league data", "errors": JSON.parse(resultLeague.error)});
        }
    
        // TODO: Fetch card from database using LeagueModel
        const resultLeagueModel = await LeagueModel.updateLeagueById({id: result.data, data: resultLeague.data});

        // For now, just return a success message
        res.status(200).json({"message": "Backoffice API is running - leagues endpoint - update league id: " + result.data});
    }

    static async createLeague(req, res){
        const result = validateLeague(req.body);
            
        if (result.error) {
            return res.status(400).json({"message": "Invalid league data", "errors": JSON.parse(result.error)});
        }
        
        // TODO: Fetch card from database using LeagueModel
        const resultLeagueModel = await LeagueModel.createLeague({data: result.data});

        // For now, just return a success message
        res.status(200).json({"message": "Backoffice API is running - leagues endpoint - create league"});
    }

    static async deleteLeagueById(req, res) {
        const { id } = req.params;
        const result = validateIdLeague(parseInt(id));
    
        if (result.error) {      
            return res.status(400).json({"message": "League id is required or invalid", "errors": JSON.parse(result.error)});
        }
    
        // TODO: Fetch card from database using LeagueModel
        const resultLeagueModel = await LeagueModel.deleteLeagueById({ id: result.data });

        // For now, just return a success message
        res.status(200).json({"message": "Backoffice API is running - leagues endpoint - delete league id: " + id});
    }

    static async getTournamentsByLeagueId(req, res){
        const { id } = req.params;
        const result = validateIdLeague(parseInt(id));

        if (result.error) {      
            return res.status(400).json({"message": "League id is required or invalid", "errors": JSON.parse(result.error)});
        }

        // TODO: Fetch card from database using LeagueModel
        const resultLeagueModel = await LeagueModel.getTournamentsByLeagueId({ id: result.data });

        // For now, just return a success message
        res.status(200).json({"message": "Backoffice API is running - leagues endpoint - tournaments for league id: " + id});
    }

    static async getAllLeagues(req, res) {
        const { current, year } = req.query;
        let { page, limit }     = req.query;
    
        if (!page) {
            page = 1;
        }
    
        if (!limit) {
            limit = 10;
        }

        // TODO: Fetch card from database using LeagueModel
        const resultLeagueModel = await LeagueModel.getAllLeagues({ page: parseInt(page), limit: parseInt(limit) });

        // For now, just return a success message
        if (current !== undefined) {
            res.status(200).json({"message": "Backoffice API is running - leagues endpoint - all leagues, current: " + current + ", page: " + page + ", limit: " + limit});
        } else if (year !== undefined) {
            res.status(200).json({"message": "Backoffice API is running - leagues endpoint - all leagues, year: " + year + ", page: " + page + ", limit: " + limit});
        } else {
            res.status(200).json({"message": "Backoffice API is running - leagues endpoint - leagues with no condition, page: " + page + ", limit: " + limit});
        }
    }
}