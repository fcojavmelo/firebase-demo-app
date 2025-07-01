import { getFirestore } from "firebase-admin/firestore";
import { onCall } from "firebase-functions/v2/https";

export const makeReservation = onCall(async (request) => {

    const data = request.data;
    const userId = request.auth.uid;
    if (!userId) return { status: 'error', code: 401, message: 'You haven\'t signed-in' };

    const { availabilityId, requestedTime, numberOfPeople } = data;
    const store = getFirestore();

    const requestedDateDoc = await store.collection('dateAvailabilities')
        .doc(availabilityId)
        .get();

    const availabilityInfo = requestedDateDoc.data();
    const { availableTimes } = availabilityInfo;

    if(!availableTimes.includes(requestedTime)){
        return { status: 'error', code: 400, message: 'Time is no longer available' };
    }

    await store.collection('reservations')
        .add({
            userId,
            createdAt: Date.now(),
            restaurantId: availabilityInfo.restaurantId,
            date: availabilityInfo.date,
            time: requestedTime,
            numberOfPeople,
        });

    await store.collection('dateAvailabilities')
        .doc(availabilityId)
        .update({
            availableTimes: availableTimes.filter(time => time !== requestedTime)
        });

    return { code: 200, message: 'Success!'};

});