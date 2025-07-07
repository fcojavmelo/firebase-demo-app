import { onRequest } from "firebase-functions/v2/https";
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';



export const confirmEmail = onRequest(async (req, res) => {
    const confirmationHash = req.query.conf;
    const auth = getAuth();
    const store = getFirestore();

    const querySnapshot = await store.collection('temporaryUsers')
        .where('confirmationHash', '==', confirmationHash)
        .get();

    if (querySnapshot.size === 0) {
        return res.redirect('https://fir-test-2506c.web.app/email-confirmation/failure');
    }

    const temporaryUserDoc = querySnapshot.docs[0];

    const {
        authUid,
        emailAddress,
        firstName,
        lastName,
        bio
    } = temporaryUserDoc.data();

    await auth.updateUser(authUid, { emailVerified: true });

    await store.collection('users')
        .doc(authUid)
        .set({
            emailAddress,
            firstName,
            lastName,
            bio
        });

    await store.collection('temporaryUsers')
        .doc(temporaryUserDoc.id)
        .delete();

    return res.redirect('https://fir-test-2506c.web.app/email-confirmation/success');


});