import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api.js";
import { 
    clearGallery, 
    hideLoadMoreButton, 
    showLoader, 
    createGallery, 
    showLoadMoreButton, 
    hideLoader 
} from "./js/render-functions.js";


let searchQuery = "";
let page = 1;
let limit = 15;
let totalHits = 0;


const form = document.querySelector(".form");
const loadMoreBtn = document.querySelector(".load-more-btn");
const input = document.querySelector('input[name="search-text"]');

hideLoadMoreButton();

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    searchQuery = input.value.trim();

    if(!searchQuery)return;

    page = 1;
    totalHits = 0;
    clearGallery();
    hideLoadMoreButton(); 
    showLoader();

    try{
        const { hits, totalHits: fetchedTotalHits }  = await getImagesByQuery(searchQuery, page);

        console.log("Total hits:", fetchedTotalHits);

        totalHits = fetchedTotalHits;

        if (hits.length === 0) {
            iziToast.error({
                title: "Error",
                message: "No images found",
            });
            return;
        }

        createGallery(hits);
        checkLoadMoreButton();

        handleScroll();
        
        
    } catch(error) {
        console.log(error);
        iziToast.error({
            title: "Error",
            message: "An error catched while finding images. Try again."
        });
    } finally {
        hideLoader();
    }
});


loadMoreBtn.addEventListener("click", async () => {
    page += 1;
    showLoader();

    try {
        const { hits } = await getImagesByQuery(searchQuery, page);
        console.log("Full API Response:", hits); 

        if(hits.length === 0){
            iziToast.info({
                title: "No more images",
                message: "No more images found for your request."
            });

            hideLoadMoreButton();
            return;
        }

        createGallery(hits);
        checkLoadMoreButton();

        handleScroll();
      
    } catch (error){
        console.log("Error:", error);
        
        iziToast.error({
            title: "Error",
            message: "An error catched while finding images. Try again."
        });
    } finally {
        hideLoader();
    }
});

function checkLoadMoreButton(){
    const totalPages = Math.ceil(totalHits / limit);

    if(page < totalPages){
        showLoadMoreButton();
    } else {
        hideLoadMoreButton();
        iziToast.success({
            title: "End of results",
            message: "All pictures have been loaded",
        });
    }
}

function handleScroll() {
    const lastImage = document.querySelector(".gallery")?.lastElementChild;
    if (lastImage) {
        setTimeout(() => {
            lastImage.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 700); 
    }
}

