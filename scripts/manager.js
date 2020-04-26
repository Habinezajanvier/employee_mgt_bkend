const logOut = document.getElementById ('log-out');
const accName = document.getElementById ('account-name');
const accData = document.getElementById ('my-data');
/**
 * const url = 'https://em-management.herokuapp.com';
 * const myToken = localStorage.getItem('token');
 *
 * *********Declared in employee.adding.js***********************************
 */

window.onload = () => {
  if (!myToken) {
    window.location = './index.html';
  }
  fetch (`${url}/company/me`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authentication: myToken,
    },
  })
    .then (res => res.json ())
    .then (myJson => {
      if (myJson.error) {
        localStorage.clear ('token');
        location = './index.html';
      } else {
        accName.innerHTML = myJson.employeeName;
        accData.innerHTML = `<div>
        <p>${myJson.email}</p>
        <p>${myJson.idNumber}</p>
        <p>${myJson.position}</p>
        </div>`;
      }
    })
    .catch (err => console.log (err));
};

/**
 * Returning to the index.html once Log out is clicked on
 */
logOut.onclick = () => {
  localStorage.clear ('token');
  location = './index.html';
};
