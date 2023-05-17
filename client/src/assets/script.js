const redirectButton = document.querySelector('#redirect-button');
const registerForm = document.querySelector('.register-form');
const loginForm = document.querySelector('.login-form');

redirectButton.addEventListener('click', () => {
  if (registerForm.classList.contains('turn-page')) {
    registerForm.classList.remove('turn-page');
    loginForm.classList.add('turn-page');
  } else {
    loginForm.classList.remove('turn-page');
    registerForm.classList.add('turn-page');
  }
});
