import { validateDeck, validateIdDeck } from '../schemas/decks.js';
import { DeckModel } from '../models/deck.js';

export class DeckController {
    static async getDeckById(req, res){
        const { id } = req.params;
        const result = validateIdDeck(parseInt(id));
        
        if (result.error) {      
            return res.status(400).json({"message": "Tournament id is required or invalid", "errors": JSON.parse(result.error)});
        }
    
        // TODO: Fetch card from database using DeckModel
        const resultDeckModel = await DeckModel.getDeckById({ id: result.data });

        // For now, just return a success message
        res.status(200).json({"message": "Backoffice API is running - decks endpoint id: " + result.data});
    }

    static async updateDeckById(req, res){
        const { id } = req.params;
        const result = validateIdDeck(parseInt(id));
        
        if (result.error) {      
            return res.status(400).json({"message": "Tournament id is required or invalid", "errors": JSON.parse(result.error)});
        }
    
        const resultDeck = validateDeck(req.body);
            
        if (resultDeck.error) {
            return res.status(400).json({"message": "Invalid deck data", "errors": JSON.parse(resultDeck.error)});
        }
    
        // TODO: Fetch card from database using DeckModel
        const resultDeckModel = await DeckModel.updateDeckById({ id: result.data, data: resultDeck.data });

        // For now, just return a success message
        res.status(200).json({"message": "Backoffice API is running - decks endpoint update id: " + result.data});
    }

    static async createDeck(req, res) {
        const result = validateDeck(req.body);
            
        if (result.error) {
            return res.status(400).json({"message": "Invalid deck data", "errors": JSON.parse(result.error)});
        }
    
        // TODO: Fetch card from database using DeckModel
        const resultDeckModel = await DeckModel.createDeck({ data: result.data });

        // For now, just return a success message
        res.status(200).json({"message": "Backoffice API is running - decks endpoint create"});
    }

    static async deleteDeckById(req, res) {
        const { id } = req.params;
        const result = validateIdDeck(parseInt(id));
        
        if (result.error) {      
            return res.status(400).json({"message": "Tournament id is required or invalid", "errors": JSON.parse(result.error)});
        }

        // TODO: Fetch card from database using DeckModel
        const resultDeckModel = await DeckModel.deleteDeckById({ id: result.data });

        // For now, just return a success message
        res.status(200).json({"message": "Backoffice API is running - decks endpoint delete id: " + result.data});
    }

    static async getAllDecks(req, res) {
        let { page, limit } = req.query;
    
        if (!page) {
            page = 1;
        }
    
        if (!limit) {
            limit = 10;
        }
        
        // TODO: Fetch card from database using DeckModel
        const resultDeckModel = await DeckModel.getAllDecks({ page: parseInt(page), limit: parseInt(limit) });

        // For now, just return a success message
        res.status(200).json({"message": "Backoffice API is running - decks endpoint - decks with no condition, page: " + page + ", limit: " + limit});
    }

}