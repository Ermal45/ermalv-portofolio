

//grab elments
const mainBtn = document.querySelector('.main')
const navbarUpper = document.querySelector('.navbar-upper')
const headerNav = document.querySelector('header')
const headerWrapper = document.querySelector('.header-wrapper')




const logo = document.querySelector('.logo')
const links = navbarUpper.querySelectorAll('li')

const burgerMenu = document.querySelector('.burger-menu')
const burgerLines = burgerMenu.querySelectorAll('.line')
// burger lines
const firstLine = burgerLines[0]
  const secondLine = burgerLines[1]
  const thirdLine = burgerLines[2]

const timeL = gsap.timeline({defaults: {duration: 1, ease: 'power2.out'}})
const timeL2 = gsap.timeline({defaults: {duration: .7, ease: 'power2.in'}})


// animate nav when site loads
gsap.fromTo(headerWrapper, {y: '-100%'}, {y: '0%'}, '+=.5')




const animSlides = () => {
  const getSlides = document.querySelectorAll('.slide')
  const handleIntersect = (entries,observer) => {
   entries.forEach((entry) => {
       if ( entry.isIntersecting ) {
         let element = entry.target
           const reveal = element.querySelectorAll('.reveal-hide')
           timeL.fromTo(reveal, {opacity: 0}, {opacity: 1, stagger: 0.5})
           observer.unobserve(element)
       }
   })
}

const createObserver = (el) => {
  let observer;

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.33
  };

  observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(el);
}

getSlides.forEach(slide => {
 createObserver(slide)
})

}


//open navbar when user clicks on burger

const openNavbar = () => {

   if (!navbarUpper.classList.contains('active')) {
     navbarUpper.classList.add('active')
     gsap.to(firstLine, {rotate: '40deg'})
     gsap.to(firstLine, {top: '20px'})
     gsap.to(secondLine, {opacity: 0})
     gsap.to(thirdLine, {rotate: '-40deg'})



     timeL2.fromTo(navbarUpper, {y: '-100%'}, {y: '0%', onComplete: () => {
       gsap.to(logo, {opacity: 0})
       document.body.style.overflow = 'hidden'
     }})
   timeL2.fromTo(links, {x: '20%'}, {x: '0%', stagger: 0.2})
   timeL2.fromTo(links, {opacity: 0}, {opacity: 1, stagger: 0.2}, '-=1.3')
   }
   else {

     gsap.to(firstLine, {rotate: '0deg'})
     gsap.to(firstLine, {top: '0px'})
     gsap.to(secondLine, {opacity: 1})
     gsap.to(thirdLine, {rotate: '0'})
    navbarUpper.classList.remove('active')
   timeL2.fromTo(links, {x: '0%'}, {x: '20%', stagger: 0.2})
   timeL2.fromTo(links, {opacity: 1}, {opacity: 0, stagger: 0.2}, '-=1.3') 
   timeL2.fromTo(navbarUpper, {y: '0%'}, {y: '-100%', onComplete: () => {
     gsap.to(logo, {opacity: 1})
     document.body.style.overflow = 'auto'
   }})
   }
}


// when user scrolls make navbar sticky
  const whenScroll = () => {
    const position = window.scrollY;
    if (position > 30) {
      headerWrapper.classList.add('active')
    }
    else {
      headerWrapper.classList.remove('active')
    }
  }


  //scroll to specific container on click function
const ScrollTo = (key) => {
  const getEl = document.querySelector(`.${key}`);
  const getPos = getEl.offsetTop;
  window.scrollTo({
    top: getPos,
    behavior: "smooth"
  })
}

  

document.addEventListener('scroll', whenScroll)
burgerMenu.addEventListener('click', openNavbar)
mainBtn.addEventListener('click', (e) => {
  const key = e.target.getAttribute('data-key');
  ScrollTo(key)
})




const animLinks = () => {
  links.forEach(link => {
  link.addEventListener('click', e => {
    document.body.style.pointerEvents = 'none'
    const key = e.target.getAttribute('data-key')
    gsap.to(firstLine, {rotate: '0deg'})
     gsap.to(firstLine, {top: '0px'})
     gsap.to(secondLine, {opacity: 1})
     gsap.to(thirdLine, {rotate: '0'})
    navbarUpper.classList.remove('active')
   timeL2.fromTo(links, {x: '0%'}, {x: '20%', stagger: 0.2})
   timeL2.fromTo(links, {opacity: 1}, {opacity: 0, stagger: 0.2}, '-=1.3') 
   timeL2.fromTo(navbarUpper, {y: '0%'}, {y: '-100%', onComplete: () => {
     gsap.to(logo, {opacity: 1})
     document.body.style.overflow = 'auto',
     ScrollTo(key),
     document.body.style.pointerEvents = 'auto'
   }})
  })
})
}


// when site loads execute functions
document.addEventListener('DOMContentLoaded', () => {
  animSlides()
  animLinks()
   window.scroll(0,0)
})








