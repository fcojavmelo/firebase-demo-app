import { getFunctions, httpsCallable } from "firebase/functions";


export const getRecommendations = async () => {

    const getRecommendationsFunction = httpsCallable(getFunctions(), 'getRecommendations');

    const results = await getRecommendationsFunction();
    return results.data;

};