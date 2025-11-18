import { Router } from "express";
import { CardsController } from "../controllers/card.js";

export const createCardRouter = ({ cardModel }) => {
    const cardsRouter = Router();
    const cardsController = new CardsController({ cardModel });

    /**
     * @route GET /cards
     * @desc Test cards route
     * @access Public
     */
    cardsRouter.get('/', cardsController.getCards);

    /**
     * @route GET /cards/num
     * @desc Test cards route
     * @access Public
     */
    cardsRouter.get('/num', cardsController.getNumCards);

    /**
     * @route GET /cards/:id
     * @desc Test cards route with id parameter 
     * @access Public
     */
    cardsRouter.get('/:id', cardsController.getCardById);

    /**
     * @route PUT /cards/:id
     * @desc Test cards update route with id parameter
     * @access Public
     */
    cardsRouter.put('/:id', cardsController.updateCardById);

    /**
     * @route POST /cards/
     * @desc Test cards create route
     * @access Public
     */
    cardsRouter.post('/', cardsController.createCard); 

    /**
     * @route DELETE /cards/:id
     * @desc Test cards delete route with id parameter  
     * @access Public
     */
    cardsRouter.delete('/:id', cardsController.deleteCardById);

    return cardsRouter;
}

