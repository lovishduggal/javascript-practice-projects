const input = document.querySelector('input');
const btn = document.querySelector('button');
const ul = document.querySelector('ul');
const statesEle = document.querySelector('.states');

/**
 * The function creates a new list item element with two spans containing input value and icons for
 * check and trash.
 * @param inpVal - The input value that will be used to create a new list item element.
 * @returns The function `createElement` returns a newly created `li` element with two child elements:
 * a `span` element containing the `inpVal` parameter value, and another `span` element containing two
 * `i` elements with classes `fa-check` and `fa-trash`.
 */
function createElement(inpVal){
    const li = document.createElement('li');
    li.innerHTML = `<span>${inpVal}</span><span><i class="fa-solid fa-check"></i><i class="fa-solid fa-trash"></i></span>`;
    return li;
}

/* This code is adding an event listener to the button element (`btn`). When the button is clicked, it
prevents the default behavior of the form submission (`e.preventDefault()`), checks if the input
field (`input`) has a value, displays the unordered list (`ul`), creates a new list item element
using the `createElement` function with the input value as a parameter, appends the new list item
element to the unordered list, and finally clears the input field by setting its value to an empty
string. */
btn.addEventListener('click', (e) =>{
   e.preventDefault();
   if(input.value){
        ul.style.display = 'block';
        ul.append(createElement(input.value));
        input.value = '';
   }
})

/* This code is adding an event listener to the unordered list (`ul`). When a click event occurs on the
unordered list, it checks if the clicked element has a class of `fa-check` or `fa-trash`. If the
clicked element has a class of `fa-check`, it adds a `line-through` text decoration to the previous
sibling of the clicked element (which is the `span` element containing the input value). If the
clicked element has a class of `fa-trash`, it removes the parent node of the parent node of the
clicked element (which is the `li` element containing the input value and the icons). This allows
the user to mark a task as completed by clicking the check icon and delete a task by clicking the
trash icon. */
ul.addEventListener('click', (e) =>{
    if(e.target.classList[1] === 'fa-check')
        e.target.parentNode.previousSibling.style.textDecoration = 'line-through';
    else if(e.target.classList[1] === 'fa-trash')
        e.target.parentNode.parentNode.remove();
})

/* This code is adding an event listener to an element with the class `states`. When a click event
occurs on this element, it checks which element was clicked by checking the class of the clicked
element. If the clicked element has a class of `all`, it adds the class `active` to the clicked
element and displays all the list items by setting their `display` property to `flex`. If the
clicked element has a class of `completed`, it adds the class `active` to the clicked element and
hides all the list items that are not completed by setting their `display` property to `none`. If
the clicked element has a class of `pending`, it adds the class `active` to the clicked element and
hides all the list items that are completed by setting their `display` property to `none`. */
statesEle.addEventListener('click', (e) =>{
    const listOfItems = ul.querySelectorAll('li');
    const listOfStates = statesEle.querySelectorAll('div');
    listOfStates.forEach(state => {
        state.classList.remove('active');
    });

    if(e.target.classList[0] === 'all'){
        e.target.classList.add('active');
        listOfItems.forEach(list => {
                list.style.display = 'flex';
        });
    }
    else if(e.target.classList[0] === 'completed'){
        e.target.classList.add('active');
        listOfItems.forEach(list => {
            if(!list.childNodes[0].style.textDecoration)
                list.style.display = 'none';
            else
                list.style.display = 'flex';
        });
    }
    else if(e.target.classList[0] === 'pending'){
        e.target.classList.add('active');
        listOfItems.forEach(list => {
            if(list.childNodes[0].style.textDecoration)
                list.style.display = 'none';
            else
                list.style.display = 'flex';
        });
    }
})




