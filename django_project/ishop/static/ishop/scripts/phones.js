// var contItems = document.getElementsByClassName("items-container");

function disBlock(id) {
	var item = document.getElementById(id);
	item.style.zIndex = "10";
}

function disHide(id) {
	var item = document.getElementById(id);
	item.style.zIndex = "0";
}


var brand = document.getElementById("brand-filter");
brand.addEventListener("click", toggle("brand-items"), false);

var resolution = document.getElementById("resolution-filter");
resolution.addEventListener("click", toggle("resolution-items"), false);

var camera = document.getElementById("camera-filter");
camera.addEventListener("click", toggle("camera-items"), false);

var diagonal = document.getElementById("diagonal-filter");
diagonal.addEventListener("click", toggle("diagonal-items"), false);

function toggle(id) {
	return function(e) {
		var choId = document.getElementById(id);
		if (choId.style.display == "block") {
			choId.style.display = "none";
		} else {
			choId.style.display = "block";
		}
	}
}