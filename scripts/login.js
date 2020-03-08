let loginfrm = document.querySelector('.login_form');
let loginName = document.getElementById('l_name');
let loginPassword = document.getElementById('l_password');


loginfrm.onsubmit =(e)=>{
    e.preventDefault();

    fetch('https://em-management.herokuapp.com/company/login', {
        method: 'POST',
        headers: {
            "accept": "application/json, texp/plain",
            "content-Type": "application/json"
        },
        body: JSON.stringify({
            employeeName: loginName.value,
            password: loginPassword.value
        })
    })
    .then(res => res.json())
    .then((data)=>{
        if (data.token) {
            localStorage.setItem('token', data.token);
            window.location = './employee.html'
        } else {
           submitted(data) 
        }
    })
    .catch(error => console.log(error));
}