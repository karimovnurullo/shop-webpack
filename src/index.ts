import './assets/styles/main.css';
import { darkMode, alertFunction } from './model/other';
import { MainService } from './service/main';
import { Laptop } from './model/product/laptop';
import { TV } from './model/product/tv';
import { Monitor } from './model/product/monitor';
import { Phone } from './model/product/phone';

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

const productType: string[] = ['LAPTOP', 'PHONE', 'TV', 'MONITOR'];

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
          console.log(new Laptop(name, parseInt(price), brand, img, description));
          break;
        case 'PHONE':
          console.log(new Phone(name, parseInt(price), brand, img, description));
          break;
        case 'TV':
          console.log(new TV(name, parseInt(price), brand, img, description));
          break;
        case 'MONITOR':
          console.log(new Monitor(name, parseInt(price), brand, img, description));
          break;
        default:
          break;
      }
      // let image = document.createElement('img');
      // image.src = img;
      // cabinetPage.appendChild(image);
    }
  }
});


