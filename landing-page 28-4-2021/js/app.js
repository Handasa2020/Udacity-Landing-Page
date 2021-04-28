/*
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 */

/*
 * Define Global Variables
 */

const docFrag = document.createDocumentFragment();
const listOfSections = document.querySelectorAll('section');
const menuItem = document.querySelector('#navbar__list');
const topButton = document.querySelector('#topBtn');
const rootElement = document.documentElement;
const behav = {
    behavior: 'smooth',
    block: 'nearest',
    inline: 'end'
};
// const options = {rootMargin: '0px 0px 0px 0px'};

/*
 * End Global Variables
 */

/*
 * Start Helper Functions
 */

// Reset all links and sections
function removeActive () {
    for (const section of listOfSections) {
        section.classList.remove("your-active-class");
    }
    for ( const link of listofLinks) {
        link.classList.remove("menu__link");
    };
};

// Add active class to the section in viewport and its link
function addActive () {
    for (const section of listOfSections) {
        section.classList.add("your-active-class");
    }
    for ( const link of listofLinks) {
        link.classList.add("menu__link");
    };
};

/*
 * End Helper Functions
 */

/*
 * Begin Main Functions
 */

// build the nav
// ( for of loop ) is preferred than (forEach loop) and is compatible with all browsers
const buildNav = () => {
    for (const section of listOfSections) {
        const textData = section.getAttribute('data-nav');
        const menuList = document.createElement('li');
        const menuLink = document.createElement('a');
        menuLink.href = '#'+ section.id;
        menuLink.classList.toggle('menu__link');
        menuLink.textContent = textData;
        menuList.appendChild(menuLink);
        docFrag.append(menuList);
        menuLink.addEventListener( 'click', e => {
            e.preventDefault();
            section.scrollIntoView(behav);
        })
    };
    menuItem.append(docFrag);
};

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();




// Set sections as active

function inViewSecIndex(){
    let base = window.innerHeight;
    secIndex = -1;
    listOfSections.forEach( function(sec, index){
        let defaultSet = sec.getBoundingClientRect();
        if( Math.abs(defaultSet.top) < base){
            base = Math.abs(defaultSet.top);
            secIndex = index;
        }
    })
    return secIndex;
}
function setActiveSection(){
    secIndex = inViewSecIndex();
    if ( secIndex != -1 ) {
        const listofLinks = document.querySelectorAll('.menu__link');
        for ( let i = 0; i < listofLinks.length; i++) {
            if ( i == secIndex ) {
                listOfSections[i].classList.add('your-active-class');
                listofLinks[i].classList.add('your-active-class');
            } else {
                listOfSections[i].classList.remove('your-active-class');
                listofLinks[i].classList.remove('your-active-class');
            }
        }
    }
}

window.addEventListener('scroll', setActiveSection);

// When the user scrolls down 200px from the top of the page,
// show the Back to top button.
window.addEventListener('scroll', scrolling);
function scrolling () {
    if (document.body.scrollTop > 200 || rootElement.scrollTop > 200) {
        topButton.style.visibility = 'visible';
    } else {
        topButton.style.visibility = 'hidden';
    }
};

// Smoothly scroll back to top when topButton is clicked ( Tested )
topButton.addEventListener('click', scrollToTop);

// Scrolling to top function ( Tested )
function scrollToTop () {
    rootElement.scrollTo ({
        top: 0,
        behavior: 'smooth'
    })
};