const bodyclick = document.querySelector('.body');
const header__burger = document.querySelector('.burder_menu');
const header_menu = document.querySelector('.header__menu');
const header__overlay = document.querySelector('.header__overlay');
const header__menu__btn = document.querySelector('.header__menu-btn');
header__menu__btn.onclick = function(){
  changeClass();
}
header__burger.onclick = function(){
  changeClass();
}
header__overlay.onclick = function(){
  changeClass();
}
function changeClass(){
  bodyclick.classList.toggle('lock');
  header__burger.classList.toggle('active');
  header_menu.classList.toggle('active');
  header__overlay.classList.toggle('lock');
}