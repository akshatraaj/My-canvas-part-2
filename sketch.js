var database;
var drawing = [];
var canvas;
var currentPath = []; 
var isDrawing = false;

function setup(){
  database = firebase.database();
  var canvas = createCanvas(400,400);
  canvas.mousePressed(startPath);
  canvas.mouseReleased(endPath);
 
  function startPath(){
    isDrawing = true; 
    currentPath = []; 
      drawing.push(currentPath);
  }
  function endPath(){
  isDrawing = false;
  }
}
function draw(){
    background(0);
    if(isDrawing){
        var point = {
            x: mouseX,
            y: mouseY
        }
        currentPath.push(point);
    }
  
    stroke(255);
    strokeWeight(4);
    noFill();
    for(var i = 0; i < drawing.length; i++){
      var path = drawing[i];
      beginShape();
      for(var j = 0; j < path.length; j++){
        vertex(path[j].x, path[j].y)
      }
      endShape();
    }
  saveDrawing();
}
function saveDrawing(){
var ref = database.ref('drawings');
var data = {
    name: "Akshat",
    drawing: drawing
}
var result = ref.push(data, dataSent);
console.log(result.key);

function dataSent(status){
    console.log(status);
}
}