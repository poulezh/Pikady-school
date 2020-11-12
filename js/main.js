const firebaseConfig = {
  apiKey: "AIzaSyBAhQfF2h4iE0QFXe9x7Th5XgiDzhTRZPE",
  authDomain: "pikady-app.firebaseapp.com",
  databaseURL: "https://pikady-app.firebaseio.com",
  projectId: "pikady-app",
  storageBucket: "pikady-app.appspot.com",
  messagingSenderId: "987269790412",
  appId: "1:987269790412:web:cc8576c1c533f626ea6069"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log(firebaseConfig);

// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 


const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignUp = document.querySelector('.login-signup');
const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');
const exitElem = document.querySelector('.exit');
const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');
const editUserName = document.querySelector('.edit-username');
const editPhotoUrl = document.querySelector('.edit-photo');
const userAvatarElem = document.querySelector('.user-avatar');
const postWrapper = document.querySelector('.posts');

const buttonNewPost = document.querySelector('.button-new-post');
const addPostElem = document.querySelector('.add-post')




const listUsers = [
  {
    id: '01',
    email: 'poulezh@mail.com',
    password: '12345',
    displayName: 'Ezh',
    photo: ''
  },
  {
    id: '02',
    email: 'gorills@mail.com',
    password: '54321',
    displayName: 'Gorills'
  }
];

const setUsers = {
  user: null,
  logIn(email, password, handler) {
    if (!regExpValidEmail.test(email)) return alert ('email no valid')
    const user = this.getUser(email);
    if(user && user.password === password) {
      this.authorizeUser(user);
      handler()
    } else {
      alert('пользователь с такими данными не найден')
    }
    
  },
  logOut(handler){
    this.user = null;
    handler()

  },
  signUp(email,password, handler){
    if (!regExpValidEmail.test(email)) return alert ('email no valid')
    //регистрация
    if(!email.trim() || !password.trim()) {
      alert ('ведите данные')
      return;
    }
    if (!this.getUser(email) ){
      const user = {email,password, displayName: email.substring(0, email.indexOf('@'))}
      listUsers.push(user);
      this.authorizeUser(user)
      handler()
    } else {
      alert('пользователь с таким email  уже зареген')
    }
  },
  editUser (userName, userPhoto,handler ) {
    if(userName) {
      this.user.displayName = userName
    }
    if(userPhoto) {
      this.user.photo = userPhoto;
    }
    handler()
  },
  getUser(email) {
    //перебираем масив и ищеи мыло
  return listUsers.find(item => item.email === email)
  },
  authorizeUser(user) {
    this.user = user;
  }
};

const setPosts = {
  allPost: [
    {
      title: 'заголовок поста',
      text: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты.Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!",
      tags: [
        'свежее',
        'новое',
        'горячее',
        'мое',
        'случайность'
      ],
      author: {displayName: 'ezh', photo: 'data:image/jpeg;base64,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'},
      data: '11.11.2020, 20:54:00',
      like: 15,
      comments: 20
    },
    {
      title: 'заголовок поста',
      text: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты.Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!",
      tags: [
        'свежее',
        'новое',
        'горячее',
        'мое',
        'случайность'
      ],
      author: {displayName: 'kate', photo: ''},
      data: '10.11.2020, 21:54:00',
      like: 112,
      comments: 10
    },
    ],
    addPost(title, text, tags, handler) {

      this.allPost.unshift({
        title,
        text,
        tags: tags.split(',').map(item => item.trim()),
        author: {
          displayName: setUsers.user.displayName,
          photo: setUsers.user.photo,
        },
        data: new Date().toLocaleString(),
        like:0,
        comments: 0,
      })

      if (handler){
        handler()
      }

    }
}

const toggleAuthDom = () =>{
  const user = setUsers.user;
  if (user) {
    loginElem.style.display = 'none'
    userElem.style.display = ''
    userNameElem.textContent = user.displayName
    userAvatarElem.src = user.photo || userAvatarElem.src;
    buttonNewPost.classList.add('visible');
  }  else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
    buttonNewPost.classList.remove('visible');
    addPostElem.classList.remove('visible');
    postWrapper.classList.add('visible')

  }
}
const showAddPost = () =>{
  addPostElem.classList.add('visible')
  postWrapper.classList.remove('visible')
}


const showAllPosts = () => {

  addPostElem.classList.remove('visible')
  postWrapper.classList.add('visible')

  let postsHTML = '';
  setPosts.allPost.forEach(post => {

    const { title,text,data,tags, like,comments,author} = post;

    postsHTML += `
    <section class="post">
    <div class="post-body">
      <h2 class="post-title">${title}</h2>
      <p class="post-text">${text}</p>
      <div class="tags">
      ${tags.map(tag =>  `<a href=${tag} class="tag">#${tag} </a>`)}
      </div>
    </div>
    <div class="post-footer">
      <div class="post-buttons">
        <button class="post-button likes">
          <svg width="19" height="20" class="icon icon-like">
            <use xlink:href="img/icons.svg#like"></use>
          </svg>
          <span class="likes-counter">${like}</span>
        </button>
        <button class="post-button comments">
          <svg width="21" height="21" class="icon icon-comment">
            <use xlink:href="img/icons.svg#comment"></use>
          </svg>
          <span class="comments-counter">${comments}</span>
        </button>
        <button class="post-button save">
          <svg width="19" height="19" class="icon icon-save">
            <use xlink:href="img/icons.svg#save"></use>
          </svg>
        </button>
        <button class="post-button share">
          <svg width="17" height="19" class="icon icon-share">
            <use xlink:href="img/icons.svg#share"></use>
          </svg>
        </button>
      </div>
      <!-- /.post-buttons -->
      <div class="post-author">
        <div class="author-about">
          <a href="#" class="author-username">${author.displayName}</a>
          <span class="post-time">${data}</span>
        </div>
        <a href="#" class="author-link"><img src=${author.photo || "img/avatar.jpeg"} alt="avatar" class="author-avatar"></a>
      </div>
      <!-- /.post-author -->
    </div>
    <!-- /.post-footer -->
  </section>
    `
  })

  postWrapper.innerHTML = postsHTML

  addPostElem.classList.remove('visible')
  postWrapper.classList.add('visible')
};



const init = () =>{

  loginForm.addEventListener('submit', event => {
    event.preventDefault();
    setUsers.logIn(emailInput.value,passwordInput.value, toggleAuthDom)
    loginForm.reset()
  })

  loginSignUp.addEventListener('click', event => {
    event.preventDefault()
    setUsers.signUp( emailInput.value, passwordInput.value, toggleAuthDom)
    loginForm.reset()
  });

  exitElem.addEventListener('click', event => {
    event.preventDefault();
    setUsers.logOut(toggleAuthDom);
  })

  editElem.addEventListener('click',event =>{
    event.preventDefault();
    editContainer.classList.toggle('visible');
    editUserName.value = setUsers.user.displayName
  })

  editContainer.addEventListener('submit', event =>{
    event.preventDefault();
    setUsers.editUser(editUserName.value, editPhotoUrl.value,toggleAuthDom)
    editContainer.classList.remove('.visible')
  })
  menuToggle.addEventListener('click', function (event) {
    // отменяем стандартное поведение ссылки
    event.preventDefault();
    // вешаем класс на меню, когда кликнули по кнопке меню 
    menu.classList.toggle('visible');
  });
  buttonNewPost.addEventListener('click', event =>{
    event.preventDefault();
    showAddPost();
  });
  addPostElem.addEventListener('submit', event =>{
    event.preventDefault()
    const {title, text, tags} = addPostElem.elements;
    
    if (title.value.length < 6) {
      alert ('слишком короткий заголовок');
      return
    }
    if(text.value.length <50) {
      alert ('слишком короткий пост');
      return
    }
    setPosts.addPost(title.value, text.value, tags.value, showAllPosts)
    addPostElem.classList.remove('visible')
    addPostElem.reset();
  })

  showAllPosts()
  toggleAuthDom()
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})
