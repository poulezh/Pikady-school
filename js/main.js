// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню 
  menu.classList.toggle('visible');
})

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignUp = document.querySelector('.login-signup');

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');

const listUsers = [
  {
    id: '01',
    email: 'poulezh@mail.com',
    password: '12345',
    displayName: 'Ezh'
  },
  {
    id: '02',
    email: ' gorills@mail.com',
    password: '54321',
    displayName: 'Gorills'
  }
];

const setUsers = {
  user: null,
  logIn(email, password, handler) {
    const user = this.getUser(email);
    if(user && user.password === password) {
      this.authorizeUser(user);
      handler()
    } else {
      alert('пользователь с такими данными не найден')
    }
    
  },
  logOut(){
    console.log('выход');

  },
  signUp(email,password, handler){
    //регистрация
    if (!this.getUser(email)){
      const user = {email,password, displayName: email}
      listUsers.push(user);
      this.authorizeUser(user)
      handler()
    } else {
      alert('пользователь с таким email  уже зареген')
    }
  },
  getUser(email) {
    //перебираем масив и ищеи мыло
  return listUsers.find(item => item.email === email)
  },
  authorizeUser(user) {
    this.user = user;
  }
};

const toggleAuthDom = () =>{
  const user = setUsers.user;
  if (user) {
    loginElem.style.display = 'none'
    userElem.style.display = ''
    userNameElem.textContent = user.displayName
  }  else {
    loginElem.style.display = ''
    userElem.style.display = 'none'

  }
}

loginForm.addEventListener('submit', event => {
  event.preventDefault();
  setUsers.logIn(emailInput.value,passwordInput.value, toggleAuthDom)
})

loginSignUp.addEventListener('click', event => {
  event.preventDefault()
  setUsers.signUp( emailInput.value, passwordInput.value, toggleAuthDom)
})

toggleAuthDom()
