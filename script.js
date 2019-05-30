// Generic functions

	// Rounding; taken from Mozilla Developer - Revision 1383484 of Math.round() - (credits to Lam Wei Li)
	function round(number, precision) {
	  var shift = function (number, exponent) {
	    var numArray = ("" + number).split("e");
	    return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + exponent) : exponent));
	  };
	  return shift(Math.round(shift(number, +precision)), -precision);
	}

// Get Blank cell values by hitting "Enter" or "Tab"
var Blank_All = document.getElementsByClassName("blankArea");
var Area_All = document.getElementsByClassName("peakArea");
var Impurity_All = document.getElementsByClassName("column4");

var i;
for (let i = 0; i < Blank_All.length; i++) {
	Blank_All[i].addEventListener("keypress", function(event) {
		if (event.keyCode === 13) {
			console.log(Blank_All[i].value);
			return Blank_All[i].value;
		}
	})

	Blank_All[i].addEventListener("keydown", function(event) {
		if (event.keyCode === 9) {
			console.log(Blank_All[i].value);
			return Blank_All[i].value;
		}
	})
}

// Get Ractopmaine from Soln B value by hitting "Enter" or "Tab"

Area_All[0].addEventListener("keypress", function(event) {
	if (event.keyCode === 13) {
		console.log(Area_All[0].value);
		return Area_All[0].value;
	}
})

Area_All[0].addEventListener("keydown", function(event) {
	if (event.keyCode === 9) {
		console.log(Area_All[0].value);
		return Area_All[0].value;
	}
})

// Perform impurity calculations by hitting "Enter" or "Tab"

var a;
var Impurity_calculated = []; // String
var Imp_calc_num = []; // Integers
var Result = []; // Only values > 0.094
var sum = 0; // Total Impurities

function impCalc(a) {
	Impurity_All[a].innerHTML = " ";
	console.log(Area_All[a].value);
	Impurity_calculated[a] = (((Area_All[a].value-Blank_All[a].value)/(Area_All[0].value-Blank_All[0].value))*100).toFixed(2);
	Imp_calc_num = Impurity_calculated.map(Number);
	if (Imp_calc_num[a] > 0.094) {
		var p = document.createTextNode(String(Impurity_calculated[a]) + "%");
	} else if (Imp_calc_num[a] <= 0) {
		var p = document.createTextNode("ND");
	} else {
		var p = document.createTextNode("< RL");
	}
	Impurity_All[a].appendChild(p);
}

function getsum() {
	Impurity_All[10].innerHTML = " ";
	Result = Imp_calc_num.filter( function(num) {
		return num > 0.094;
	})
	sum = round((Result.reduce((total, amount) => total + amount)),1).toFixed(1);
	var t = document.createTextNode(String(sum) + "%");
	Impurity_All[10].appendChild(t);
}

function calculate(a) {
	impCalc(a);
	getsum();
	console.log(Result);
}

// Listen for "Enter" or "Tab" key

for (let a = 1; a < Area_All.length; a++) {
	Area_All[a].addEventListener("keypress", function(event) {
		if (event.keyCode === 13) {
			calculate(a);		
		}
	})
	
	Area_All[a].addEventListener("keydown", function(event) {
		if (event.keyCode === 9) {
			calculate(a);
		}
	})

}