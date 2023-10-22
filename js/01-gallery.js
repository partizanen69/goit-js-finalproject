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

  let closeInProgress = false;

  const imgModal = basicLightbox.create(
    `<img src="${originalImgUrl}" width="800" height="600">`,
    {
      onShow: () => {
        document.addEventListener("keydown", closeImgModal);
      },
      onClose: () => {
        document.removeEventListener("keydown", closeImgModal);
        closeInProgress = false;
        console.log("Full image modal has been closed");
      },
    }
  );

  imgModal.show();

  function closeImgModal(e) {
    if (e.key !== "Escape" || closeInProgress) {
      return;
    }

    console.log("Closing full image modal on Escape button...");

    closeInProgress = true;
    imgModal.close();
  }
});
