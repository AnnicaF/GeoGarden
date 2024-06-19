import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBFN0P8EmYpiINQ5RA1LwFEqVkH29MQCd4",
    authDomain: "geo-garden.firebaseapp.com",
    projectId: "geo-garden",
    storageBucket: "geo-garden.appspot.com",
    messagingSenderId: "811667282253",
    appId: "1:811667282253:web:7dfc1535b218460ad87f04",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };