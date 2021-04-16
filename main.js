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
    <img
    class="gallery__image"
    src="${preview}"
    data-source="${original}"
      alt="${description}"
      />
      </li>
      `;
    })
    .join('');
  }
  // <a
  // class="gallery__link"
  // href="${original}"
  // >
  // </a>
  
galleryBox.addEventListener('click', onImageCardClik);

function onImageCardClik(e) {
  if(!e.target.classList.contains('gallery__image')) {
    return;
  }
  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onArrowKeyPress)
  lightbox.classList.add('is-open');
  lightboxImage.src = e.target.dataset.source;
  lightboxImage.alt = e.target.alt;
}

const closeBtn = document.querySelector('[data-action="close-lightbox"]');
 closeBtn.addEventListener('click', closeModal);
 backdrop.addEventListener('click', closeModal);

 function closeModal() {
   window.removeEventListener('keydown', onEscKeyPress)
   window.removeEventListener('keydown', onArrowKeyPress)
   lightbox.classList.remove('is-open');
   lightboxImage.src = '';   
 }
 function onEscKeyPress (e) {
   if(e.code === 'Escape') {
     closeModal();
   }
 }
 
 function onArrowKeyPress(e) {
     const imagesSrc = [];
     images.forEach(img => {
         imagesSrc.push(img.original);
        });
   let newIndex = imagesSrc.indexOf(lightboxImage.src);
   if(newIndex < 0) {
     return;
   }
   if(e.code === 'ArrowLeft') {
      newIndex -= 1;
      if(newIndex === -1) {
        newIndex = imagesSrc.length - 1;
      }
   } else if(e.code === 'ArrowRight') {
     newIndex += 1;
     if(newIndex === imagesSrc.length) {
       newIndex = 0;
     }
   }
   lightboxImage.src = imagesSrc[newIndex];
 }