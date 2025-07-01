import { getFunctions, httpsCallable } from "firebase/functions";


export const searchRestaurants = async searchString => {
    const searchRestaurantsFunction = httpsCallable(getFunctions(), 'searchRestaurants');
    const results = await searchRestaurantsFunction({searchString});

    return results.data;
};