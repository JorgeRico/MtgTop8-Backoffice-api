import { validateDeck, validateDeckParcial } from '../schemas/decks.js';
import { validateId } from '../schemas/utils.js';
import { ErrorController } from './errors.js';
import { UtilsController } from './utils.js';
export class DeckController {
    constructor( { deckModel }) {
        this.deckModel = deckModel;
    }

    /**
     * Get data deck by id
     * @params  req, res 
     * @returns data
     */
    getDeckById = async (req, res) => {
        const { id } = req.params;
        const result = validateId(parseInt(id));
        if (result.error) {      
            return res.status(400).json(ErrorController.getErrorMessage("Deck id is required or invalid", result.error));
        }
    
        const resultDeckModel = await this.deckModel.getDeckById({ id: result.data });
        if (!resultDeckModel || resultDeckModel.data.length == 0) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(200).json(resultDeckModel.data);
    }

    /**
     * Update data deck
     * @params  req, res 
     * @returns data
     */
    updateDeckById = async (req, res) => {
        const { id } = req.params;
        const result = validateId(parseInt(id));
        if (result.error) {      
            return res.status(400).json(ErrorController.getErrorMessage("Deck id is required or invalid", result.error));
        }
    
        const resultDeck = validateDeckParcial(req.body);
        if (resultDeck.error) {
            return res.status(400).json(ErrorController.getErrorMessage("Deck id is required or League invalid values", result.error));
        }
    
        const resultDeckModel = await this.deckModel.updateDeckById({id: result.data, data: resultDeck.data});
        if (!resultDeckModel || resultDeckModel.data.length == 0) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(200).json(resultDeckModel);
    }

    /**
     * Create new deck
     * @params  req, res 
     * @returns data
     */
    createDeck = async (req, res) => {
        const result = validateDeckParcial(req.body);
        if (result.error) {
            return res.status(400).json(ErrorController.getErrorMessage("Deck invalid values", result.error));
        }
        
        const resultDeckModel = await this.deckModel.createDeck({data: result.data});
        if (!resultDeckModel || resultDeckModel.data.length == 0) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(201).json(resultDeckModel);
    }

    /**
     * Delete deck
     * @params  req, res 
     * @returns data
     */
    deleteDeckById = async (req, res) => {
        const { id } = req.params;
        const result = validateId(parseInt(id));
        if (result.error) {      
            return res.status(400).json(ErrorController.getErrorMessage("Deck id is required or invalid", result.error));
        }
    
        const resultDeckModel = await this.deckModel.deleteDeckById({ id: result.data });

        res.status(204).json(resultDeckModel);
    }

    /**
     * Get all decks from DB
     * @params  req, res 
     * @returns data
     */
    getAllDecks = async (req, res) => {
        const page  = UtilsController.setPagination(req.query.page, req.query.limit);
        const limit = UtilsController.setLimit(page, req.query.limit);

        const resultDeckModel = await this.deckModel.getAllDecks({ page: parseInt(page), limit: parseInt(limit) });
        if (!resultDeckModel || resultDeckModel.error) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(200).json(resultDeckModel.data);
    }

    /**
     * Get number of deck items on db
     * @params  req, res 
     * @returns data
     */
    getNumDecks = async (req, res) => {
        const resultDeckModel = await this.deckModel.getNumDecks();
        if (!resultDeckModel || resultDeckModel.error) {
            return res.status(404).json(ErrorController.emptyError());
        }

        res.status(200).json({count: resultDeckModel.count});
    }

}