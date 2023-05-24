const tabs = document.querySelectorAll('li');
const contents = document.querySelectorAll('.tabContentWrapper > div');

tabs.forEach((tab)=>{
    tab.addEventListener('click',(e)=>{
        reset();
        const clickedTab = e.target.classList[0];
        const clickedTabContent = document.getElementById(clickedTab);
        e.target.classList.add('active');
        clickedTabContent.style.display = 'block';
    })
});

function reset() {
    tabs.forEach((tab)=> tab.classList.remove('active'));
    contents.forEach((content)=> content.style.display = 'none');
}