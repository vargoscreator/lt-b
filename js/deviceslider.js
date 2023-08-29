const slides = document.querySelectorAll('.slide');
const thumbnails = document.querySelectorAll('.thumbnail');
const prevButton = document.querySelectorAll('.prev');
const nextButton = document.querySelectorAll('.next');
const slider = document.querySelector('.slider')
const mobile__slider = document.querySelector('.mobile__slider-block')
const mobile__slide = document.querySelectorAll('.mobile__slide')
const mobile__slideractive = document.querySelector('.mobile__slider')
const zoom = document.querySelector('.zoom')
const zoomin = document.querySelector('.zoom-in')
const close__btn = document.querySelector('.close__btn')
let currentIndex = 0;
function showSlide(index, mobile) {
    thumbnails.forEach(item => item.classList.remove('active'));
    thumbnails[index].classList.add('active');
    if (mobile){
        mobile__slide.forEach(slide => slide.classList.remove('active'));
        mobile__slide[index].classList.add('active');
    }
    else{
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }
}
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        currentIndex = index;
        showSlide(currentIndex);
    });
});
prevButton.forEach(prevButton => {
    prevButton.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= slides.length) {
        currentIndex = 0;
    }
    if(mobile__slider.classList.contains('active')){
        showSlide(currentIndex, true);
    }
    else{
        showSlide(currentIndex, false);
    }
  });
});
nextButton.forEach(nextButton => {
    nextButton.addEventListener('click', () => {
        mobile__slide.forEach(slide => {
            slide.style.transform = 'scale(1)'
        });
        mobile__slideractive.classList.remove('activated');
        currentIndex++;
        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }
        if(mobile__slider.classList.contains('active')){
            showSlide(currentIndex, true);
        }
        else{
            showSlide(currentIndex, false);
        }
    });
});
slides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
        mobile__slide[index].classList.toggle('active');
        mobile__slider.classList.toggle('active');
        bodyclick.classList.toggle('lock');
    });
});
mobile__slide.forEach(mobile__slide => {
    mobile__slide.addEventListener('click', () => {
    resetall()
    mobile__slideractive.classList.toggle('activated');
    })
})
function resetall(){
    mobile__slide.forEach(slide => {
        if(!mobile__slideractive.classList.contains('activated')){
            slide.style.transform = 'translateY(-50%) scale(1.6)'
        }
        else{slide.style.transform = 'scale(1)'}
    });
}
zoom.addEventListener('click', () => {
    resetall()
    mobile__slideractive.classList.toggle('activated');
})
zoomin.addEventListener('click', () => {
    resetall()
    mobile__slideractive.classList.toggle('activated');
})
close__btn.addEventListener('click', () => {
    mobile__slider.classList.remove('active')
    mobile__slideractive.classList.remove('activated');
    mobile__slide.forEach(mobile__slide => { mobile__slide.classList.remove('active');})
    bodyclick.classList.toggle('lock');
})

var magnifying_area =  document.getElementById("magnifying_area");
var magnifying_img =  document.getElementById("magnifying_img");

magnifying_area.addEventListener("mousemove",function(event){
    if(mobile__slideractive.classList.contains('activated')){
    clientX = event.clientX - magnifying_area.offsetLeft
    clientY = event.clientY - magnifying_area.offsetTop
    
    var mWidth = magnifying_area.offsetWidth
    var mHeight = magnifying_area.offsetHeight
    clientX = clientX / mWidth * 100
    clientY = clientY / mHeight * 100

    
    if(clientY > 70 || clientY < 25){return}

    mobile__slide.forEach(slide => slide.style.transform = 'translateY(-'+clientY+'%) scale(1.6)');
    }
})