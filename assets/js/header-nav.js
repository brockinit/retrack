const navMenuIcon = document.getElementsByClassName('nav__menu-icon')[0];
const navRight = document.getElementsByClassName('nav__right')[0];
const defaultNavClass = 'nav__right';
const showNavClass = `${defaultNavClass} nav__right-show`;
const hideNavClass = `${defaultNavClass} nav__right-hide`;

let defaultNav = false;

navMenuIcon.addEventListener('click', (e) => {
  defaultNav = !defaultNav;
  navRight.className = defaultNav ? showNavClass : hideNavClass;
})

// resets toggling/prevents right nav from displaying as flex on desktop resize
window.addEventListener('resize', (e) => {
  let { target } = e;

  if( target.innerWidth >= 1026 && navRight.className !== defaultNavClass) {
    defaultNav = false;
    navRight.className = defaultNavClass;
  }
})
