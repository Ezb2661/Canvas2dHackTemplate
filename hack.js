var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');
var showGui = false;
var guiWidth = 700;
var guiHeight = 500;
var dragging = false;
var guiX = 0;
var guiY = 0;
var oldMouseX;
var newMousX;
var oldMouseY;
var newMouseY;


function onKeyDown(keyCode){
  switch(keyCode){
    case 192:
    showGui = !showGui;
    //Disposing of old components (usually not needed)
    c.clearRect(0,0,innerWidth,innerHeight);
    break;
  }
}

window.addEventListener("keydown",function(evt){
  onKeyDown(evt.keyCode);
});

window.addEventListener("mousedown", function(evt){
  if(showGui){
  oldMouseX = evt.x;
  oldMouseY = evt.y;
  if(evt.x >= guiX && evt.x <= guiX + guiWidth && evt.y >= guiY && evt.y <= guiY + 50){
  dragging = true;
}
}
});

window.addEventListener("mouseup", function(evt){
  if(showGui){
  dragging = false;
  onMouseUp(evt.x,evt.y)
}
});

window.addEventListener("mousemove", function(evt){
  if(dragging && showGui){
    newMouseX = evt.x;
    newMouseY = evt.y;
    var mouseXDiff = newMouseX - oldMouseX;
    var mouseYDiff = newMouseY - oldMouseY;
    oldMouseX = evt.x;
    oldMouseY = evt.y;
    guiX += mouseXDiff;
    guiY += mouseYDiff;

  }
});


//Creating Gui Elements
function CheckBox(x,y){
  this.enabled = false;
  this.x = x + (guiX + 10);
  this.y = y + (guiY + 35);
  this.width = 25;
  this.height = 25;
  this.draw=function(){
    this.x = x + (guiX + 10);
    this.y = y + (guiY + 35);
    if(this.enabled){
    c.fillStyle="#0493a3";
  }else{
    c.fillStyle="#868b8c";
  }
    c.fillRect(this.x,this.y,this.width,this.height);
  }

  this.setEnabled = function(status){
    this.enabled = status;
  }
}

function Label(name,x,y){
  this.x = x + (guiX + 10);
  this.y = y + (guiY + 35);
  this.name = name;
  this.draw = function(){
    this.x = x + (guiX + 10);
    this.y = y + (guiY + 35);
    c.fillStyle = "#ffffffff";
    c.font = "25px Arial";
    c.fillText(this.name,this.x,this.y);
  }
}


function Module(name, x, y){
  this.x = x;
  this.y = y;
  this.name = name;
  this.label = new Label(this.name, this.x + 30, this.y + 1);
  this.checkbox = new CheckBox(this.x, this.y - 20);
  this.enabled = false;
    this.drawComponents = function(){
    this.label.draw();
    this.checkbox.draw();

  }

  this.onEnable = function(){

  }

  this.onDisable = function(){

  }

  this.onUpdate = function(){

  }

  this.onClick = function(){
    this.checkbox.setEnabled(!this.enabled)
    this.enabled = !this.enabled;
    if(this.enabled){
    this.onEnable();
  }else{
    this.onDisable();
  }
  }

}

var dummy1 = new Module("Dummy Hack", 10, 50);
var dummy2 = new Module("Dummy Hack 2", 10, 90);

dummy1.onEnable = function(){
  alert("Enabled");
}

dummy1.onDisable = function(){
  alert("Disabled");
}

dummy2.onUpdate = function(){
  if(this.enabled){
  c.fillStyle="#0000ff";
  c.fillRect(0,0,90,90);
}
}

var elements = [dummy1,dummy2];

function onMouseUp(x,y){
  for(var i = 0; i < elements.length; i++){
    if(x >= elements[i].checkbox.x && x <= elements[i].checkbox.x + elements[i].checkbox.width && y >= elements[i].checkbox.y && y <= elements[i].checkbox.y + elements[i].checkbox.height){
      elements[i].onClick();
    }
  }
}

function cheatRenderUpdate(){
  requestAnimationFrame(cheatRenderUpdate);
  if(showGui){
    c.fillStyle="#0493a3aa";
    c.fillRect(guiX,guiY,guiWidth,50);
    c.fillStyle="#4a4c4c";
    c.fillRect(guiX,guiY + 50,guiWidth,guiHeight);
    c.fillStyle="#ffffffff";
    c.font = "30px Arial";
    c.fillText("Cheat Name", guiX + 10, guiY + 35);
    c.font = "15px Arial";
    c.fillText("GUI Made By Ezb2661", guiX + guiWidth - 175, guiY + 30);
    for(var i = 0; i < elements.length; i++){
      elements[i].drawComponents();
    }

  }

  for(var i = 0; i < elements.length; i++){
    elements[i].onUpdate();
  }
}

function cheatUpdate(){
  requestAnimationFrame(cheatUpdate);

}

cheatUpdate();
cheatRenderUpdate();
