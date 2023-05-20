import './assets/styles/main.css';
import { darkMode, alertFunction } from './model/other';
import { MainService } from './service/main';
import { Laptop } from './model/product/laptop';
import { TV } from './model/product/tv';
import { Monitor } from './model/product/monitor';
import { Phone } from './model/product/phone';
import { Product } from './model/product/product';

darkMode();

const switchLoginFormBtn = document.querySelector<HTMLDivElement>('.login-btn')!;
const switchRegisterFormBtn = document.querySelector<HTMLDivElement>('.create-btn')!;
const loginForm = document.querySelector<HTMLFormElement>('.login-form')!;
const registerForm = document.querySelector<HTMLFormElement>('.sign-form')!;
const cabinetPage = document.querySelector<HTMLDivElement>('.cabinet')!;
const loginPage = document.querySelector<HTMLDivElement>('.login-page')!;
const addProductCategory = document.querySelector<HTMLSelectElement>('.category')!;

const loginUsername = document.querySelector<HTMLInputElement>('#login-username')!;
const loginPassword = document.querySelector<HTMLInputElement>('.login-password')!;
const registerFirsname = document.querySelector<HTMLInputElement>('.sign-firsname')!;
const registerLastname = document.querySelector<HTMLInputElement>('.sign-lastname')!;
const registerUsername = document.querySelector<HTMLInputElement>('#sign-username')!;
const registerPassword = document.querySelector<HTMLInputElement>('.sign-password')!;

const productName = document.querySelector<HTMLInputElement>('.product-name')!;
const productPrice = document.querySelector<HTMLInputElement>('.product-price')!;
const productBrand = document.querySelector<HTMLInputElement>('.product-brand')!;
const productImg = document.querySelector<HTMLInputElement>('.product-img')!;
const productDescription = document.querySelector<HTMLInputElement>('.product-description')!;
const productForm = document.querySelector<HTMLFormElement>('.product-form')!;
const productAddImgBtn = document.querySelector<HTMLButtonElement>('.get-img-btn')!;
const productShowImg = document.querySelector<HTMLDivElement>('.product-show-img')!
const productImgPlace = document.querySelector<HTMLDivElement>('.product-img-place')!

const productsBox = document.querySelector<HTMLDivElement>('.products-box')
const allProductsBox = document.querySelector<HTMLDivElement>('.all-products-box')





const productType: string[] = ['LAPTOP', 'PHONE', 'TV', 'MONITOR'];

for (let i = 0; i < productType.length; i++) {
  let options = document.createElement('option');
  options.text = productType[i];
  options.value = productType[i];
  addProductCategory.appendChild(options);
}
for (let i = 0; i < productType.length; i++) {
  let options = document.createElement('option');
  options.text = productType[i];
  options.value = productType[i];
  addProductCategory.appendChild(options);
}

function switchPage(active: boolean) {
  localStorage.setItem("cabinate", JSON.stringify(active));
  let getCabinate = JSON.parse(localStorage.getItem("cabinate")!);
  if (getCabinate) {
    loginPage.classList.add("hide");
    cabinetPage.classList.remove("hide");
  }
  else {
    cabinetPage.classList.add("hide");
    loginPage.classList.remove("hide");
  }
}

const mainService = new MainService();

function switchForm(hide: any, show: any) {
  hide.classList.add('hide');
  show.classList.remove('hide');
}

switchRegisterFormBtn.addEventListener('click', () => {
  return switchForm(loginForm, registerForm);
});

switchLoginFormBtn.addEventListener('click', () => {
  return switchForm(registerForm, loginForm);
});

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = loginUsername.value;
  const password = loginPassword.value;

  mainService.signIn(username, password);
  console.log('users = ', mainService.getUserList());
});

registerForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = registerFirsname.value;
  const username = registerUsername.value;
  const password = registerPassword.value;
  try {
    mainService.signUp(name, username, password);
    let currentUser = mainService.getUserByUsername(username);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    loginPage.classList.add('hide');
    cabinetPage.classList.remove('hide');
  } catch (err: any) {
    alertFunction(`${err.message}`, false);
  }
  registerFirsname.value = '';
  registerUsername.value = '';
  registerPassword.value = '';
  const getCurrentUser = JSON.parse(localStorage.getItem('currentUser')!);
  console.log('currentUser', getCurrentUser);

  console.log('users = ', mainService.getUserList());
});

productForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = productName.value;
  const brand = productBrand.value;
  const price = productPrice.value;
  const img = productImg.value;
  const description = productDescription.value;

  if (addProductCategory && addProductCategory.selectedIndex == 0) {
    alertFunction('Kategoryani tanglang', false);
  } else {
    if (!name || !brand || !price || !img || !description) {
      alertFunction("Formani to'diring!", false);
    } else {
  
      switch (addProductCategory.value) {
        case 'LAPTOP':
          let newLaptop = new Laptop(name, parseInt(price), brand, img, description);
          mainService.addProduct(newLaptop);
          break;
        case 'PHONE':
          let newPhone = new Phone(name, parseInt(price), brand, img, description);
          mainService.addProduct(newPhone);
          break;
        case 'TV':
          let newTv = new Phone(name, parseInt(price), brand, img, description);
          mainService.addProduct(newTv);
          break;
        case 'MONITOR':
          let newMonitor = new Phone(name, parseInt(price), brand, img, description);
          mainService.addProduct(newMonitor);
          break;
        default:
          break;
      }
      console.log("All products list",mainService.getProductList());
      
      
      productsBox.classList.remove("hide");

      let productsList = JSON.parse(localStorage.getItem("productsList"));
      if (productsList) {
        let productDiv = document.createElement("div");
        productDiv.className = "product";

        let productContent = document.createElement("div");
        productContent.className = "product-content";

        let productImage = document.createElement("img");
        productImage.src = img;

        let productH2 = document.createElement("h2");
        productH2.textContent = name;

        let productP = document.createElement("p");
        productP.textContent = description;

        let productSpan = document.createElement("span");
        productSpan.textContent = price;

        productContent.append(productH2, productP, productSpan);
        productDiv.append(productImage, productContent);

        productsBox.appendChild(productDiv);
      }
      else {
        let text = document.createElement("h2");
        text.textContent = "Product not found";
        productsBox.appendChild(text);
      }

    }
  }
});

document.querySelector<HTMLButtonElement>(".show-all-products").addEventListener("click", () => {
  allProductsBox.classList.remove("hide");
  let list = mainService.getProductList();
  // if (productsList) {
    for (const product of list) {
      let productDiv = document.createElement("div");
      productDiv.className = "product";

      let productContent = document.createElement("div");
      productContent.className = "product-content";

      let productImage = document.createElement("img");
      productImage.src = product.img;

      let productH2 = document.createElement("h2");
      productH2.textContent = product.getName();

      let productP = document.createElement("p");
      productP.textContent = product.description;

      let productSpan = document.createElement("span");
      productSpan.textContent = product.price.toString();

      productContent.append(productH2, productP, productSpan);
      productDiv.append(productImage, productContent);

      allProductsBox.appendChild(productDiv);
    }
  // }
  // else {
  //   let text = document.createElement("h2");
  //   text.textContent = "Product not found";
  //   productsBox.appendChild(text);
  // }
})

productShowImg.addEventListener('click', () => {
  let newImg = document.createElement('img');
  newImg.src = productImg.value;
  productImgPlace.appendChild(newImg);
})