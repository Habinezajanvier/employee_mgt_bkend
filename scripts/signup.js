
let employeeName = document.getElementById('name');
let idNumber = document.getElementById('number');
let email = document.getElementById('email');
let password = document.getElementById('password');
let position = document.getElementById('position');
let birthDate = document.getElementById('birthdate');

let form = document.querySelector('.signUp_form');
let error = document.querySelector('.error');

let submitted = (data)=>{

    form.style.display = 'none';
    error.style.display = 'inherit';

    error.innerHTML = data.msg;
    
    setTimeout(() => {
        location.reload();
    }, 5000);
}

//codes for to consumes API for register
form.onsubmit = (e) => {
    e.preventDefault();

    fetch('https://em-management.herokuapp.com/company/register', {
        method: 'POST',
        headers: {
            "accept": "application/json, texp/plain",
            "content-Type": "application/json"
        },
        body: JSON.stringify({
            employeeName: employeeName.value,
            idNumber: idNumber.value,
            email: email.value,
            password: password.value,
            position: position.value,
            birthDate: birthDate.value
        })
    })
    .then(res => res.json())
    .then((data) =>{
       submitted(data);
    } )
    .catch(error => console.log(error));
}