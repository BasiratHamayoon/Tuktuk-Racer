var tuktuk = document.getElementById('tuktuk');
var van = document.getElementById('van');
var truck = document.getElementById('truck');
var tuktukMarginLeft = tuktuk.style.marginLeft = "400px";
var tuktukMarginTop = tuktuk.style.marginTop = "1px";
var vanMarginLeft = van.style.marginLeft = "80px";
var vanMarginTop = van.style.marginTop = "4px";
var truckMarginLeft = truck.style.marginLeft = "50px";
var truckMarginTop = truck.style.marginTop = "50px";
if (tuktukMarginLeft === vanMarginLeft && tuktukMarginTop === vanMarginTop){
    alert("Game over");
} 