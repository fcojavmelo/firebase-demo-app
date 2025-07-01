import { getAuth } from 'firebase-admin/auth';

export const createAuthUser = async newUserInfo => {
    const auth = getAuth();
    const { emailAddress, password } = newUserInfo;

    const newUser = await auth.createUser({
        email: emailAddress,
        password
    });

    return newUser.uid;
}