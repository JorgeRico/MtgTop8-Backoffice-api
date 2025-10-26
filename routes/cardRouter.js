import { Router } from "express";
import { validateCard } from "../schemas/card.js";

var cardRouter = Router();

/**
 * @route GET /cards/:id
 * @desc Test cards route with id parameter 
 * @access Public
 */
cardRouter.get('/:id', (req, res) => {
    const { id } = req.params;  

    if (!id) {
        return res.status(400).json({"message": "Card id is required"});
    }   

    res.status(200).json({"message": "Backoffice API is running - cards endpoint id: " + id});
});

/**
 * @route PUT /cards/:id
 * @desc Test cards update route with id parameter
 * @access Public
 */
cardRouter.put('/:id', (req, res) => {
    const { id } = req.params;  
    
    if (!id) {
        return res.status(400).json({"message": "Card id is required"});
    }   

    const result = validateCard(req.body);
        
    if (result.error) {
        return res.status(400).json({"message": "Invalid card data", "errors": result.errors});
    }

    res.status(200).json({"message": "Backoffice API is running - cards endpoint update id: " + id});
});

/**
 * @route POST /cards/
 * @desc Test cards create route
 * @access Public
 */
cardRouter.post('/', (req, res) => {
    const result = validateCard(req.body);
        
    if (result.error) {
        return res.status(400).json({"message": "Invalid card data", "errors": result.errors});
    }

    res.status(200).json({"message": "Backoffice API is running - cards endpoint create"});
}); 

/**
 * @route DELETE /cards/:id
 * @desc Test cards delete route with id parameter  
 * @access Public
 */
cardRouter.delete('/:id', (req, res) => {
    const { id } = req.params;  

    if (!id) {
        return res.status(400).json({"message": "Card id is required"});
    }   

    res.status(200).json({"message": "Backoffice API is running - cards endpoint delete id: " + id});
});

export default cardRouter;