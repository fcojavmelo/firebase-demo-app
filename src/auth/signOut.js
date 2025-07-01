import { firebaseConfig } from "../firebaseConfigFile";
import { initializeApp } from "firebase/app";
import { getAuth, signOut as fb_signOut } from 'firebase/auth';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signOut = async () => {
    const result = await fb_signOut(auth)
    .then(() => {
        return {};
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        throw new Error('Error signing out');
    });
}
    