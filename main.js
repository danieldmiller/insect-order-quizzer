var orderName;
let submit = document.querySelector("#submit");
submit.addEventListener("click", function() {
    //get user input & compare with current image's order name
});

let next = document.querySelector("#next");
next.addEventListener("click", function() {
    //alert("next");
    var imgName = getImgName();
    console.log(imgName);
    orderName = imgName.substring(0, imgName.length() - 6);
    var imgPath = "resources/images/" + imgName;
    console.log("imgPath:" + imgPath);
    console.log("orderName:" + orderName);
    changeImage(imgPath)
});

function changeImage(path) {
    document.querySelector("#insect").src = path;
}

var res = readJSON("resources/images.json");
console.log(res);

function readJSON(path) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.responseType = 'blob';
    xhr.onload = function(e) { 
      if (this.status == 200) {
          var file = new File([this.response], 'temp');
          var fileReader = new FileReader();
          fileReader.addEventListener('load', function(){
               //do stuff with fileReader.result
          });
          fileReader.readAsText(file);
      } 
    }
    xhr.send();
}