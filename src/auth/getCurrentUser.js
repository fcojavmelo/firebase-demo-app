import { firebaseConfig } from "../firebaseConfigFile";
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const app = initializeApp(firebaseConfig);

export const getCurrentUser = () => {
    const user = getAuth(app).currentUser;
    if(!user) return null;

    console.log("current userID is:" + user.uid);

    return {
        id: user.uid
    };
}
