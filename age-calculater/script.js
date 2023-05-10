//* Get the btn and input element:
const btnEl = document.querySelector('button');
const dobInputEl =  document.querySelector('input');
console.log(dobInputEl);

//* Get the element one by one which have class years, months and days.
let  yearsEl = document.querySelector('.years');
let  monthsEl = document.querySelector('.months');
let  daysEl = document.querySelector('.days');

//* get dob from localStorage
if(localStorage.getItem('DOB')) {
    let dob = JSON.parse(localStorage.getItem('DOB'));
    setDob(dob.years, dob.months, dob.days);
}

btnEl.addEventListener('click', ()=>{
    if(!dobInputEl.value)
     return alert("Date not selected!!"); // I will update this by modalBox.

    //* our need is to find the difference between cuurentDate and dobInputEl.value:
    let selectedDate = new Date(dobInputEl.value); //* we covert dobInputEl.value in date object to use features provide by 'Date' object and calculation.
    let currentDate = new Date();
    let difference =currentDate - selectedDate; //* we get difference in miliseconds.
    let age = difference / (1000 * 60 * 60 * 24 * 365); //* Here we convert miliseconds to years. Miliseconds in one year  (1000 * 60 * 60 * 24 * 365).

    //* Now, we call calAge function to find years, months, days.
    calAge(age);

})
function calAge(age){
    //* By the help of years.Here, we find years, months, days.
    let years = Math.floor(age);
    let months = Math.floor((age - years) * 12); //* (age - year) give us decimal part of age. So, by multiply by 12 we get the months.
    let days = Math.floor((((age - years) * 12) - months) * 30); //* (((age - years) * 12) - months) give us decimal part of month. So, by multiply by 30 we get the days.

    //* set dob in localStorage
    localStorage.setItem('DOB',JSON.stringify({years, months, days}));

    //* set dob in DOM using setDob function.
    setDob(years, months, days);
}

function convertIntoTwoDigitNum(num){
    return num < 10? "0" + num : num;
}

function setDob(y,m,d){
    if(y < 0)
     return alert("Invalid Date Selected"); // I will update this by modalBox.
    yearsEl.textContent = convertIntoTwoDigitNum(y);
    monthsEl.textContent = convertIntoTwoDigitNum(m);
    daysEl.textContent = convertIntoTwoDigitNum(d);
}