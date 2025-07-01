import { firebaseConfig } from "../firebaseConfigFile";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const signInWithGoogle = async () => {

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);

};