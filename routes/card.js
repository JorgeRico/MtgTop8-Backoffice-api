import { Router } from "express";
import { validateCard, validateIdCard } from "../schemas/card.js";

var card = Router();

/**
 * @route GET /cards/:id
 * @desc Test cards route with id parameter 
 * @access Public
 */
card.get('/:id', (req, res) => {
    const { id } = req.params;  
    const result = validateIdCard(parseInt(id));
    
    if (result.error) {      
        return res.status(400).json({"message": "Card id is required or invalid", "errors": JSON.parse(result.error)});
    }

    res.status(200).json({"message": "Backoffice API is running - cards endpoint id: " + id});
});

/**
 * @route PUT /cards/:id
 * @desc Test cards update route with id parameter
 * @access Public
 */
card.put('/:id', (req, res) => {
    const { id } = req.params;  
    const result = validateIdCard(parseInt(id));
    
    if (result.error) {      
        return res.status(400).json({"message": "Card id is required or invalid", "errors": JSON.parse(result.error)});
    } 

    const resultCard = validateCard(req.body);
        
    if (resultCard.error) {
        return res.status(400).json({"message": "Invalid card data", "errors": JSON.parse(resultCard.error)});
    }

    res.status(200).json({"message": "Backoffice API is running - cards endpoint update id: " + id});
});

/**
 * @route POST /cards/
 * @desc Test cards create route
 * @access Public
 */
card.post('/', (req, res) => {
    const result = validateCard(req.body);
        
    if (result.error) {
        return res.status(400).json({"message": "Invalid card data", "errors": JSON.parse(result.error)});
    }

    res.status(200).json({"message": "Backoffice API is running - cards endpoint create"});
}); 

/**
 * @route DELETE /cards/:id
 * @desc Test cards delete route with id parameter  
 * @access Public
 */
card.delete('/:id', (req, res) => {
    const { id } = req.params;  
    const result = validateIdCard(parseInt(id));
    
    if (result.error) {      
        return res.status(400).json({"message": "Card id is required or invalid", "errors": JSON.parse(result.error)});
    }

    res.status(200).json({"message": "Backoffice API is running - cards endpoint delete id: " + id});
});

export default card;