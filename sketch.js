
let myVid;
let threshold = 150;
let back_ground_pixels;
let currentString =  'This barbie is a'

let string = 'This Barbie is a baddie';
let currentCharacter = 0;
let pageMargin = 25;
let j = 0;

let recording = false;
let recorder;
let chunks = [];

const fr = 30;

let bodypix;
let video;
let segmentation;
let backgroundImage;
let logoImage;

const options = {
    architecture: 'ResNet50', //'MobileNetV1'
    outputStride: 32, // 8, 16, or 32, default is 16
    segmentationThreshold: 0.35, // 0 - 1, defaults to 0.5
}

function preload() {
    bodypix = ml5.bodyPix(options);
    backgroundImage = loadImage('img/template.jpg');
    logoImage = loadImage('img/symbol-barbie-names-png-logo-10.png');
}


function setup() {
    // canvas is same resolution as webcam
    createCanvas(640, 800);

    // initialize recorder
    record();

    // make the webcam
    video = createCapture(VIDEO,videoReady);
    video.size(width, height/2);
    video.hide(); // hide it


}

function videoReady() {
    bodypix.segment(video, gotResults);
}

function draw() {
    let currentString = string.substring(0, currentCharacter);
    background(255);

    image(backgroundImage,0,0,width,height);


    if (segmentation) {
        image(segmentation.backgroundMask, 0, 0, width, height);
    }

    image(logoImage,width/3,height/2,width/3,height/3);


    // Don't forget this!
    // updatePixels();


    // Draw the current string on the page, with some margins
    push();
    textSize(12);
    textFont(`Courier`);
    textAlign(LEFT, TOP);
    text(currentString, pageMargin + 10, pageMargin + 10, width - pageMargin*2, height - pageMargin);
    pop();

    currentCharacter += 0.1;
}



function gotResults(error, result) {
    if (error) {
        console.log(error);
        return;
    }
    segmentation = result;
    bodypix.segment(video, gotResults);
}




function record() {
    chunks.length = 0;

    let stream = document.querySelector('canvas').captureStream(fr);

    recorder = new MediaRecorder(stream);

    recorder.ondataavailable = e => {
        if (e.data.size) {
            chunks.push(e.data);
        }
    };

    recorder.onstop = exportVideo;

}

function exportVideo(e) {
    var blob = new Blob(chunks, { 'type' : 'video/webm' });

    // Draw video to screen
    var videoElement = document.createElement('video');
    videoElement.setAttribute("id", Date.now());
    videoElement.controls = true;
    document.body.appendChild(videoElement);
    videoElement.src = window.URL.createObjectURL(blob);

    // Download the video
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    a.href = url;
    a.download = 'newVid.webm';
    a.click();
    window.URL.revokeObjectURL(url);

}


function keyPressed() {

    // toggle recording true or false
    recording = !recording
    console.log(recording);

    // 82 is keyCode for r
    // if recording now true, start recording
    if (keyCode === 82 && recording ) {

        console.log("recording started!");
        recorder.start();
    }

    // if we are recording, stop recording
    if (keyCode === 82 && !recording) {
        console.log("recording stopped!");
        recorder.stop();
    }

}
