//------------ STICKY SIDEBAR -----------

var sidebar = document.getElementById("sidebar");
var sticky = navi.offsetTop;


window.addEventListener("scroll", function() {
	if (window.pageYOffset >= sticky) {
		sidebar.classList.add("sticky-sidebar");
	} else {
		sidebar.classList.remove("sticky-sidebar");
	}
}, false);
