//------------ STICKY NAVBAR -----------

var navi = document.getElementById("navi");
var sticky = navi.offsetTop;


window.addEventListener("scroll", function() {
	if (window.pageYOffset >= sticky) {
		navi.classList.add("sticky-navi");
	} else {
		navi.classList.remove("sticky-navi");
	}
}, false);
