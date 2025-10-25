
import { Router } from 'express';

var tournamentRouter = Router();

tournamentRouter.get('/', (req, res) => {
    return res.status(200).json({"message": "Backoffice API is running - tournaments endpoint"});
});

export default tournamentRouter;