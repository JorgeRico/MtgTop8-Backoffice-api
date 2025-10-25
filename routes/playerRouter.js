
import { Router } from 'express';

var playerRouter = Router();

playerRouter.get('/', (req, res) => {
    res.status(200).json({"message": "Backoffice API is running - players endpoint"});
});

export default playerRouter;