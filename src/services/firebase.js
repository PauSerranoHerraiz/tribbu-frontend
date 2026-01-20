import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDChqzfln2x4LJ199GGPG0YbgKThvf-xEw",
    authDomain: "tribbu-22519.firebaseapp.com",
    projectId: "tribbu-22519",
    storageBucket: "tribbu-22519.firebasestorage.app",
    messagingSenderId: "182061766748",
    appId: "1:182061766748:web:964ad85455fd860db7ee99",
    measurementId: "G-CVHZL7P93S"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };