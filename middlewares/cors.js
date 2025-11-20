import cors from 'cors';

const ACCEPTED_ORIGINS = [
  'https://mtg-top8-backoffice-front.vercel.app',
  'https://mtg-top8-backoffice-front.vercel.app/',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://127.0.0.1',
];

export const corsMiddleware = ( { acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
    origin: '*', 
    // (origin, callback) => {
    //     if (!origin) {
    //         return callback(null, true); 
    //     }

    //     if (acceptedOrigins.includes(origin)) {
    //         return callback(null, true);       
    //     }

    //     return callback(new Error('Not allowed by CORS'));
    // },
    // credentials: true,
    allowedHeaders: [ 'Content-Type', 'Authorization' ],
    methods: "GET, OPTIONS, PUT, POST, DELETE",
    // preflightContinue: false,
    // optionsSuccessStatus: 204
});