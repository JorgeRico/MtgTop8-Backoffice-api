
import { Router } from 'express';

var leagueRouter = Router();

leagueRouter.get('/', (req, res) => {
    res.status(200).json({"message": "Backoffice API is running - leagues endpoint"});
});

leagueRouter.get('/test', (req, res) => {
    res.status(200).json({"message": "Backoffice API is running - leagues endpoint - test route"});
});

export default leagueRouter;