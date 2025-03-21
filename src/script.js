const detailedImage = document.querySelector(".detailedContainer--image");
const detailedTitle = document.querySelector(".detailedContainer--title");
const galleryImages = document.querySelectorAll(".gallery--item_image");
for (let i = 0; i < galleryImages.length; i++) {
  galleryImages[i].addEventListener("click", function () {
    setDetails(galleryImages[i]);
  });
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
function animate() {
  detailedImage.classList.remove("animation-up");
  detailedTitle.classList.remove("animation-down");
  setTimeout(function () {
    detailedImage.classList.add("animation-up");
    detailedTitle.classList.add("animation-down");
  }, 0);
}
