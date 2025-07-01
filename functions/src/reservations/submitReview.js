import { getFirestore } from "firebase-admin/firestore";
import { onCall } from "firebase-functions/v2/https";

export const submitReview = onCall(async (request) => {

    const { restaurantId, newReview } = request.data;
    const userId = request.auth.uid;

    const {
        rating,
        text,
        imageUrls
    } = newReview;

    const store = getFirestore();

    await store.collection('reviews')
        .add({
            rating,
            text,
            imageUrls,
            userId,
            restaurantId
        });

    const restaurantDoc = await store.collection('restaurants')
        .doc(restaurantId)
        .get();

    const restaurant = restaurantDoc.data();

    const { numberOfRatings: oldNumberOfRatings = 0, rating: oldRating } = restaurant;

    const newNumberOfRatings = oldNumberOfRatings + 1;

    await store.collection('restaurants')
        .doc(restaurantId)
        .update({
            numberOfRatings: newNumberOfRatings,
            rating: oldNumberOfRatings > 0
                ? (oldRating * oldNumberOfRatings + rating) / newNumberOfRatings
                : rating
        });
});
