import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseConfig } from "../firebaseConfigFile";
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const addAuthListener = (callback) => {
    const onChange = (user) => {
        if (user){
            callback({});
        } else {
            callback(null);
        }
    }

    return onAuthStateChanged(auth, onChange);
}