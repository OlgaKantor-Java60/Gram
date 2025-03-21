
const gallery = document.getElementById('gallery');
const detailedImage = document.querySelector(".detailedContainer--image");
const detailedTitle = document.querySelector(".detailedContainer--title");
const galleryImages = document.querySelectorAll(".gallery--item_image");

drawImages(gallery);

async function drawImages(element) {
  const response = await fetch("https://api.thecatapi.com/v1/breeds");
  const data = await response.json();
  const images = getImages(data);
  const types = getTypes(data);
  const details = getDetailes(data);
  const items = getItems(images, types, details);
  element.innerHTML = items;
  for (let i = 0; i < galleryImages.length; i++) {
    galleryImages[i].addEventListener("click", function () {
      setDetails(galleryImages[i]);
    });
  }
}

function setDetails(galleryImage) {
  let image = galleryImage.getAttribute("data-detailed-image");
  detailedImage.src = "";
  detailedImage.src = image;
  detailedTitle.innerHTML =
    galleryImage.getAttribute("data-detailed-title") +
    '<span class="for_ellipsis">...</span>';
  animate();
}

function getImages(data){
  const images = data.map(record => `https://cdn2.thecatapi.com/images/${record.reference_image_id}.jpg`);
  return images;
}

function getTypes(data){
  const types = data.map(record => `${record.name}`);
  return types;
}

function getDetailes(data){
  const details = data.map(record => `${record.description}`);
  return details;
}

function getItems(images, types, details){
  const items = images.map(getItem, types, details);
  return items.join('');
}

function getItem(image, type, detail){
  const item = `<li class="gallery--item">
  <img src =${image} alt="${type} cat" class="gallery--item_image data-detailed-image=${image} data-detailed-title= ${detail}>
  <span class="gallery--item_title">${type} cat</span>
  </li>`
  return item;
}

function animate() {
  detailedImage.classList.remove("animation-up");
  detailedTitle.classList.remove("animation-down");
  setTimeout(function () {
    detailedImage.classList.add("animation-up");
    detailedTitle.classList.add("animation-down");
  }, 0);
}

