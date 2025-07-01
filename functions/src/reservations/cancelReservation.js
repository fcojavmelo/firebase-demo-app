import { getFirestore } from "firebase-admin/firestore";
import { onCall } from "firebase-functions/v2/https";


export const cancelReservation = onCall(async (request) => {

    const userId = request.auth.uid;
    const { reservationId } = request.data;

    const store = getFirestore();
    const reservationDoc = await store.collection('reservations')
        .doc(reservationId)
        .get();

    const reservation = reservationDoc.data();

    if(reservation.userId !== userId){
        return { status: 'error', code: 404, message: 'Reservation not found'};
    }

    await store.collection('reservations')
        .doc(reservationId)
        .delete();
    
    const querySnapshot = await store.collection('dateAvailabilities')
        .where('restaurantId', '==', reservation.restaurantId)
        .where('date', '==', reservation.date)
        .get();

    const availabilityInfoDoc = querySnapshot.docs[0];

    //console.log('availabilityInfoDoc: ' + JSON.stringify)

    const availableTimes = availabilityInfoDoc.data().availableTimes;

    await store.collection('dateAvailabilities')
        .doc(availabilityInfoDoc.id)
        .update({
            availableTimes: availableTimes.concat(reservation.time)
        });

    return { code: 200, message: 'success'};

});