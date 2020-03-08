let register = document.querySelector('.register');
let loginbtn = document.querySelector('.loginbtn');
let signUp = document.querySelector('.signUp');
let login = document.querySelector('.login');

loginbtn.addEventListener('click', ()=>{
    signUp.style.display = 'none';
    login.style.display = 'inherit';
})

register.addEventListener('click', ()=>{
    login.style.display = 'none';
    signUp.style.display = 'inherit';
})