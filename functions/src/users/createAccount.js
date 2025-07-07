import { onCall } from "firebase-functions/v2/https";
import { createAuthUser } from './createAuthUser';
import { createTemporaryUser } from './createTemporaryUser';

export const createAccount = onCall(async (request) => {

    const newUserInfo = request.data;

    const authUid = await createAuthUser(newUserInfo);
    await createTemporaryUser(authUid, newUserInfo);

});