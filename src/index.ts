import './assets/styles/main.css';
import { darkMode, alertFunction } from './model/other';
import { MainService } from './service/main';
darkMode();

const switchLoginFormBtn = document.querySelector<HTMLDivElement>('.login-btn')!;
const switchRegisterFormBtn = document.querySelector<HTMLDivElement>('.create-btn')!;
const loginForm = document.querySelector<HTMLFormElement>('.login-form')!;
const registerForm = document.querySelector<HTMLFormElement>('.sign-form')!;

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
const productAddBtn = document.querySelector<HTMLButtonElement>('.product-add-btn')!;
const productAddImgBtn = document.querySelector<HTMLButtonElement>('.get-img-btn')!;



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
  registerFirsname.value = "";
  registerUsername.value = "";
  registerPassword.value = "";
  const getCurrentUser = JSON.parse(localStorage.getItem('currentUser')!); 
  console.log("currentUser" , getCurrentUser);
  
  console.log('users = ', mainService.getUserList());
});
