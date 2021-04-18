import images from './gallery-items.js';

const galleryBox = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const lightboxImage = document.querySelector('.lightbox__image');
const backdrop = document.querySelector('.lightbox__overlay');

const cardsMarkup = createGalleryCardsMarkup(images);
galleryBox.insertAdjacentHTML('beforeend', cardsMarkup);


function createGalleryCardsMarkup (images) {
  return images
  .map(({preview, original, description}) => {
    return ` 
    <li class="gallery__item">
    <a
    class="gallery__link"
    href="${original}"
    >
    <img
    class="gallery__image"
    src="${preview}"
    data-source="${original}"
    alt="${description}"
    />
    </a>
    </li>
    `;
  })
    .join('');
  }
 
//   galleryBox.addEventListener('click', preventDef, false);
// function preventDef(e) {
//   // if (e.target.nodeName === "A") return;
// }

galleryBox.addEventListener('click', onImageCardClik);

function onImageCardClik(e) {
  if(!e.target.classList.contains('gallery__image')) {
    return;
  }
  e.preventDefault();
  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onArrowKeyPress)
  lightbox.classList.add('is-open');
  getImageAttr(e.target.dataset.source, e.target.alt);
}

const closeBtn = document.querySelector('[data-action="close-lightbox"]');
 closeBtn.addEventListener('click', closeModal);
 backdrop.addEventListener('click', closeModal);

 function closeModal() {
   window.removeEventListener('keydown', onEscKeyPress)
   window.removeEventListener('keydown', onArrowKeyPress)
   lightbox.classList.remove('is-open');
   getImageAttr('', '');   
 }
 function onEscKeyPress (e) {
   if(e.code === 'Escape') {
     closeModal();
   }
 }

 function getImageAttr (src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
 }
 
 function onArrowKeyPress(e) {
    //  const imagesSrc = [];
    //  images.forEach(img => {
    //      imagesSrc.push(img.original);
    //     });
   let newIndex = images.findIndex(image => image.original === lightboxImage.src);
   if(newIndex < 0) {
     return;
   }
   if(e.code === 'ArrowLeft') {
      newIndex -= 1;
      if(newIndex === -1) {
        newIndex = images.length - 1;
      }
   } else if(e.code === 'ArrowRight') {
     newIndex += 1;
     if(newIndex === images.length) {
       newIndex = 0;
     }
   }
   getImageAttr (images[newIndex].original, images[newIndex].description);
 }

