import dotenv from 'dotenv';
import cors from 'cors';
import express, { json } from "express";

// const swaggerUi   = require('swagger-ui-express');
// const swaggerDocs = require('./swagger.cjs')

// load routers
import deck from './routes/deck.js';
import league from './routes/league.js';
import player from './routes/player.js';
import tournament from './routes/tournament.js';

// load .env file data
dotenv.config();
// express api
const app  = express();

const PORT = process.env.API_PORT || 5000;
const API  = process.env.API_URL  || 'http://127.0.0.1';

app.use(cors({
  origin: '*',
  credentials: true
}));

// disable x-powered-by header
app.disable('x-powered-by');

// running terminal message
app.listen(PORT, () => {
  console.log(`Server running at ${API}:${PORT}`);
});

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
app.use('/leagues', league);
app.use('/tournaments', tournament);
app.use('/players', player);
app.use('/decks', deck);

// not found endpoint handler
app.use((req, res) => {
    res.status(404).json({"message": "Endpoint not found"});
});
