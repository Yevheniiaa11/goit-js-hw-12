import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox(".gallery a", {
    captionsData: 'alt',
    captionsDelay: 250,
});

export function createGallery(images){

    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";

    const markup = images
       .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
    `<li class="gallery-item">
        <a href="${largeImageURL}" class="gallery-link">
            <img src="${webformatURL}" alt="${tags}"/>
        </a>
        <div class="description">
            <p><b>Likes:</b> ${likes}</p>
            <p><b>Views:</b> ${views}</p>
            <p><b>Comments:</b> ${comments}</p>
            <p><b>Downloads:</b> ${downloads}</p>
        </div>
    </li>
    `).join("");

    gallery.insertAdjacentHTML("beforeend", markup);

    lightbox.refresh();
}

export function clearGallery(){
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
}

export function showLoader(){
    const loader = document.querySelector(".loader");
    loader.classList.add("visible");
}

export function hideLoader(){
    const loader = document.querySelector(".loader");
    loader.classList.remove("visible");
}

export function showLoadMoreButton(){
    const loadMoreBtn = document.querySelector(".load-more-btn");
    loadMoreBtn.style.display = "block";
}

export function hideLoadMoreButton(){
    const loadMoreBtn = document.querySelector(".load-more-btn");
    loadMoreBtn.style.display = "none";
}