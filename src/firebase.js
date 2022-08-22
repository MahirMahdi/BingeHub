import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider,FacebookAuthProvider,TwitterAuthProvider} from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const facebook_provider = new FacebookAuthProvider();
export const twitter_provider = new TwitterAuthProvider();
export default app;