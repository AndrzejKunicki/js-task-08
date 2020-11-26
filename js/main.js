import images from "./gallery-items.js";

const galleryRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('div.lightbox');
const modalImage = document.querySelector('img.lightbox__image');
const btnCloseModal = document.querySelector('button[data-action="close-lightbox"]')

const createImageCard = images.map(
    (image, i, array) =>
`<li class="gallery__item">
<a
  class="gallery__link"
  href="${image.original}"
>
  <img
    class="gallery__image"
    src="${image.preview}"
    data-source="${image.original}"
    data-index=${i}
    alt="${image.description}"
  />
</a>
</li>`
).join("");

galleryRef.insertAdjacentHTML("beforeend", createImageCard);

galleryRef.addEventListener('click', modalIsOpen);
btnCloseModal.addEventListener('click', modalClose);
window.addEventListener('keydown', keyPress);
lightboxRef.addEventListener('click', modalCloseOnOverlay)
window.addEventListener('keydown', (e) => {
  nextImage (e);
  previousImage (e);
});

function modalIsOpen () {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  
  const originImageRef = event.target;
  const originImageIndex = originImageRef.getAttribute('data-index');
  
  lightboxRef.classList.add('is-open');
  modalImage.src = originImageRef.dataset.source;
  modalImage.setAttribute('data-index', originImageIndex)
}

function modalClose () {
  lightboxRef.classList.remove('is-open');
  modalImage.src = "";
}

function modalCloseOnOverlay () {
  const targetClassNAme = event.target.className
  if (targetClassNAme !== "lightbox__overlay") {
    return;
  }
  lightboxRef.classList.remove('is-open');
  modalImage.src = "";
}

function keyPress (e) {
    if(e.key !== "Escape") {
      return;
    }
    lightboxRef.classList.remove('is-open');
    modalImage.src = "";
}

function nextImage (e) {
  if (!lightboxRef.classList.contains('is-open')) {
    return;
  } else if (e.key === "ArrowRight") {
    let i = Number(modalImage.dataset.index)
    i += 1;
    if (i >= 0 && i < images.length) {
      modalImage.setAttribute('data-index', i);
      modalImage.src = images[i].original
    } else {
      return;
    }
  }
  
}

function previousImage (e) {
  if (!lightboxRef.classList.contains('is-open')) {
    return;
   } else if (e.key === "ArrowLeft") {
     let i = Number(modalImage.dataset.index)
     i -= 1;
       if (i >= 0 && i < images.length) {
         modalImage.setAttribute('data-index', i);
         modalImage.src = images[i].original
       } else {
         return;
       }
   }
 }
