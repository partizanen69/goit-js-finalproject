import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleyUlElement = document.querySelector("ul.gallery");

const imagesMarkup = galleryItems.reduce((acc, img) => {
  const singleImgMarkup = `
     <li class="gallery__item">
      <a class="gallery__link" href="${img.original}">
          <img class="gallery__image" src="${img.preview}" alt="${img.description}" />
      </a>
    </li>
  `;

  return acc + singleImgMarkup;
}, "");

galleyUlElement.insertAdjacentHTML("afterbegin", imagesMarkup);

const lightbox = new SimpleLightbox("ul.gallery a.gallery__link", {
  captions: true,
  captionDelay: 250,
  captionsData: "alt",
});
