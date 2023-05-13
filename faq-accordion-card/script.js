const accItems = document.querySelectorAll('.accItem');

accItems.forEach( cuurentItem => {
    cuurentItem.addEventListener('click', ()=>{
            accItems.forEach( currItem => {
                if(currItem !== cuurentItem)
                    currItem.classList.remove('active');
                else
                    cuurentItem.classList.toggle('active');
            })
    })
})