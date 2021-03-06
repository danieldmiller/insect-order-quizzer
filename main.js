var orderName;
var tryCount = 0;

function init() {
    var imgName = getImgName();
    console.log(imgName);
    orderName = imgName.substring(0, imgName.length - 6);
    var imgPath = "resources/images/" + imgName;
    console.log("imgPath:" + imgPath);
    console.log("orderName:" + orderName);
    changeImage(imgPath)
}

let submitButton = document.querySelector("#submit");
let inputVal;

submitButton.addEventListener("click", function() {
    submit();
});

document.addEventListener("keypress", function(e) {
    const key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
        submit();
    }
});

function submit() {
    //get user input & compare with current image's order name
    inputVal = document.querySelector("input").value;
    if(inputVal === orderName) {
        next();
    } else {
        tryCount++;
        if(tryCount === 3) {
            alert("Wrong. The correct answer was: " + orderName);
            visited.delete(orderName);
            next();
        } else {
            alert("Wrong. Try again.");
        }
    }

    var inputElem = document.querySelector("input");
    inputElem.focus();
    inputElem.select();
}

function next() {
    if(!inputVal) {
        inputVal = document.querySelector("input").value;
    }
    document.querySelector("input").value = "";

    tryCount = 0;
    var imgName = getImgName();
    console.log(imgName);
    orderName = imgName.substring(0, imgName.length - 6);
    var imgPath = "resources/images/" + imgName;
    console.log("imgPath:" + imgPath);
    console.log("orderName:" + orderName);
    changeImage(imgPath);
}

function changeImage(path) {
    document.querySelector("#insect").src = path;
}

readJSON("resources/images.json");
var listOfNames;
function readJSON(path) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.responseType = 'blob';
    xhr.onload = function(e) { 
      if (this.status == 200) {
          var file = new File([this.response], 'temp');
          var fileReader = new FileReader();
          fileReader.addEventListener('load', function(){
            var arr = JSON.parse(fileReader.result);
            // console.log(arr.orders[0].name);
            listOfNames = arr.orders;
            init();
          });
          fileReader.readAsText(file);
      } 
    }
    xhr.send();
}
var visited = new Set(); //records all indexes that have been encountered
function getImgName() {
    var sz = listOfNames.length;
    var ind = Math.floor(Math.random() * sz);
    while (visited.has(ind)) {
        ind = Math.floor(Math.random() * sz);
    }
    visited.add(ind);
    return listOfNames[ind].name;
}