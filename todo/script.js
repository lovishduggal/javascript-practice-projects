const input = document.querySelector('input');
const btn = document.querySelector('button');
const ul = document.querySelector('ul');
const statesEle = document.querySelector('.states');
const allListOfTodos = new Array();
const completedListOfTodos = new Array();
const pendingListOfTodos = new Array();

function createElement(inpVal){
    const li = document.createElement('li');
    li.innerHTML = `<span>${inpVal}</span><span><i class="fa-solid fa-check"></i><i class="fa-solid fa-trash"></i></span>`;
    return li;
}

btn.addEventListener('click', (e) =>{
    e.preventDefault();
   if(input.value){
        ul.style.display = 'block';
        ul.append(createElement(input.value));
        allListOfTodos.push(input.value);
        input.value = '';
        //* console.log(allListOfTodos);
   }
})

ul.addEventListener('click', (e) =>{
    console.log(e.target.parentNode.previousSibling);
    if(e.target.classList[1] === 'fa-check')
    {
        e.target.parentNode.previousSibling.style.textDecoration = 'line-through';
        completedListOfTodos.push(e.target.parentNode.previousSibling.textContent);
        //* console.log(completedListOfTodos);
    }
    else if(e.target.classList[1] === 'fa-trash')
     {
        e.target.parentNode.parentNode.remove();
        //* allListOfTodos.splice(allListOfTodos.indexOf(e.target.parentNode.previousSibling.textContent), 1);
        //* completedListOfTodos.splice(completedListOfTodos.indexOf(e.target.parentNode.previousSibling.textContent), 1);
     }

})

//!bugs in the below code. {ALL, COMPLETED, PENDING}

// statesEle.addEventListener('click', (e) =>{
    //* console.log(e.target.classList[0]);
//     if(e.target.classList[0] === 'all'){
        // ul.style.classList.remove();
//         ul.innerHTML = '';
//         allListOfTodos.forEach(todos => ul.append(createElement(todos)));
//     }
//     else
//      if(e.target.classList[0] === 'completed'){
//         ul.innerHTML = '';
//         completedListOfTodos.forEach(todos => ul.append(createElement(todos)));
//     }
//     else if(e.target.classList[0] === 'pending'){
       // pendingListOfTodos =
//     }

// })




