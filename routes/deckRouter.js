
import { Router } from 'express';

var deckRouter = Router();

deckRouter.get('/', (req, res) => {
    res.status(200).json({"message": "Backoffice API is running - decks endpoint"});
});

export default deckRouter;