//grab elments
const mainBtn = document.querySelector('.main');
const header = document.querySelector('header');
const getToggle = document.querySelector('.nav__item--burgermenu');
const ulList = document.querySelector('.nav__list--links');
const logo = document.querySelector('.nav__item--logo');
const navLinks = document.querySelectorAll('.nav__item');
const burgerMenu = document.querySelector('.nav__item--burgermenu');
const burgerLines = burgerMenu.querySelectorAll('.nav__list--line');
// burger lines
const firstLine = burgerLines[0];
const secondLine = burgerLines[1];
const thirdLine = burgerLines[2];
const timeL = gsap.timeline({
    defaults: {
        duration: 1,
        ease: 'power2.out'
    }
});
const timeL2 = gsap.timeline({
    defaults: {
        duration: 0.7,
        ease: 'power2.in'
    }
});
// animate nav when site loads
gsap.fromTo(header, {
    y: '-100%'
}, {
    y: '0%'
}, '+=.5');
logo.addEventListener('click', ()=>{
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
const animSlides = ()=>{
    const getSlides = document.querySelectorAll('.slide');
    const handleIntersect = (entries, observer)=>{
        entries.forEach((entry)=>{
            if (entry.isIntersecting) {
                let currEl = entry.target;
                const element = currEl.querySelectorAll('.reveal');
                timeL.fromTo(element, {
                    opacity: 0
                }, {
                    opacity: 1,
                    stagger: 0.5
                });
                observer.unobserve(currEl);
            }
        });
    };
    const createObserver = (el)=>{
        let observer;
        let options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.33
        };
        observer = new IntersectionObserver(handleIntersect, options);
        observer.observe(el);
    };
    getSlides.forEach((slide)=>{
        createObserver(slide);
    });
};
//open navbar when user clicks on burger
const openNavbar = ()=>{
    if (!ulList.classList.contains('active')) {
        ulList.classList.add('active');
        gsap.to(firstLine, {
            rotate: '40deg'
        });
        gsap.to(firstLine, {
            top: '20px'
        });
        gsap.to(secondLine, {
            opacity: 0
        });
        gsap.to(thirdLine, {
            rotate: '-40deg'
        });
    } else {
        gsap.to(firstLine, {
            rotate: '0deg'
        });
        gsap.to(firstLine, {
            top: '0px'
        });
        gsap.to(secondLine, {
            opacity: 1
        });
        gsap.to(thirdLine, {
            rotate: '0'
        });
        ulList.classList.remove('active');
    }
};
//scroll to specific container on click function
const ScrollTo = (key)=>{
    const getEl = document.querySelector(`.${key}`);
    const getPos = getEl.offsetTop - 100;
    window.scrollTo({
        top: getPos,
        behavior: "smooth"
    });
};
burgerMenu.addEventListener('click', openNavbar);
mainBtn.addEventListener('click', (e)=>{
    const key = e.target.getAttribute('data-key');
    ScrollTo(key);
});
const animLinks = ()=>{
    navLinks.forEach((link)=>{
        link.addEventListener('click', (e)=>{
            const key = e.target.getAttribute('data-key');
            ScrollTo(key);
            gsap.to(firstLine, {
                rotate: '0deg'
            });
            gsap.to(firstLine, {
                top: '0px'
            });
            gsap.to(secondLine, {
                opacity: 1
            });
            gsap.to(thirdLine, {
                rotate: '0'
            });
            ulList.classList.remove('active');
        });
    });
};
// when site loads execute functions
document.addEventListener('DOMContentLoaded', ()=>{
    animSlides();
    animLinks();
    //  window.scroll(0,0)
    console.log('heyyyy this workss');
});

//# sourceMappingURL=index.643c084b.js.map
