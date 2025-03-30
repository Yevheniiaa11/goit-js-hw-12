import axios from 'axios';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const BASE = "https://pixabay.com/api/";
const API_KEY = "49565039-11a2922cd8e7ceae59523da99";
const limit = 15;

export async function getImagesByQuery(query, page) {
    try{
    console.log("Searching for:", query);
    
    const response = await axios.get(BASE, {
        params: {
                    key: API_KEY,
                    q: query,
                    image_type: "photo",
                    orientation: "horizontal",
                    safesearch: true,
                    page: page,
                    per_page: limit,
                },
            });

    console.log("Raw API response:", response.data);


    if (!response.data.hits || !Array.isArray(response.data.hits) || response.data.hits.length === 0) {
        iziToast.error({
            title: "Error",
            message: "Sorry, there are no images matching your search query. Please try again!",
        });
        return { hits: [], totalHits: 0 };

    }
    return { hits: response.data.hits, totalHits: response.data.totalHits };   
}

catch(error) {
            console.error("Axios error:", error);
            iziToast.error({
                title: "Error",
                message: "Sorry, there are no images matching your search query. Please try again!",
            });
            return { hits: [], totalHits: 0 };
        }
}

