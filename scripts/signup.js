let myName = document.getElementById ('name');
let number = document.getElementById ('number');
let myEmail = document.getElementById ('email');
let myPassword = document.getElementById ('password');
let myPosition = document.getElementById ('position');
let myBirthDate = document.getElementById ('birthdate');

let load = document.querySelector ('.load');
let error = document.querySelector ('.error');
let form = document.getElementById ('signup');

/**
 * This is fetch function to consume register API
 */
const submit = data => {
  /**
     * Loading while waiting for the response
     */
  load.innerHTML = `<div class="loader"></div>`;
  /**
   * ******************************************
   * ******************************************
   */
  fetch ('https://em-management.herokuapp.com/company/register', {
    method: 'POST',
    headers: {
      accept: 'application/json, texp/plain',
      'content-Type': 'application/json',
    },
    body: JSON.stringify (data),
  })
    .then (res => res.json ())
    .then (myJson => {
      if (myJson.error) {
        load.innerHTML = '';
        error.style.color = 'rgb(174, 44, 12)';
        error.innerHTML = `${myJson.error}`;
      } else {
        load.innerHTML = '';
        error.style.color = 'rgb(3, 252, 15)';
        error.innerHTML = `${myJson.msg}`;
        setTimeout (() => {
          window.location = './login.html';
        }, 4000);
      }
    })
    .catch (err => {
      load.innerHTML = '';
      error.style.color = 'rgb(174, 44, 12)';
      error.innerHTML = `Something went wrong, Try again`;
    });
};
/**
 * Verifying if the user send valid data;
 * if (!validData) return else submit to the server
 */

const verify = (name, number, email, password, position, date, obj) => {
  const nameFormat = /^[a-z ,.'-]+$/i;
  const emailFormat = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
  const dateFormat = /^([0-2][1-9]|[1-3][0-1])(\/)(((0)[1-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (!nameFormat.test (name)) {
    error.style.color = 'rgb(174, 44, 12)';
    error.innerHTML = 'Name should be provided and valid';
    return false;
  }
  if (number.length != 16) {
    error.style.color = 'rgb(174, 44, 12)';
    error.innerHTML = 'Please use valid national ID number';
    return false;
  }
  if (password.length < 3) {
    error.style.color = 'rgb(174, 44, 12)';
    error.innerHTML =
      'Please create strong password, at least 3 characters long';
    return false;
  }
  if (!emailFormat.test (email)) {
    error.style.color = 'rgb(174, 44, 12)';
    error.innerHTML = 'Email shoulld look like test@gmail.com';
    return false;
  }
  if (!nameFormat.test (position)) {
    error.style.color = 'rgb(174, 44, 12)';
    error.innerHTML = 'Position should be provided and valid';
    return false;
  }
  if (!dateFormat.test (date)) {
    error.style.color = 'rgb(174, 44, 12)';
    error.innerHTML = 'Your birth date should be like DD/MM/YYYY';
    return false;
  } else {
    /**
       * Function to consume register API
       */
    submit (obj);
  }
};

form.onsubmit = e => {
  e.preventDefault ();
  const employeeName = myName.value;
  const idNumber = number.value;
  const email = myEmail.value;
  const password = myPassword.value;
  const position = myPosition.value;
  const birthDate = myBirthDate.value;

  const options = {
    employeeName,
    idNumber,
    email,
    password,
    position,
    birthDate,
  };

  verify (
    employeeName,
    idNumber,
    email,
    password,
    position,
    birthDate,
    options
  );
};
