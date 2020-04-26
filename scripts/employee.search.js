const searchForm = document.getElementById("em-srch-form");
const searchInput = document.getElementById("searching");
const searchResponse = document.querySelector(".searching-res");
const allEmployeeDisplay = document.querySelector(".employee-table");
const getAllEmployee = document.getElementById("all-employee");
const gettingAllEmployee = document.getElementById("all");

/**
 * const url = 'http://localhost:3000' || 'https://em-management.herokuapp.com';
 * const myToken = localStorage.getItem('token');
 *
 * *********Declared in employee.adding.js***********************************
 */

const searchSubmit = () => {
  load.innerHTML = `<div class="loader"></div>`;
  searchResponse.innerHTML = "";
  fetch(`${url}/company/employees/search`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authentication: myToken,
    },
    body: JSON.stringify({
      field: searchInput.value,
    }),
  })
    .then((res) => res.json())
    .then((myJson) => {
      if (myJson.error) {
        load.innerHTML = "";
        searchResponse.style.color = "rgb(174, 44, 12)";
        searchResponse.innerHTML = myJson.error;
        setTimeout(() => {
          searchResponse.innerHTML = "";
        }, 10000);
      } else {
        load.innerHTML = "";
        myJson.forEach((data) => {
          const response = document.createElement("div");
          response.innerHTML = `
          <div class='user'>
            <b>Name: ${data.employeeName}</b>
            <p><b>ID Number:</b> ${data.idNumber}</p>
            <p><b>Email:</b> ${data.email}</p>
            <p><b>Phone Number:</b> ${data.phoneNumber}</p>
            <p><b>Position:</b> ${data.position}</p>
            <p><b>Status:</b> ${data.status}</p>
            <p><b>Birth-Date:</b> ${data.birthDate}</p>
          </div>
          <div class='options'>
            ${editingOptions(data._id)}
          </div>
            `;
          searchResponse.append(response);
          setTimeout(() => {
            searchResponse.innerHTML = "";
          }, 240000);
        });
      }
    })
    .catch((err) => {
      searchResponse.style.color = "rgb(174, 44, 12)";
      searchResponse.innerHTML = "Something went wrong";
    });
};
/**
 * Fetching all employee to be displayed
 */
const fetchAll = () => {
  allEmployeeDisplay.innerHTML = "";
  fetch(`${url}/company/employees/all`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authentication: myToken,
    },
  })
    .then((res) => res.json())
    .then((myJson) => {
      if (myJson.error) {
        allEmployeeDisplay.innerHTML = myJson.error;
      } else {
        myJson.forEach((data) => {
          const displaying = document.createElement("div");
          displaying.innerHTML = `
              <b>Name: ${data.employeeName}</b>
              <p><b>ID Number:</b> ${data.idNumber}</p>
              <p><b>Email:</b> ${data.email}</p>
              <p><b>Phone Number:</b> ${data.phoneNumber}</p>
              <p><b>Position:</b> ${data.position}</p>
              `;
          allEmployeeDisplay.append(displaying);
        });
      }
    })
    .catch((err) => {
      console.log(err);
      allEmployeeDisplay.style.color = "rgb(174, 44, 12)";
      allEmployeeDisplay.innerHTML = "Something went wrong";
    });
};

function editingOptions(id) {
  const option = `
    <div class='${id}'>
      <button id='activate' onclick='activateUser()'>Activate</button>
      <button id='edit' onclick='editUser()'>Edit</button>
      <button id='delete' onclick='deleteUser()'>Delete</button>
    </div>
  `;
  return option;
}

function activateUser() {
  console.log("clicked");
}

searchForm.onsubmit = (e) => {
  e.preventDefault();
  searchSubmit();
};
getAllEmployee.onclick = () => {
  fetchAll();
};
gettingAllEmployee.onclick = () => {
  fetchAll();
};
