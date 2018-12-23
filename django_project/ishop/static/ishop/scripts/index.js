var showText = document.getElementById("show-text");
showText.addEventListener("click", descToggle("hidden-text"), false);
function descToggle(id) {
	return function(e) {
		var hiddenText = document.getElementById(id);
		if (hiddenText.style.display == "block") {
			hiddenText.style.display = "none";
			showText.innerHTML = "Показать полностью";
		} else {
			hiddenText.style.display = "block";
			showText.innerHTML = "Скрыть часть";
		}
	}
}


// ----------SLIDESHOW------------

var slideIndex = 0;
var slides = document.getElementsByClassName("mySlides");
var dots = document.getElementsByClassName("dot");

showSlides();

function showSlides() {
	var i;
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slideIndex++;
	if (slideIndex > slides.length) {slideIndex = 1}
	slides[slideIndex-1].style.display = "block";
	dots[slideIndex-1].className += " active";
	setTimeout(showSlides, 5000); // Change image every 5 seconds
}

function currentSlide(no) {
	var i;
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slideIndex = no;
	slides[no-1].style.display = "block";
	dots[no-1].className += " active";
}

function plusSlides(n) {
	var newSlideIndex = slideIndex + n;
	const maxIndex = 3;
	if (newSlideIndex <= maxIndex && newSlideIndex >= 1) {
		currentSlide(newSlideIndex);
	} else if (newSlideIndex == maxIndex+1) {
		currentSlide(1);
	} else if (newSlideIndex == 0) {
		currentSlide(maxIndex);
	}
}
