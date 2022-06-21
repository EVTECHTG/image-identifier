function preload(){

}

function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet',ModelLoaded);
}

function ModelLoaded(){
  console.log("model Is ready To be Used");
}

function draw(){
  image(video,0,0,300,300);
  classifier.classify(video,gotResults)
}

var previous_result = "";

function gotResults(error,Results){
  if(error){
    console.log(error);
  } else{
    if((Results[0].confidence > 0.5) && (previous_result != Results[0].label)){
      console.log(Results);
      previous_result = Results[0].label;
      synth = window.speechSynthesis;
      speak_data = "The Object i see is"+Results[0].label;
      utterThis= new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);

      document.getElementById("result_object_name").innerText = Results[0].label;

      document.getElementById("result_object_accuracy").innerText = Results[0].confidence.toFixed(3);
      
    }
  }
}