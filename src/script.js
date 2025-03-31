
const gallery = document.getElementById("gallery");
const formElement = document.getElementById("query-form");
const inputElements = document.querySelectorAll("#query-form [name]");
const detailedImage = document.querySelector(".detailedContainer--image");
const detailedTitle = document.querySelector(".detailedContainer--title");
const mainElement = document.querySelector(".main");
const buttonBack = document.querySelector(".button-back");
const logo = document.getElementById("logo")

let galleryImages;
let year;
let page = 1;
const LANG = 'en-US';
const urlImages = 'https://www.themoviedb.org/t/p/w1280/'
const apiKey = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTkzZmQ0ZjAxYWQyMWU1NmUxMTZlZGM4MzI2NDM4NSIsIm5iZiI6MTc0MzA4MDk5OC41MTUsInN1YiI6IjY3ZTU0ZTI2Zjg0Njc5NGU5OTEwYWY4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7A7Xpob6q6Lt7WsFIUwMAGUmTlnapruvzWDFQ9gvX_4'

async function drawGalleryItems() {
  const response = await fetch(getFetchUrl(LANG, page, year), {
    headers: {
      accept: 'application/json',
      Authorization: apiKey
    }
  })
  const data = await response.json();
  const itemsData = getItemsData(data);
  const items = getItems(itemsData);
  gallery.innerHTML = items;
  galleryImages = document.querySelectorAll(".gallery--item_image");
  
  addListeners();
  logo.innerHTML = `Best movies of ${year}`
  detailedImage.src = "images/default.jpg";
  detailedTitle.innerHTML = 'Please select a movie for getting description';
}

function getFetchUrl(lang, page, year) {
  return `https://api.themoviedb.org/3/discover/movie?
include_adult=false&
include_video=false&
language=${lang}&
page=${page}&
primary_release_year=${year}&
sort_by=popularity.desc`
}

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
  const itemsData = data.results.map(record => ({
    itemImage: getImage(record.poster_path), 
    detailedImage: getImage(record.backdrop_path),
    title: record.title,
    detailedTitle: record.overview
  }))
  return itemsData;
}

function getImage(id) {
  return `${urlImages}${id}`
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
    alt = "${title} image" 
    class = "gallery--item_image" 
    data-detailed-image = "${detailedImage}"
    data-detailed-title = "${detailedTitle}">
  <span class = "gallery--item_title">${title}</span>
  </li>`;
  return item;
}

function getButtonNext(){
  return `<button class="button button-next">Next</button>`
}


function animate() {
  detailedImage.classList.remove("animation-up");
  detailedTitle.classList.remove("animation-down");
  setTimeout(function () {
    detailedImage.classList.add("animation-up");
    detailedTitle.classList.add("animation-down");
  }, 0);
}

//script actions
formElement.addEventListener("submit", async function(event){
  event.preventDefault();
  const data = getFormData();
  year = +data.year;
  await drawGalleryItems();
  mainElement.classList.remove("hidden");
  buttonBack.classList.remove("hidden")
  formElement.classList.add("hidden");
})

function getFormData() {
  const inputElementsArr = Array.from(inputElements);
  const dataObj = inputElementsArr.reduce((res, curr) => ({...res, [curr.name] : curr.value}), {})
  return dataObj
}

function moveToInputData() {
  mainElement.classList.add("hidden");
  buttonBack.classList.add("hidden")
  formElement.classList.remove("hidden");
}

