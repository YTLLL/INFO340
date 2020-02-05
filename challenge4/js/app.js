var slide = document.getElementById("slides");

var dot = document.getElementsByClassName("dot-font");

var rightArrow = document.getElementById("right");
var leftArrow = document.getElementById("left");

var currentSlide = 0;

function nextSlide() {
    if (currentSlide > 3) {
        currentSlide = 0;
    }
    if (currentSlide < 0) {
        currentSlide = 3;
    }
    slide.style.left = (currentSlide * -100) + "%";
    showDot(currentSlide);
}

function showDot(n) {
    for (i = 0; i < dot.length; i++) {
        dot[i].className = dot[i].className.replace(" active", "");
    }
    dot[n].className += " active";
}

rightArrow.addEventListener("click", function goRight() {
    currentSlide++;
    nextSlide(); 
});

leftArrow.addEventListener("click", function goLeft() {
    currentSlide--;
    nextSlide();
});

document.onkeydown = keyDirection;

function keyDirection() {
    if (event.keyCode == 39) {
        currentSlide++;
    } 
    if (event.keyCode == 37) {
        currentSlide--;
    }
    nextSlide();
}

function dotClick(n) {
    currentSlide = n;
    nextSlide();
}

for (var i = 0; i < dot.length; i++) {
    dotCircle(i);
}

function dotCircle(n) {
    dot[n].addEventListener("click", function() {
        var clickDot = document.getElementsByClassName("active");
        clickDot[0].className = clickDot[0].className.replace(" active", "");
        this.className += " active";
    });
}