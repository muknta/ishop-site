var converter = document.getElementById("converter")
converter.addEventListener("click", function() {
	var howMuch = document.getElementById("how-much").value;
	var fromCur = document.getElementById("from-cur").value;
	var toCur = document.getElementById("to-cur").value;

	if (isNumber(howMuch) && fromCur && toCur) {
		var url = "https://free.currencyconverterapi.com/api/v5/convert?q="
		+ fromCur + "_" + toCur + "&compact=y";
		request(url, 1);
	}
	else {
		document.getElementById("conv-result").innerHTML = "Error!";
	}
}, false);


function isNumber(n){
    return !isNaN(n) && isFinite(n);
}

var setCurrency = document.getElementById("set-currency")
setCurrency.addEventListener("click", function() {
	d3.select("svg").remove();

	var choCurr = document.getElementById("cho-currency");
	var valCurr = choCurr.value;
	var url = "https://www.quandl.com/api/v3/datasets/ECB/EUR" + valCurr;
	document.getElementById("current-curr").innerHTML = valCurr + " to 1 EURO";
	document.getElementById("editable-alias").style.minHeight = "750px";
	request(url, 2);
}, false);

/*
	sens = 1 (calculating of current Exchange Rate)
		= 2 (fill array of currency graph values)
*/
function request(url, sens) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        var rawData = JSON.parse(xmlhttp.responseText);
	        if (sens == 1)
	        	calculate(rawData);
	        else if (sens == 2)
	        	fillArr(rawData);
	    }
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function calculate(rawData) {
	var howMuch = document.getElementById("how-much").value;
	var value;
	
	for (var key in rawData) {
		value = rawData[key].val;
	}
	document.getElementById("conv-result").innerHTML = value*howMuch;
}

function fillArr(rawData) {
	var valArr = [];
	var delta = 260;	// number of countries
    for (var i = 8; i >= 0; i--) {
    	valArr.push(rawData.dataset.data[delta*i][1]);
    }
    graph(valArr);
}


function graph(valArr) {

	// Use the margin convention practice 
	var margin = {top: 50, right: 50, bottom: 50, left: 50}
	  , width = window.innerWidth - margin.left - margin.right // Use the window's width 
	  , height = window.innerHeight - margin.top - margin.bottom; // Use the window's height

	// The number of datapoints
	var n = 9;

	// X scale will use the index of our data
	var xScale = d3.scaleLinear()
	    .domain([2010, 2018]) // input
	    .range([0, width]); // output

	var yScale = d3.scaleLinear()
	    .domain([0, Math.max.apply(null, valArr)]) // input 
	    .range([height, 0]); // output 

	// d3's line generator
	var line = d3.line()
	    .x(function(d, i) { return xScale(i+2010); })
	    .y(function(d) { return yScale(d.y); })
	    .curve(d3.curveMonotoneX) // apply smoothing to the line

	// An array of objects of length N. Each object has key -> value pair, the key being "y"
	var i = 0;
	var dataset = d3.range(n).map(function(d) { return {"y": valArr[i++]} })

	// Add the SVG to the page and employ #2
	var svg = d3.select("body")
		.append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
		.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// Call the x axis in a group tag
	svg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(d3.axisBottom(xScale));

	// Call the y axis in a group tag
	svg.append("g")
	    .attr("class", "y axis")
	    .call(d3.axisLeft(yScale));

	// Append the path, bind the data, and call the line generator 
	svg.append("path")
	    .datum(dataset) // Binds data to the line 
	    .attr("class", "line") // Assign a class for styling 
	    .attr("d", line); // Calls the line generator 

	// Appends a circle for each datapoint 
	svg.selectAll(".dot")
	    .data(dataset)
		.enter().append("circle")
	    .attr("class", "dot") // Assign a class for styling
	    .attr("cx", function(d, i) { return xScale(i+2010) })
	    .attr("cy", function(d) { return yScale(d.y) })
	    .attr("r", 5)
	    .on("mouseover", function(y) {
  			console.log(y);
  			d3.select(this).attr("r", 8)
  						.style("cursor", "pointer");
  			// var circle = d3.select(this);
			// handleMouseEvents.over(circle, d, team, chart);
		})
	    .on("mouseout", function() {
	    	d3.select(this).attr("r", 5);
	    });

}
