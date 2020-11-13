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

console.log(firebase);

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
const addPostElem = document.querySelector('.add-post');

const DEFAULT_PHOTO = userAvatarElem.src;

const setUsers = {
  user: null,
  initUser(handler) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user
      } else {
        this.user = null;
      }
      if (handler) handler()
    })
  },
  logIn(email, password, handler) {
    if (!regExpValidEmail.test(email)){
      alert('email no valid');
      return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(err => {
        const errCode = err.code;
        const errMessage = err.message;
        if (errCode === 'auth/wrong-password') {
          alert('слабый пароль')
        } else if (errCode === 'auth/user-not-found') {
          console.log(errMessage);
          alert('пользователь не найден')
        } else {
          alert(errMessage)
        }
        console.log(err)
      })
  },
  logOut() {

    firebase.auth().signOut();

  },
  signUp(email, password, handler) {
    if (!regExpValidEmail.test(email)){
      alert('email no valid')
      return;    
    }

    if (!email.trim() || !password.trim()) {
      alert('ведите данные')
      return;
    }

    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        this.editUser(email.substring(0, email.indexOf('@')), null, handler)
      })
      .catch(err => {
        const errCode = err.code;
        const errMessage = err.message;
        if (errCode === 'auth/weak-password') {
          alert('слабый пароль')
        } else if (errCode === 'auth/email-already-in-use') {
          console.log(errMessage);
          alert('пользователь с таким мылом уже есть')
        } else {
          alert(errMessage)
        }
        console.log(err);
      });

    /* if (!this.getUser(email) ){
       const user = {email,password, displayName: email.substring(0, email.indexOf('@'))}
       listUsers.push(user);
       this.authorizeUser(user)
       handler()
     } else {
       alert('пользователь с таким email  уже зареген')
     }*/
  },
  editUser(displayName, photoURL, handler) {

    const user = firebase.auth().currentUser;

    if (displayName) {
      if (photoURL) {
        user.updateProfile({
          displayName,
          photoURL
        }).then(handler)
      } else {
        user.updateProfile({
          displayName
        }).then(handler)
      }
    }
  },
  sendForget(email) {
    firebase.auth().sendPasswordResetEmail(email)
    .then(() =>{
      alert('письмо отправлено')
    })
    .catch( err =>{
      console.log(err);
    })
  }
};

const loginForget = document.querySelector('.login-forget')

loginForget.addEventListener('click',event =>{
  event.preventDefault();

  setUsers.sendForget(emailInput.value);
  emailInput.value = '';;
})


const setPosts = {
  allPost: [],
  addPost(title, text, tags, handler) {

    const user = firebase.auth().currentUser;

    this.allPost.unshift({
      id: `postID${(+new Date()).toString(16)}-${user.uid}`,
      title,
      text,
      tags: tags.split(',').map(item => item.trim()),
      author: {
        displayName: setUsers.user.displayName,
        photo: setUsers.user.photoURL,
      },
      data: new Date().toLocaleString(),
      like: 0,
      comments: 0,
    })

    firebase.database().ref('post').set(this.allPosts)
    .then(() =>this.getPosts(handler))

  },
  getPosts(handler){
    firebase.database().ref('post').on('value', snapshot =>{
      this.allPosts = snapshot.val() || [];
      handler()
    })
  }
}

const toggleAuthDom = () => {
  const user = setUsers.user;
  if (user) {
    loginElem.style.display = 'none'
    userElem.style.display = ''
    userNameElem.textContent = user.displayName
    userAvatarElem.src = user.photoURL || DEFAULT_PHOTO;
    buttonNewPost.classList.add('visible');
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
    buttonNewPost.classList.remove('visible');
    addPostElem.classList.remove('visible');
    postWrapper.classList.add('visible')
  }
}
const showAddPost = () => {
  addPostElem.classList.add('visible')
  postWrapper.classList.remove('visible')
}


const showAllPosts = () => {

  let postsHTML = '';

  setPosts.allPost.forEach(post => {

    const { title, text, data, tags, like, comments, author } = post;

    postsHTML += `
    <section class="post">
    <div class="post-body">
      <h2 class="post-title">${title}</h2>
      <p class="post-text">${text}</p>
      <div class="tags">
      ${tags.map(tag => `<a href=${tag} class="tag">#${tag} </a>`)}
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



const init = () => {

  loginForm.addEventListener('submit', event => {
    event.preventDefault();
    setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom)
    loginForm.reset()
  })

  loginSignUp.addEventListener('click', event => {
    event.preventDefault()
    setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom)
    loginForm.reset()
  });

  exitElem.addEventListener('click', event => {
    event.preventDefault();
    setUsers.logOut();
  })

  editElem.addEventListener('click', event => {
    event.preventDefault();
    editContainer.classList.toggle('visible');
    editUserName.value = setUsers.user.displayName
  })

  editContainer.addEventListener('submit', event => {
    event.preventDefault();
    setUsers.editUser(editUserName.value, editPhotoUrl.value, toggleAuthDom)
    editContainer.classList.remove('.visible')
  })
  menuToggle.addEventListener('click', function (event) {
    // отменяем стандартное поведение ссылки
    event.preventDefault();
    // вешаем класс на меню, когда кликнули по кнопке меню 
    menu.classList.toggle('visible');
  });
  buttonNewPost.addEventListener('click', event => {
    event.preventDefault();
    showAddPost();
  });
  addPostElem.addEventListener('submit', event => {
    event.preventDefault()
    const { title, text, tags } = addPostElem.elements;

    if (title.value.length < 6) {
      alert('слишком короткий заголовок');
      return
    }
    if (text.value.length < 50) {
      alert('слишком короткий пост');
      return
    }
    setPosts.addPost(title.value, text.value, tags.value, showAllPosts)
    addPostElem.classList.remove('visible')
    addPostElem.reset();
  })

  setUsers.initUser(toggleAuthDom)
  setPosts.getPosts(showAllPosts)

}

document.addEventListener('DOMContentLoaded', init)