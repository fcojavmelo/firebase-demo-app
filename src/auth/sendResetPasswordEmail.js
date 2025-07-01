import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth();

export const sendResetPasswordEmail = async (emailAddress) => {

    await sendPasswordResetEmail(auth, emailAddress);

};