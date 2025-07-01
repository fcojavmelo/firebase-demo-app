import { getFunctions, httpsCallable } from "firebase/functions";


export const cancelReservation = async reservationId => {

    const cancelReservationFunction = httpsCallable(getFunctions(), 'cancelReservation');

    return await cancelReservationFunction({reservationId});

};