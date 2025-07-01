import { getFunctions, httpsCallable } from "firebase/functions";


export const makeReservation = async (availabilityId, requestedTime, numberOfPeople) => {
    const makeReservationFunction = httpsCallable(getFunctions(), 'makeReservation');

    const result = await makeReservationFunction({
        availabilityId,
        requestedTime,
        numberOfPeople
     });

     return result.data;
};