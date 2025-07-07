import { getFunctions, httpsCallable } from "firebase/functions";


export const createAccount = async (newUserInfo) => {

    const createAccountFunction = httpsCallable(getFunctions(), 'createAccount');

    return await createAccountFunction(newUserInfo);

}; 