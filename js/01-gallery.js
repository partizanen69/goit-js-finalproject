import { galleryItems } from "./gallery-items.js";

const galleyUlElement = document.querySelector("ul.gallery");
const galleryImgClass = "gallery__image";

const imagesMarkup = galleryItems.reduce((acc, img) => {
  const singleImgMarkup = `
    <li class="gallery__item">
      <a class="gallery__link" href="${img.original}">
        <img 
          src="${img.preview}" 
          alt="${img.description}" 
          data-source="${img.original}" 
          class="gallery__image"
        />
      </a>
    </li>
  `;
  return acc + singleImgMarkup;
}, "");

galleyUlElement.insertAdjacentHTML("afterbegin", imagesMarkup);

galleyUlElement.addEventListener("click", (e) => {
  if (!e.target.classList.contains(galleryImgClass)) {
    return;
  }

  e.preventDefault();

  const originalImgUrl = e.target.dataset.source;

  const imgModal = basicLightbox.create(`
    <img src="${originalImgUrl}" width="800" height="600">
`);

  imgModal.show();

  const closeImgModal = (e) => {
    if (e.key !== "Escape") {
      return;
    }

    console.log("Closing full image modal...");

    imgModal.close(() => {
      document.removeEventListener("keyup", closeImgModal);
    });
  };

  document.addEventListener("keyup", closeImgModal);
});
