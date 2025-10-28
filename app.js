import dotenv from 'dotenv';
import express, { json } from "express";
import { corsMiddleware } from './middlewares/cors.js';

// load routers
import { createDeckRouter } from './routes/decks.js';
import { createLeagueRouter } from './routes/leagues.js';
import { createPlayerRouter } from './routes/players.js';
import { createTournamentRouter } from './routes/tournaments.js';
import { createCardRouter } from './routes/cards.js';

export const createApp = ({ leagueModel, tournamentModel, playerModel, deckModel, cardModel }) => {
    // load .env file data
    dotenv.config();
    // express api
    const app  = express();
    // cors middleware
    app.use(corsMiddleware());
    // disable x-powered-by header
    app.disable('x-powered-by');
    // for parsing application/json
    app.use(json());
    // for parsing application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true })) 

    // // swagger url
    // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    app.get('/', (req, res) => {
        res.status(200).json({"message": "Backoffice API is running"});
    });

    // use routers
    app.use('/leagues', createLeagueRouter({ leagueModel: leagueModel }));
    app.use('/tournaments', createTournamentRouter({ tournamentModel: tournamentModel }));
    app.use('/players', createPlayerRouter({ playerModel: playerModel }));
    app.use('/decks', createDeckRouter({ deckModel: deckModel }));
    app.use('/cards', createCardRouter({ cardModel: cardModel }));

    // not found endpoint handler
    app.use((req, res) => {
        res.status(404).json({"message": "Endpoint not found"});
    });

    // running terminal message
    app.listen(process.env.API_PORT, () => {
        console.log(`Server running at ${process.env.API_URL}:${process.env.API_PORT}`);
    });
}

