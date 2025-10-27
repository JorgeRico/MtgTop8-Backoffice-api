import { validateCard, validateIdCard } from "../schemas/cards.js";
import { CardModel } from "../models/card.js";

export class CardsController {
    static async getCardById(req, res) {
        // const { id } = req.params;  
        const result = validateIdCard(parseInt(req.params.id));
        
        if (result.error) {      
            return res.status(400).json({"message": "Card id is required or invalid", "errors": JSON.parse(result.error)});
        }
    
        // TODO: Fetch card from database using CardModel
        const resultModelCard = await CardModel.getCardById({ id: result.data });

        // For now, just return a success message
        res.status(200).json({"message": "Backoffice API is running - cards endpoint id: " + result.data});
    }

    static async updateCardById(req, res) {
        const { id } = req.params;  
        const result = validateIdCard(parseInt(id));
        
        if (result.error) {      
            return res.status(400).json({"message": "Card id is required or invalid", "errors": JSON.parse(result.error)});
        } 
    
        const resultCard = validateCard(req.body);
            
        if (resultCard.error) {
            return res.status(400).json({"message": "Invalid card data", "errors": JSON.parse(resultCard.error)});
        }

        // TODO: Fetch card from database using CardModel
        const resultModelCard = await CardModel.updateCardById({id: result.data, data: resultCard.data});
    
        // For now, just return a success message
        res.status(200).json({"message": "Backoffice API is running - cards endpoint update id: " + result.data});
    }

    static async createCard(req, res) {
        const result = validateCard(req.body);
            
        if (result.error) {
            return res.status(400).json({"message": "Invalid card data", "errors": JSON.parse(result.error)});
        }

        // TODO: Fetch card from database using CardModel
        const resultModelCard = await CardModel.createCard({data: result.data});

        // For now, just return a success message
        res.status(200).json({"message": "Backoffice API is running - cards endpoint create"});
    }

    static async deleteCardById(req, res) {
        const { id } = req.params;  
        const result = validateIdCard(parseInt(id));
        
        if (result.error) {      
            return res.status(400).json({"message": "Card id is required or invalid", "errors": JSON.parse(result.error)});
        }

        // TODO: Fetch card from database using CardModel
        const resultModelCard = await CardModel.deleteCardById({ id: res });

        // For now, just return a success message
        res.status(200).json({"message": "Backoffice API is running - cards endpoint delete id: " + result.data});
    }
}