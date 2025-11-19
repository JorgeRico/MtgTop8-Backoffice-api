import { validateCard, validateCardParcial } from "../schemas/cards.js";
import { validateId } from "../schemas/utils.js";
import { ErrorController } from "./errors.js";
import { UtilsController } from "./utils.js";

export class CardsController {
    constructor ({ cardModel }) {
        this.cardModel = cardModel;
    }

    getCardById = async (req, res) => {
        const { id } = req.params;
        const result = validateId(parseInt(id));
        if (result.error) {      
            return res.status(400).json(ErrorController.getErrorMessage("Card id is required or invalid", result.error));
        }
    
        const resultCardModel = await this.cardModel.getCardById({ id: result.data });
        if (!resultCardModel || resultCardModel.data.length == 0) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(200).json(resultCardModel.data);
    }

    updateCardById = async (req, res) => {
        const { id } = req.params;
        const result = validateId(parseInt(id));
        if (result.error) {      
            return res.status(400).json(ErrorController.getErrorMessage("Card id is required or invalid", result.error));
        }
    
        const resultDeck = validateCardParcial(req.body);
        if (resultDeck.error) {
            return res.status(400).json(ErrorController.getErrorMessage("Card id is required or League invalid values", result.error));
        }
    
        const resultCardModel = await this.cardModel.updateCardById({id: result.data, data: resultDeck.data});
        if (!resultCardModel || resultCardModel.data.length == 0) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(200).json(resultCardModel);
    }

    createCard = async (req, res) => {
        const result = validateCard(req.body);
        if (result.error) {
            return res.status(400).json(ErrorController.getErrorMessage("Card invalid values", result.error));
        }
        
        const resultCardModel = await this.cardModel.createCard({data: result.data});
        console.log(resultCardModel)
        if (!resultCardModel) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(201).json(resultCardModel);
    }

    deleteCardById = async (req, res) => {
        const { id } = req.params;
        const result = validateId(parseInt(id));
        if (result.error) {      
            return res.status(400).json(ErrorController.getErrorMessage("Card id is required or invalid", result.error));
        }
    
        const resultCardModel = await this.cardModel.deleteCardById({ id: result.data });

        res.status(204).json(resultCardModel);
    }

    /**
     * Get all cards from DB
     * @params  req, res 
     * @returns data
     */
    getCards = async (req, res) => {
        const page  = UtilsController.setPagination(req.query.page, req.query.limit);
        const limit = UtilsController.setLimit(req.query.page, req.query.limit);   

        const resultCardModel = await this.cardModel.getCards({ page: parseInt(page), limit: parseInt(limit) });
        if (!resultCardModel || resultCardModel.error) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(200).json(resultCardModel.data);
    }

    /**
     * Get number of card items on db
     * @params  req, res 
     * @returns data
     */
    getNumCards = async (req, res) => {
        const resultCardModel = await this.cardModel.getNumCards();
        if (!resultCardModel || resultCardModel.error) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(200).json({count: resultCardModel.count});
    }

}