
const gallery = document.getElementById("gallery");
const detailedImage = document.querySelector(".detailedContainer--image");
const detailedTitle = document.querySelector(".detailedContainer--title");
let galleryImages;

drawGalleryItems();

async function drawGalleryItems() {
  const response = await fetch("https://api.thecatapi.com/v1/breeds");
  const data = await response.json();
  const itemsData = getItemsData(data); //input data from API, output array of objects 
   // {itemImage, detailedImage, title, detailedTitle}
  const items = getItems(itemsData);
  gallery.innerHTML = items;
  galleryImages = document.querySelectorAll(".gallery--item_image");
  addListeners();
}
blabala
function addListeners() {
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
    galleryImage.getAttribute("data-detailed-title");
  animate();
}

function getItemsData(data) {
  const itemsData = data.map(record => ({
    itemImage: getImage(record.reference_image_id), 
    detailedImage: getImage(record.reference_image_id),
    title: record.name,
    detailedTitle: record.description
  }))
  return itemsData;
}

function getImage(id) {
  return `https://cdn2.thecatapi.com/images/${id}.jpg`

}

function getItems(itemsData) {
  const items = itemsData.map(getItem);
  return items.join("");
}

function getItem({itemImage, detailedImage, title, detailedTitle}) {
  const item = `
  <li class = "gallery--item">
  <img 
    src = "${itemImage}" 
    alt = "${title} cat image" 
    class = "gallery--item_image" 
    data-detailed-image = "${detailedImage}"
    data-detailed-title = "${detailedTitle}">
  <span class = "gallery--item_title">${title} cat</span>
  </li>`;
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

