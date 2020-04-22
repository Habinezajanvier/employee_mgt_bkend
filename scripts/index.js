let inner = document.querySelector('.innerlogin');
let loginbtn = document.querySelector('.loginbtn');
let register = document.querySelector('.register');
let innerForm = document.getElementById('lgn');
let error = document.querySelector('.error');

const username = document.getElementById('username');
const password = document.getElementById('password');

//if someone clicked outside of the form but not on login button
document.onclick = (e) => {
  if (e.target.closest('.loginbtn')) {
    inner.style.display = 'inherit';
    inner.style.animation = 'popup 0.5s linear alternate';
  } else {
    if (e.target.closest('.innerlogin')) {
      inner.style.display = 'inherit';
    } else {
      inner.style.display = 'none';
    }
  }
};

register.addEventListener('click', () => {
  window.location = './signup.html';
});

/**
 * If our user inputs are valid, if (noValidInput) rutrun false
 * Else send the input to consume login Api
 */
const validate = (username, password) => {
  const emailFormat = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;

  if (!emailFormat.test(username)) {
    error.innerHTML = 'Your username is not valid';
    document.getElementById('username').value = '';
    return false;
  }
  if (password.length < 4) {
    error.innerHTML = 'Password must be at least 4 character long';
    document.getElementById('password').value = '';
    return false;
  } else {
    /**
     * To make the loader
     */
    error.innerHTML = `<div class='loader'></div>`;
    /**
     * End of the our loader -- start of the function that have to consume login API
     */
    fetch('https://em-management.herokuapp.com/company/login', {
      method: 'POST',
      headers: {
        accept: 'application/json, texp/plain',
        'content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          window.location = './employee.html';
        } else {
          error.innerHTML = data.msg;
          document.getElementById('username').value = '';
          document.getElementById('password').value = '';
        }
      })
      .catch((err) => {
        error.innerHTML = 'Failed to Login, Try Again';
      });
  }
};

/**
 * Once the form is submitted validate function must be called
 */
innerForm.onsubmit = (e) => {
  e.preventDefault();
  validate(username.value, password.value);
};
