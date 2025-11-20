import cors from 'cors';

const ACCEPTED_ORIGINS = [
  'https://mtg-top8-backoffice-front.vercel.app',
  'https://mtg-top8-backoffice-front.vercel.app/',
  'mtg-top8-backoffice-1hluiegql-jorge-ricos-projects.vercel.app',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://127.0.0.1',
];

export const corsMiddleware = ( { acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
    origin: '*',
    // (origin, callback) => {

    //     console.log(origin)
    //     console.log(acceptedOrigins)
    //     if (!origin) {
    //         return callback(null, true); 
    //     }

    //     if (acceptedOrigins.includes(origin)) {
    //         return callback(null, true);       
    //     }

    //     return callback(new Error('Not allowed by CORS'));
    // },
    // credentials: false,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: "GET,HEAD,PUT,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
});