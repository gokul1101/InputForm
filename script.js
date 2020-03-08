const table = document.getElementsByTagName('table')[0];
const form = document.getElementById('form');
let regno = document.getElementById('regno');
let name = document.getElementById('name');
let dept = document.getElementById('dept');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateInputs();
})

function validateInputs(){
    const regnoValue = regno.value;
    const nameValue = name.value.toUpperCase();
    const deptValue = dept.value.toUpperCase();
    let count = 0;
    if(regnoValue === ""){
        setError(regno, "Register number can not be empty.")
    }else{
        setSuccess(regno)
        count++;
    }
    if(nameValue === ""){
        setError(name, "Name can not be empty.")
    }else{
        setSuccess(name)
        count++;
    }

    if(deptValue === ""){
        setError(dept, "Department can not be empty.")
    }else{
        setSuccess(dept)
        count++;
    }
    console.log(count)
    if(count == 3){
       addRow(regnoValue, nameValue, deptValue);
    }
    else return;
}
let rowCount = 1;
function addRow(regnoValue, nameValue, deptValue){
    let newRow = table.insertRow(rowCount++);
    let cells = []; 
    let i = 0,j;
    const selectInputs = document.querySelectorAll('select');
    cells[i] = newRow.insertCell(i);
    cells[i++].innerHTML = regnoValue;
    cells[i] = newRow.insertCell(i);
    cells[i++].innerHTML = `<input type="text" class = "userInput" disabled value = ${nameValue}>`;
    cells[i] = newRow.insertCell(i);
    cells[i++].innerHTML = `<input type="text" class = "userInput" disabled value = ${deptValue}>`;
    for(j = 0;j<selectInputs.length;j++){
        cells[i + j] = newRow.insertCell(i + j);
        cells[i + j].innerHTML =`<input type="text" class="userInput gradeInput" disabled value=${selectInputs[j].value}>`;
    }
    i = i + j;
    cells[i] = newRow.insertCell(i);
    cells[i++].innerHTML =`${cgpa()}`;  

    cells[i] = newRow.insertCell(i);
    cells[i++].innerHTML = `<button class = "edit" onclick = "editRow()">Edit</button>`;

    cells[i] = newRow.insertCell(i);
    cells[i].innerHTML = `<button class ="delete" onclick = "deleteRow()">Delete</button>`;
}
function cgpa(){
    let credit1 = document.querySelectorAll('.one');
    let credit3 = document.querySelectorAll('.three');
    let credit4 = document.querySelectorAll('.four');
    let sum1 = 0, sum2 = 0, sum3 = 0;
    
    credit1.forEach(credit =>{
        
        let values = gradeConversion(credit.value);
        sum1 += (values * 1);  
    });
    credit3.forEach(credit =>{
        let values = gradeConversion(credit.value);
        sum2 += (values * 3);
    });
    credit4.forEach(credit =>{
        let values = gradeConversion(credit.value);
        sum3 += (values * 4);
    });

    let total = ((sum1 + sum2 + sum3) / 23).toFixed(3);
    return total;
}
function gradeConversion(credit){
    let value;
        switch(credit){
            case 'O': 
                value = 10;
                break;
            case 'A+': 
                value = 9;
                break;
            case 'A': 
                value = 8;
                break;
            case 'B+': 
                value = 7;
                break;
            case 'B': 
                value = 6;
                break;
            default:
                value = 0;
                break;
        }
    return value;
}
function setError(input, message){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = "form-content error" ;
    small.innerText = message;
}
function setSuccess(input){
    const formControl = input.parentElement;
    formControl.className = "form-content success";
}