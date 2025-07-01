import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { sendEmail } from './sendEmail';

export const sendVerificationEmail = onDocumentCreated("temporaryUsers/{id}", (event) => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const snapshot = event.data;
    if (!snapshot) {
        console.log("No data associated with the event");
        return;
    }
    const tempUserInfo = snapshot.data();
    const {
        emailAddress,
        confirmationHash
    } = tempUserInfo

    return sendEmail({
        to: emailAddress,
        from: 'fbmailsender123@gmail.com',
        subject: 'Reservation App email verification',
        message: `Click this link to verify your email: https://us-central1-fir-test-2506c.cloudfunctions.net/confirmEmail?conf=${confirmationHash}`
    });

});