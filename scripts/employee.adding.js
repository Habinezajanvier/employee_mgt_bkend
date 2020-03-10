let employeeName = document.getElementById('name');
let idNumber = document.getElementById('number');
let email = document.getElementById('email');
let position = document.getElementById('position');
let phoneNumber = document.getElementById('phoneNumber');

let myDate = document.getElementById('dates');
let myMonth = document.getElementById("month");
let year = document.getElementById('year');

let addingForm = document.querySelector('.adding');
let addingRes = document.querySelector('.addingRes');

//options for user to select on dates
const monthOptions = `
<option value = ''>please Select</option>
<option value = '01'>Jan</option>
<option value = '02'>Feb</option>
<option value = '03'>March</option>
<option value = '04'>App</option>
<option value = '05'>May</option>
<option value = '06'>Jun</option>
<option value = '07'>Jul</option>
<option value = '08'>Aug</option>
<option value = '09'>Sept</option>
<option value = '10'>Oct</option>
<option value = '11'>Nov</option>
<option value = '12'>Dec</option>
`

myMonth.innerHTML = monthOptions;

const myToken = localStorage.getItem('token');

window.onload = () =>{
    if(!myToken){
        window.location = './index.html';
    }
}

let displayOnAdding =(data)=> {
    employeeName.value = "";
    idNumber.value = "";
    phoneNumber.value = "";
    email.value = "";
    year.value = "";
    myDate.value = "";
    position.value = "";

    addingForm.style.opacity = '0.2';
    addingRes.innerText = data.msg;
    addingRes.style.display = 'inherit'

    setTimeout(() => {
        addingRes.style.display = 'none';
        addingForm.style.opacity = '1';
    }, 10000);
}


addingForm.onsubmit = (e) =>{
    e.preventDefault();

    fetch('https://em-management.herokuapp.com/company/employees', {
        method: "POST",
        headers: {
            "accept": "application/json",
            "content-type": "application/json",
            "Authentication": myToken,
        },
        body: JSON.stringify({
            employeeName: employeeName.value,
            idNumber: idNumber.value,
            phoneNumber: phoneNumber.value,
            email: email.value,
            year: year.value.toString(),
            date: myDate.value.toString(),
            month: myMonth.value.toString(),
            position: position.value
        })
    })
    .then(res => res.json())
    .then((data)=> {
        displayOnAdding(data);
    });
}
