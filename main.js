import { PRODUCTS } from './constants';
import './style.css';
import './components/footer/styles.css';
import './components/navbar/styles.css';

const app = document.querySelector('#app');
const containerProducts = document.createElement('div');
const containerFilters = document.createElement('div');
app.appendChild(containerFilters);
app.appendChild(containerProducts);
containerProducts.classList.add('containerProducts');
containerFilters.classList.add('containerFilters');

//Templates
function getProductsTemplate(product) {
  containerProducts.innerHTML += `<div class="product">
  <img src= ${product.image}> 
  <h4>${product.name}</h4>
  <span>${product.price} €</span>
  <button>Agregar al carrito </button>
  <div>`;
}
PRODUCTS.forEach(getProductsTemplate);

//Filters Template
const fandomList = [];
function getFandomFinalList() {
  const fandomFullList = PRODUCTS.map((product) => product.category);
  for (let categorie of fandomFullList) {
    if (!fandomList.includes(categorie)) {
      fandomList.push(categorie);
    }
  }
  return fandomList;
}

function getFiltersTemplate() {
  return ` <h4>Fandom</h4>
    <ul class="fandomList"></ul>
    <h4>Precio</h4>
    <div class="priceContainer">
    <input type="number" min="0" id="price-filter-min" placeholder="Mín.">-
    <input type="number" min="1" max="50" id="price-filter-max" placeholder="Max.">
    </div>
    <button class="filter">Filtrar</button>
    <button class="resetFilters">Limpiar filtros</button>`;
}

function createFandomCategories() {
  const ul = document.querySelector('.fandomList');
  for (let i = 0; i < fandomList.length; i++) {
    const li = document.createElement('li');
    li.innerHTML = `<label for=${fandomList[i]}>
    <input type="checkbox" name=${fandomList[i]} id=${fandomList[i]} value=${fandomList[i]}>
    ${fandomList[i]}</label>`;
    ul.appendChild(li);
  }
}

//Filters
function addListeners() {
  const buttonFilter = document.querySelector('.filter');
  buttonFilter.addEventListener('click', handleClickFilter);
  const buttonResetFilters = document.querySelector('.resetFilters');
  buttonResetFilters.addEventListener('click', handleClicResetkFilter);
}
function handleClicResetkFilter() {
  inputPriceMax.value = '';
  inputPriceMin.value = '';
  for (let input of fandomInputs) {
    input.checked=false;
  }
  containerProducts.innerHTML = '';
  PRODUCTS.forEach(getProductsTemplate);
}
const handleClickFilter = () => {
  const categoriesChecked = [];
  for (let input of fandomInputs) {
    if (input.checked) {
      if (input.value === 'Harry') {
        categoriesChecked.push('Harry Potter');
      } else {
        categoriesChecked.push(input.value);
      }
    }
  }
  const filteredProducts = PRODUCTS.filter((product) => {
    if (
      (categoriesChecked.includes(product.category) ||
        categoriesChecked.length === 0) &&
      (inputPriceMin.value <= product.price || inputPriceMin.value === '') &&
      (product.price <= inputPriceMax.value || inputPriceMax.value === '')
    ) {
      return product;
    }
  });
  containerProducts.innerHTML = '';
  filteredProducts.forEach(getProductsTemplate);
};

containerFilters.innerHTML += getFiltersTemplate();
getFandomFinalList();
createFandomCategories();
addListeners();
const inputPriceMax = document.getElementById('price-filter-max');
const inputPriceMin = document.getElementById('price-filter-min');
const fandomInputs = document.querySelectorAll('ul input[type=checkbox]');