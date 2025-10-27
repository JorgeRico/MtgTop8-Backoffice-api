import { Router } from "express";
import { CardsController } from "../controllers/card.js";

export const cardsRouter = Router();

/**
 * @route GET /cards/:id
 * @desc Test cards route with id parameter 
 * @access Public
 */
cardsRouter.get('/:id', CardsController.getCardById);

/**
 * @route PUT /cards/:id
 * @desc Test cards update route with id parameter
 * @access Public
 */
cardsRouter.put('/:id', CardsController.updateCardById);

/**
 * @route POST /cards/
 * @desc Test cards create route
 * @access Public
 */
cardsRouter.post('/', CardsController.createCard); 

/**
 * @route DELETE /cards/:id
 * @desc Test cards delete route with id parameter  
 * @access Public
 */
cardsRouter.delete('/:id', CardsController.deleteCardById);
