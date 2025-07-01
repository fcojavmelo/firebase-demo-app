import { onRequest } from "firebase-functions/v2/https";
import { createAuthUser } from './createAuthUser';
import { createTemporaryUser } from './createTemporaryUser';

export const createAccount = onRequest(async (req, res) => {

    console.log('request: ' + req.body);

    const { newUserInfo } = req.body;

    const authUid = await createAuthUser(newUserInfo);
    await createTemporaryUser(authUid, newUserInfo);

    return res.status(200).send('Success!');
});