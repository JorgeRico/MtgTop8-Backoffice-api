// load .env file
// require('dotenv').config();

// load express
// const cors        = require('cors');
import express, { json } from "express";

// const swaggerUi   = require('swagger-ui-express');
// const swaggerDocs = require('./swagger.cjs')

// load routers
import deckRouter from './routes/deckRouter.js';
import leagueRouter from './routes/leagueRouter.js';
import playerRouter from './routes/playerRouter.js';
import tournamentRouter from './routes/tournamentRouter.js';


// express api
const app  = express();

const PORT = process.env.API_PORT || 5000;
const API  = process.env.API_URL  || 'http://127.0.0.1';

// app.use(cors({
//   origin: '*'
// }));

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
app.use('/leagues', leagueRouter);
app.use('/tournaments', tournamentRouter);
app.use('/players', playerRouter);
app.use('/decks', deckRouter);

// not found endpoint handler
app.use((req, res) => {
    res.status(404).json({"message": "Endpoint not found"});
});
