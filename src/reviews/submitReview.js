import { getFunctions, httpsCallable } from "firebase/functions";


export const submitReview = async (restaurantId, newReview) => {

    const submitReviewFunction = httpsCallable(getFunctions(), 'submitReview');

    return await submitReviewFunction({restaurantId, newReview});

}; 