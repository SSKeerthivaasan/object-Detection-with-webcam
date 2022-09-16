Status=""
img=""
object=[];
function preload(){
img=loadImage('dog_cat.jpg');
}
function setup(){
canvas=createCanvas(380,380);
canvas.center();
video =createCapture(VIDEO);
video.hide();
video.size(380,380);
}
function start(){
objectDetector=ml5.objectDetector('cocossd',modelLoded);
document.getElementById("status").innerHTML="status:detecting Object";
}
function draw(){
image(video,0,0,380,380);
if(Status !=""){
    r=random(255);
    g=random(255);
    b=random(255);
    for(i=0;i<object.length;i++){
        document.getElementById("status").innerHTML="status:objectdetected";
        document.getElementById("number_of_object").innerHTML="Number of object detected are:"+object.length;
        fill(r,b,g);
        percent=floor(object[i].confidence*100);
        text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
        noFill();
        stroke(r,b,g);
        rect(object[i].x,object[i].y,object[i].width,object[i].height);
    }
}
}
function modelLoded(){
    console.log("model loded");
    Status=true;
    objectDetector.detect(video,gotResult);
}
function gotResult(error,results){
    if (error){
        console.log(error);
    }
    console.log(results);
object=results;
}