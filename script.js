//henter elementer fra DOM
const dropDownMenu=document.querySelector('.dropdown_menu')
const bars = document.querySelector('.bars')
   

bars.addEventListener('click', dropdown)
function dropdown(){
    bars.classList.toggle('fa-bars')
    bars.classList.toggle('fa-x')
    dropDownMenu.classList.toggle('open')
}