import cors from 'cors';

const ACCEPTED_ORIGINS = [
  // 'http://example.com',
  // 'http://127.0.0.1:5000',
  '*'
];

export const corsMiddleware = ( { acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true); 
        }

        if (acceptedOrigins.includes(origin)) {
            return callback(null, true);       
        }

        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
});