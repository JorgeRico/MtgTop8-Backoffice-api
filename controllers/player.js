import { validatePlayer, validateIdPlayer } from '../schemas/players.js';
import { PlayerModel } from '../models/player.js';

export class PlayerController {
    static async getPlayerById(req, res){
        let { page, limit } = req.query;
    
        if (!page) {
            page = 1;
        }
    
        if (!limit) {
            limit = 10;
        }

        // TODO: Fetch card from database using LeagueModel
        const resultPlayerModel = await PlayerModel.getAllPlayers({ page: parseInt(page), limit: parseInt(limit) });

        // For now, just return a success message
        res.status(200).json({"message": "Backoffice API is running - players endpoint - players with no condition, page: " + page + ", limit: " + limit});
    }

    static async getPlayerDetailsById(req, res) {
        const { id } = req.params;
        const result = validateIdPlayer(parseInt(id));
        
        if (result.error) {      
            return res.status(400).json({"message": "League id is required or invalid", "errors": JSON.parse(result.error)});
        }
    
        // TODO: Fetch card from database using LeagueModel
        const resultPlayerModel = await PlayerModel.getPlayerById({ id: result.data });

        // For now, just return a success message
        res.status(200).json({"message": "Backoffice API is running - players endpoint id: " + result.data});
    }

    static async getPlayerDecksById(req, res) {
        const { id } = req.params;
        const result = validateIdPlayer(parseInt(id));
        
        if (result.error) {      
            return res.status(400).json({"message": "League id is required or invalid", "errors": JSON.parse(result.error)});
        }
    
        // TODO: Fetch card from database using LeagueModel
        const resultPlayerModel = await PlayerModel.getPlayerById({ id: result.data });

        // For now, just return a success message
        res.status(200).json({"message": "Backoffice API is running - player decks endpoint id: " + result.data});
    }

    static async updatePlayerById(req, res){
        const { id } = req.params;
        const result = validateIdPlayer(parseInt(id));
        
        if (result.error) {      
            return res.status(400).json({"message": "League id is required or invalid", "errors": JSON.parse(result.error)});
        }
    
        const resultPlayer = validatePlayer(req.body);
            
        if (resultPlayer.error) {
            return res.status(400).json({"message": "Invalid player data", "errors": JSON.parse(resultPlayer.error)});
        }
    
        // TODO: Fetch card from database using LeagueModel
        const resultPlayerModel = await PlayerModel.updatePlayerById({ id: result.data, data: resultPlayer.data });

        // For now, just return a success message
        res.status(200).json({"message": "Backoffice API is running - players endpoint update id: " + result.data});
    }

    static async createPlayer(req, res) {
        const result = validatePlayer(req.body);
            
        if (result.error) {
            return res.status(400).json({"message": "Invalid player data", "errors": JSON.parse(result.error)});
        }
    
        // TODO: Fetch card from database using LeagueModel
        const resultPlayerModel = await PlayerModel.createPlayer({ data: result.data });

        // For now, just return a success message
        res.status(200).json({"message": "Backoffice API is running - players endpoint create"});
    }

    static async deletePlayerById(req, res) {
        const { id } = req.params;
        const result = validateIdPlayer(parseInt(id));
        
        if (result.error) {      
            return res.status(400).json({"message": "League id is required or invalid", "errors": JSON.parse(result.error)});
        }

        // TODO: Fetch card from database using LeagueModel
        const resultPlayerModel = await PlayerModel.deletePlayerById({ id: result.data });

        // For now, just return a success message
        res.status(200).json({"message": "Backoffice API is running - players endpoint delete id: " + result.data});
    }
}