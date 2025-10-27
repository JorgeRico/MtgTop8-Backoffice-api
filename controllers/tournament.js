import { validateTournament, validateIdTournament } from '../schemas/tournaments.js';
import { TournamentModel } from '../models/tournament.js';

export class TournamentController {
    static async getAllTournaments(req, res) {
        let { page, limit } = req.query;
    
        if (!page) {
            page = 1;
        }
    
        if (!limit) {
            limit = 10;
        }
    
        // TODO: Fetch card from database using LeagueModel
        const resultTournamentModel = await TournamentModel.getAllTournaments({ page: parseInt(page), limit: parseInt(limit) });

        // For now, just return a success message
        res.status(200).json({"message": "Backoffice API is running - tournament endpoint - tournaments with no condition, page: " + page + ", limit: " + limit});
    }

    static async getTournamentById(req, res) {
        const { id } = req.params;
        const result = validateIdTournament(parseInt(id));
        
        if (result.error) {      
            return res.status(400).json({"message": "Tournament id is required or invalid", "errors": JSON.parse(result.error)});
        }
    
        // TODO: Fetch card from database using LeagueModel
        const resultTournamentModel = await TournamentModel.getTournamentById( { id: result.data})

        // For now, just return a success message
        res.status(200).json({"message": "Backoffice API is running - tournaments endpoint id: " + result.data});
    }

    static async createTournament(req, res) {
        const result = validateTournament(req.body);
        
        if (result.error) {
            return res.status(400).json({"message": "Invalid tournament data", "errors": JSON.parse(result.error)});
        }
    
        // {"name":"torneo chulo","players":51,"idLeague":1, "date": "2024-01-21"}
        // tournament date need to be converted to dd-mm-yy format
        // TODO: Fetch card from database using LeagueModel
        const resultTournamentModel = await TournamentModel.createTournament({ data: result.data });

        // For now, just return a success message
        res.status(200).json({"message": "Backoffice API is running - tournaments endpoint create"});
    }

    static async updateTournamentById(req, res) {
        const { id } = req.params;
        const result = validateIdTournament(parseInt(id));
        
        if (result.error) {      
            return res.status(400).json({"message": "Tournament id is required or invalid", "errors": JSON.parse(result.error)});
        }
    
        const resultTournament = validateTournament(req.body);
        
        if (resultTournament.error) {
            return res.status(400).json({"message": "Invalid tournament data", "errors": JSON.parse(resultTournament.error)});
        }
    
        // {"name":"torneo chulo","players":51,"idLeague":1, "date": "2024-01-21"}
        // tournament date need to be converted to dd-mm-yy format
        // TODO: Fetch card from database using LeagueModel
        const resultTournamentModel = await TournamentModel.updateTournamentById({ id: result.data, data: resultTournament.data });

        // For now, just return a success message
        res.status(200).json({"message": "Backoffice API is running - tournaments endpoint update id: " + result.data});
    }

    static async deleteTournamentById(req, res) {
        const { id } = req.params;
        const result = validateIdTournament(parseInt(id));
        
        if (result.error) {      
            return res.status(400).json({"message": "Tournament id is required or invalid", "errors": JSON.parse(result.error)});
        }   
    
        // TODO: Fetch card from database using LeagueModel
        const resultTournamentModel = await TournamentModel.deleteTournamentById({ id: result.data });

        // For now, just return a success message
        res.status(200).json({"message": "Backoffice API is running - tournaments endpoint delete id: " + result.data});
    }

    static async getPlayersByTournamentId(req, res) {
        const { id } = req.params;
        const result = validateIdTournament(parseInt(id));
        
        if (result.error) {      
            return res.status(400).json({"message": "Tournament id is required or invalid", "errors": JSON.parse(result.error)});
        }
        
        // TODO: Fetch card from database using LeagueModel
        const resultTournamentModel = await TournamentModel.getPlayersByTournamentId({ id: result.data });

        // For now, just return a success message
        res.status(200).json({"message" : " Backoffice API is running - tournaments endpoint - players for tournament id: " + result.data});
    }
}