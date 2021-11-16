/**
 * 
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
 * 
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

// Global Variables
const sections = document.querySelectorAll('section');
const nav = document.getElementById('navbar__list');
const scrollUpBtn = document.getElementById('scrollTopBtn');
const sectionThree = document.getElementById('section3');
const header = document.querySelector('.page__header');

/**
 * 
 * Start Functions
 * 
 */

/*************************************build the navbar function******************************************** */
// 
const createNavigation = () => {
    let docFragm = document.createDocumentFragment();
    sections.forEach(section => {
        const liElement = document.createElement('li');
        //create link to each <li> 
        const aElement = document.createElement('a');
        //add class to <a> link 
        aElement.classList.add('menu__link');
        //add href attribute to <a> link 
        aElement.setAttribute('href', `#${section.id}`);
        aElement.setAttribute('data-nav', `${section.id}`);
        liElement.appendChild(aElement);
        //add text inside <a> link
        aElement.innerHTML = section.getAttribute('data-nav');
        docFragm.appendChild(liElement);
    });
    nav.appendChild(docFragm);
}

//invoke createNavigation function to create the navbar 
createNavigation();

/******************************create smoothScroll funnction to scroll smoothly to each section************************* */
const smoothScroll = (link) => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        const sectionOffsetTop = document.querySelector(href).offsetTop;
        window.scrollTo({
            top: sectionOffsetTop,
            behavior: 'smooth'
        });
    });
}


//add smooth function to each link in the navbar
const navLinks = document.querySelectorAll('.menu__link');
navLinks.forEach(link => {
    smoothScroll(link);
});

/******************************distinguish the section in view an Add class 'active' nav-lik ************************* */
//using IntersectionObserver
const createObserver = (element) => {
    const options = {
        root: null, //view port
        threshold: 0.7,
        rootMargin: "0px"
    }
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            let activeLink = nav.querySelector(`a[data-nav=${entry.target.id}]`);
            if (entry.isIntersecting) {
                entry.target.classList.add('your-active-class');
                activeLink.classList.add('active-link');
            } else {
                entry.target.classList.remove('your-active-class');
                activeLink.classList.remove('active-link');
            }

        });
    }, options);

    observer.observe(element);
}

//add the observer function to each section
sections.forEach(section => {
    createObserver(section);
});



/*********************************hide the navbar while not scrolling************************************** */
let scrollTimer = 0;
//function to hide the navbar
const scrollStopped = () => {
    header.style.opacity = '0';
    header.style.transition = 'all 1s ease';
}
//set timer to check if the scroll stopped or not ***********/
const windowScroll = () => {
    //while scrolling the nav will be visible
    header.style.opacity = '1';
    header.style.transition = 'all 1s ease';

    //clear the timeout if the window kept scrolling
    if (scrollTimer != 0) {
        clearTimeout(scrollTimer);
    }
    //if the window scroll stopped for 1s invoke the function to hide the nav 
    scrollTimer = window.setTimeout(scrollStopped, 1000);

}

window.addEventListener('scroll', function () {
    windowScroll();
});

/********************************************show & hid scroll top btn when the window reach section3*************************************************************** */

window.addEventListener('scroll', function () {
    //get the top of section3
    const sectionTop = sectionThree.offsetTop;

    if (window.scrollY > sectionTop) {
        scrollUpBtn.style.display = 'block';
    } else {
        scrollUpBtn.style.display = 'none';
    }
});

//scroll to Top when click on scrollTopBtn
scrollUpBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});