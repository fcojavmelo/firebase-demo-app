import { getFirestore } from 'firebase-admin/firestore';
import * as functions from 'firebase-functions/v1';

export const createUserFromOAuth =  functions.auth.user().onCreate(async user => {

    //validates if user signing-in with Google doesn't already created an account through email-password method
    if (user.providerData.some(provider => provider.providerId === 'password')) {
        return null;
    }

    const store = getFirestore();
    const {
        uid,
        email,
        displayName = '',
        photoURL
    } = user;

    return store.collection('users')
        .doc(uid)
        .set({
            emailAddress: email,
            firstName: displayName.split(' ')[0],
            lastName: displayName.split(' ')[1],
            profilePictureUrl: photoURL
        });

});