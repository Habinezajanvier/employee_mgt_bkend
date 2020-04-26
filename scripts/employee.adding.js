let emName = document.getElementById("name");
let emIdNumber = document.getElementById("id-number");
let emEmail = document.getElementById("email");
let emPosition = document.getElementById("position");
let emPhoneNumber = document.getElementById("phone-number");
let emBirthDate = document.getElementById("birth-date");

let employeeAddingForm = document.getElementById("employee-adding");

let error = document.querySelector(".error");
let load = document.querySelector(".load");

const url = "https://em-management.herokuapp.com";
const myToken = localStorage.getItem("token");

const inputReturn = () => {
  emName.value = "";
  emIdNumber.value = "";
  emEmail.value = "";
  emPosition.value = "";
  emPhoneNumber.value = "";
  emBirthDate.value = "";
  error.innerHTML = "";
};

/**
 * Function to consume add employee API
 */
const submit = (data) => {
  /**
   * Loading while waiting for the response
   */
  load.innerHTML = `<div class="loader"></div>`;
  /**
   * ******************************************
   * ******************************************
   */
  fetch(`${url}/company/employees`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authentication: myToken,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((myJson) => {
      if (myJson.error) {
        load.innerHTML = "";
        error.style.color = "rgb(174, 44, 12)";
        error.innerHTML = `${myJson.error}`;
      } else {
        load.innerHTML = "";
        error.style.color = "rgb(3, 252, 15)";
        error.innerHTML = `${myJson.msg}`;
        setTimeout(() => {
          inputReturn();
        }, 4000);
      }
    })
    .catch((err) => {
      error.style.color = "rgb(174, 44, 12)";
      error.innerHTML = "Something went wrong, try again";
    });
};

/**
 * Validating inputs before being sent to server
 * if(!validData) return false; else(submit data)
 */

const verify = (name, idNumber, phoneNumber, email, date, position, obj) => {
  const nameFormat = /^[a-z ,.'-]+$/i;
  const emailFormat = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
  const dateFormat = /^([0-2][1-9]|[1-3][0-1])(\/)(((0)[1-9])|((1)[0-2]))(\/)\d{4}$/i;
  const phoneFormat = /^\+2507/;

  if (!nameFormat.test(name)) {
    error.style.color = "rgb(174, 44, 12)";
    error.innerHTML = "Name is not valid";
    return false;
  }
  if (idNumber.length != 16) {
    error.style.color = "rgb(174, 44, 12)";
    error.innerHTML = "ID Number must be a Rwandan ID";
    return false;
  }
  if (!phoneFormat.test(phoneNumber) && phoneNumber.length < 13) {
    error.style.color = "rgb(174, 44, 12)";
    error.innerHTML = "Phone number must be of format [+2507...]";
    return false;
  }
  if (!emailFormat.test(email)) {
    error.style.color = "rgb(174, 44, 12)";
    error.innerHTML = "Email should look like test@gmail.com";
    return false;
  }
  if (!nameFormat.test(position)) {
    error.style.color = "rgb(174, 44, 12)";
    error.innerHTML = position;
    return false;
  }
  if (!dateFormat.test(date)) {
    error.style.color = "rgb(174, 44, 12)";
    error.innerHTML = "Use DD/MM/YYYY format as birth date";
    return false;
  } else {
    submit(obj);
  }
};

employeeAddingForm.onsubmit = (e) => {
  e.preventDefault();
  const employeeName = emName.value;
  const idNumber = emIdNumber.value;
  const email = emEmail.value;
  const phoneNumber = emPhoneNumber.value;
  const position = emPosition.value;
  const birthDate = emBirthDate.value;

  const options = {
    employeeName,
    idNumber,
    phoneNumber,
    email,
    position,
    birthDate,
  };

  verify(
    employeeName,
    idNumber,
    phoneNumber,
    email,
    birthDate,
    position,
    options
  );
};
