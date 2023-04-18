let toggleBtn = document.querySelector('.toggle_btn')
let toggleBtnIcon = document.querySelector('.toggle_btn i')
let dropDownMenu = document.querySelector('.dropdown_menu')

toggleBtn.onclick=function(){
    dropDownMenu.classList.toggle('open')
    let isOpen = dropdownMenu.classlist.contains('open')
    
    toggleBtnIcon.classList = isOpen
    ? 'fa-solid fa-xmark'
    : 'fa-solid fa-bars'
    
}