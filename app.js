import dotenv from 'dotenv';
import express, { json } from "express";
import { corsMiddleware } from './middlewares/cors.js';

// const swaggerUi   = require('swagger-ui-express');
// const swaggerDocs = require('./swagger.cjs')

// load routers
import { decksRouter } from './routes/decks.js';
import { leaguesRouter } from './routes/leagues.js';
import { playersRouter } from './routes/players.js';
import { tournamentsRouter } from './routes/tournaments.js';
import { cardsRouter } from './routes/cards.js';

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
app.use('/leagues', leaguesRouter);
app.use('/tournaments', tournamentsRouter);
app.use('/players', playersRouter);
app.use('/decks', decksRouter);
app.use('/cards', cardsRouter);

// not found endpoint handler
app.use((req, res) => {
    res.status(404).json({"message": "Endpoint not found"});
});

// running terminal message
app.listen(process.env.API_PORT, () => {
  console.log(`Server running at ${process.env.API_URL}:${process.env.API_PORT}`);
});
