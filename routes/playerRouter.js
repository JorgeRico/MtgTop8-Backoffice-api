
import { Router } from 'express';

var playerRouter = Router();

/** 
 * @route GET /players/:id
 * @desc Test players route with id parameter
 * @access Public
 */
playerRouter.get('/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({"message": "Player id is required"});
    }

    res.status(200).json({"message": "Backoffice API is running - players endpoint id: " + id});
});

/**
 * @route PUT /players/:id
 * @desc Test players update route with id parameter
 * @access Public
 */
playerRouter.put('/:id', (req, res)=> {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({"message": "Player id is required"});
    }

    res.status(200).json({"message": "Backoffice API is running - players endpoint update id: " + id});
});

/**
 * @route POST /players/
 * @desc Test players create route
 * @access Public
 */
playerRouter.post('/', (req, res) => {
    res.status(200).json({"message": "Backoffice API is running - players endpoint create"});
});

/**
 * @route DELETE /players/:id       
 * @desc Test players delete route with id parameter
 * @access Public
 */
playerRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {          
        return res.status(400).json({"message": "Player id is required"});
    }

    res.status(200).json({"message": "Backoffice API is running - players endpoint delete id: " + id});
});

export default playerRouter;