let allEmployees = document.querySelector('.employees');
let table;
let heads;
let rows;

let displayAll = (dat)=>{

    const elem = document.createElement('tr');
    elem.innerHTML = `<td>${dat.employeeName}</td><td>${dat.position}</td><td>${dat.phoneNumber}</td>`

    table.append(elem);
}

window.onload = () =>{

    return fetch('https://em-management.herokuapp.com/company/employees/all', {
        method: 'GET',
        headers: {
            "Authentication": myToken,
        }
    })
    .then(res => res.json())
    .then((data)=>{
        table = document.createElement('table');
        rows = document.createElement('tr')
        rows.innerHTML = `<th>Full Name</th><th>Position</th><th>Phone Number</th>`
        table.append(rows);
    

        data.forEach(element => {
            console.log(element);
            displayAll(element);
        });
        allEmployees.append(table);
    })
};