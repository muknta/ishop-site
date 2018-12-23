var url = "http://localhost:8000/api/phones";
var refreshBtn = document.getElementById('admin-refresh-btn');


refreshBtn.addEventListener('click', apiLoad(), false);

function apiLoad() {
	return function(e) {
		var request = new XMLHttpRequest();
		request.open("GET", url);
		request.onload = function() {
			var data = JSON.parse(request.responseText);
			renderHTML(data);
		}
		request.send();
	}
}


function renderHTML(data) {
	var priceArr = [], brandArr = [], resolArr = [],
		cameraArr = [], diagArr = [];

	for (var i = 0; i < data.length; i++) {
		priceArr.push(data[i].phone_price);
		brandArr.push(data[i].phone_brand);
		resolArr.push(data[i].phone_resolution);
		cameraArr.push(data[i].phone_camera);
		diagArr.push(data[i].phone_diagonal);
	}

    document.getElementById("from-price").placeholder = Math.min.apply(null, priceArr);
    document.getElementById("to-price").placeholder = Math.max.apply(null, priceArr);
    console.log("AAAAAAAAAAAAAAAAA");
    arrToHtml(sortUniq(brandArr), "brand-items");
    arrToHtml(sortUniq(resolArr), "resolution-items");
    arrToHtml(sortUniq(cameraArr), "camera-items");
    arrToHtml(sortUniq(diagArr), "diagonal-items");
}


function sortUniq(arr) {
    return arr.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    })
}

function arrToHtml(arr, id) {
	var idName = id.slice(0, id.length-6); //removing '-items'
	var container = document.getElementById(id);
	container.innerHTML = "";
	for (var i = 0; i < arr.length; i++) {
		var strHTML = '<div class="form-check">\
						<input class="form-check-input" type="checkbox" \
							id="'+idName+'-check-'+(i+1)+'">\
							<label class="form-check-label" \
								for="'+idName+'-check-'+(i+1)+'">\
								'+arr[i]+'</label></div>'
		container.insertAdjacentHTML('beforeend', strHTML);
	}
}
