import { firebaseConfig } from "../firebaseConfigFile";
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { getCurrentUser } from "../auth";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const updateCurrentUserInfo = async updates => {
    const currentUser = getCurrentUser();

    if(!currentUser) return;

    await setDoc(doc(db, "users", currentUser.id), updates);
}