import dotenv from 'dotenv';
import admin from 'firebase-admin';

dotenv.config();

// google firebase init
export const firebaseConfig = {
    apiKey            : process.env.FIREBASE_API_KEY,
    authDomain        : process.env.FIREBASE_AUTH_DOMAIN,
    projectId         : process.env.FIREBASE_PROJECT_ID,
    storageBucket     : process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId : process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId             : process.env.FIREBASE_APP_ID
};

// initialize the firebase app
admin.initializeApp(firebaseConfig)

export const authenticateUser = async (req, res, next) => {
    const idToken = req.headers.authorization;
    
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        // console.log(decodedToken)
        next();
    } catch (error) {
        res.status(401).json({ error: "Unauthorized" });
    }
}; 