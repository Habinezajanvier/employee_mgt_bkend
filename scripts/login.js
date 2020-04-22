let form = document.getElementById ('login');
let username = document.getElementById ('username');
let password = document.getElementById ('password');
let error = document.querySelector ('.load');

/**
 * Verifying if user submitted valid data
 */
const verify = (username, password) => {
  const emailFormat = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;

  if (!emailFormat.test (username)) {
    error.innerHTML = 'Your username is not valid';
    return false;
  }
  if (password.length < 4) {
    error.innerHTML = 'Correct your password';
    return false;
  } else {
    /**
     * To make the loader
     */
    error.innerHTML = `<div class='loader'></div>`;
    /**
     * End of the our loader -- start of the function that have to consume login API
     */
    fetch ('https://em-management.herokuapp.com/company/login', {
      method: 'POST',
      headers: {
        accept: 'application/json, texp/plain',
        'content-Type': 'application/json',
      },
      body: JSON.stringify ({
        email: username,
        password: password,
      }),
    })
      .then (res => res.json ())
      .then (data => {
        if (data.token) {
          localStorage.setItem ('token', data.token);
          window.location = './employee.html';
        } else {
          error.innerHTML = data.msg;
          document.getElementById ('username').value = '';
          document.getElementById ('password').value = '';
        }
      })
      .catch (err => {
        error.innerHTML = 'Failed to Login, Try Again';
      });
  }
};

form.onsubmit = e => {
  e.preventDefault ();
  verify (username.value, password.value);
};
