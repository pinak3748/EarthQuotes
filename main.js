const content = CSSRulePlugin.getRule('.content:before')
const h1 = document.querySelector('h1')
const p = document.querySelector('p')
const t1 = gsap.timeline()

// t1.from(content, {delay: .5, duration: 3, cssRule: {scaleX: 0}})
t1.to(h1, {duration:2, clipPath: 'polygon(0 0 ,100% 0,100% 100%, 0% 100%',y: '30px'})
t1.to(p, {duration:4, clipPath: 'polygon(0 0 ,100% 0,100% 100%, 0% 100%',y: '30px'}, "-=3")



var quote

h1.addEventListener("click",getQuote);


function getQuote() {
    fetch("https://api.quotable.io/random?maxLength=60")
    .then(res => res.json())
    .then(data => {
            h1.innerHTML = data.content;
            p.innerHTML = data.author;     
    })
}