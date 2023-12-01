import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, query, where, onSnapshot, getFirestore, doc, updateDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDtDl-raIFNKHf7YgO2m062onRzmRGFRds",
    authDomain: "careem-a145e.firebaseapp.com",
    projectId: "careem-a145e",
    storageBucket: "careem-a145e.appspot.com",
    messagingSenderId: "586752728101",
    appId: "1:586752728101:web:37a1cb53e08cabc65e73cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function updateStatus(id, status) {
    await updateDoc(doc(db, "rides", id), {
        status
    });
}

async function updateDriverLocation(id, coords) {
    await updateDoc(doc(db, "rides", id), {
        driverLocation: coords
    });
}

export { collection, query, where, onSnapshot, db, updateStatus, updateDriverLocation }