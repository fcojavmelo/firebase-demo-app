import { firebaseConfig } from "../firebaseConfigFile";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* export const getUserInfo = aysnc (userId) => {
    //gets doc snap
    const userInfoDoc = await getDoc(doc(db, "users", userId));

    const userInfo = userInfoDoc.data();

    if(!userInfo) return null;

    return {
        ...userInfo,
        id: userInfoDoc.id
    };
}; */

export const getUserInfo = async userId => {

    const userInfoDoc = await getDoc(doc(db, "users", userId));

    const userInfo = userInfoDoc.data();

    if(!userInfo) return null;

    return {
        ...userInfo,
        id: userInfoDoc.id
    };
};