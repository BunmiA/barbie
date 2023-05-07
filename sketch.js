
let myVid;
let threshold = 150;
let back_ground_pixels;
let currentString ;

// let string = 'This Barbie is a baddie';
let currentCharacter = 0;
let pageMargin = 25;
let j = 0;

let recording = false;
let recorder;
let chunks = [];

const fr = 30;

let backgroundModel;
let video;
let segmentation;
let backgroundImage;
let logoImage;
let startPageBackgroundImage;
let endPageBackgroundImage;
let mainLogoImage;
let endBackgroundImage;


let barbie_page= false;
let cur_page = 0;

let startButton;
let nameInput;
let name = 'Bunmi';
let descriptionInput;
let description = 'This barbie is a baddie ';

let nameY = 600
let nameX = 280
let descriptionY = 640
let buttonY = 680
let timer = 10;

let lightPink = '#FCEDF5';
let brightPink = '#DF2B9F'


const options = {
    architecture: 'ResNet50', //'MobileNetV1'
    outputStride: 32, // 8, 16, or 32, default is 16
    segmentationThreshold: 0.35, // 0 - 1, defaults to 0.5
}

function preload() {
    backgroundModel = ml5.uNet('face'); // ml5.bodyPix(options);
    backgroundImage = loadImage('img/template.jpg');
    logoImage = loadImage('img/barbie_logo_updated.png');
    startPageBackgroundImage = loadImage('img/bg-index.jpg');
    endPageBackgroundImage = loadImage('img/bg-default.jpg');
    mainLogoImage = loadImage('img/logo-barbie.png');
    endBackgroundImage = loadImage('img/bg-default.jpg');
}


function setup() {
    // rectMode(CENTER);
    // canvas is same resolution as webcam
    createCanvas(640, 800);
    startPage();

    // initialize recorder
    record();

    // todo un comment when running offline make the webcam
    video = createCapture(VIDEO,videoReady);
    video.size(width, height/2);
    video.hide(); // hide it

    // Start with a blank image
    // let segmentation = createImage(width, height);

    // initial segmentation
    // uNet.segment(video, gotResults);

}

function videoReady() {
     backgroundModel.segment(video, gotResults);
}

function startPage(){
    nameInput = createInput('');
    nameInput.position(nameX, nameY);
    nameInput.style('font-size', '20px', 'color', '#ffffff');

    descriptionInput = createInput('');
    descriptionInput.position(nameX, descriptionY);
    descriptionInput.style('font-size', '20px', 'color', '#ffffff');


    startButton = createButton("Begin");
    startButton.position(nameX-100, buttonY+10);

    startButton.mousePressed(goToBarbiePage);
    startButton.style('background-color', brightPink);
    startButton.style('border', 'none');
    startButton.style('color', 'white');
    startButton.style('padding', '10px');
    startButton.style('text-align', 'center');
    startButton.style('font-weight', 'bold');
    startButton.style('text-decoration','none');
    startButton.style('display', 'inline-block');
    startButton.style('font-size', '16px');
    startButton.style('margin', '6px 2px');
    startButton.style('cursor', 'pointer');
    startButton.style('border-radius', '20px');
    startButton.style('width', '260px');
    noStroke();
    text("Enter your name.", 20, 20);
    // var name = nameInput.value();
}

function nameInputEvent() {
    console.log('you are typing: ', this.value());
}

function goToBarbiePage(){
    console.log('going to barbie page');
    cur_page = 1;
    name = nameInput.value();
    description = 'This barbie is a ' + descriptionInput.value();
    setTimeout(() => {  }, 1000);
    recorder.start()

    // video = createCapture(VIDEO);
    // video.size(width, height/2);
}

function endPage(){

}


function draw() {
    if(cur_page ==0){
        // start page elements
        image(startPageBackgroundImage, 0, 0, width*2, height);
        image(mainLogoImage, 150, 60, 320, 140);
        fill(lightPink);
        ellipse(320, 600, 600, 600);

        fill(brightPink);
        textSize(20);
        textFont(`sans-serif`);
        text('This is an experimental project based on the official' +
            ' barbie movie selfie generator (www.barbieselfie.ai) \n \n ' +
            'Enter your name and kind of barbie you are and make your GIF! ', nameX-160, nameY -200 , 400, 200);

        text('Enter your name', nameX-200, nameY +20);
        text('This barbie is a ....', nameX-200, descriptionY+20);

        fill(lightPink);
        // triangles around circles
        for (var angle= 0; angle<(2*PI); angle+=(PI/18) ){
            var x = 320 * sin(angle) + 320;
            var y = 320 * cos(angle) + 600;
            //ellipse(x, y, 60, 60);
            push();
            translate(x, y);
            rotate(PI-angle);
            //triangle(x-(2*30), y+30, x, y-(2*30), x+(2*30), y+30);
            triangle(-(2*30), 30, 0, -(2*30), (2*30), 30);
            pop();
        }
    }

    if (cur_page == 1){
        // recorder.start();
        nameInput.hide();
        startButton.hide();
        descriptionInput.hide();

        if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
            timer --;
        }

        if(timer == 0){
            recorder.stop();
            cur_page = 2;
            video.remove();
        }

        let currentString = description.substring(0, currentCharacter);

        background(255);
        // barbie background photo
        image(backgroundImage, 0, 0, width, height);
        // using ML to segment image
        if (segmentation) {
            image(segmentation.backgroundMask, 0, 0, width, height);
        }
        // adding barbie logo
        image(logoImage, 80, 420, 500,240);
        // Don't forget this!
        // updatePixels();

        // adding text for the name
        push();
        textSize(30);
        textFont(`sans-serif`);
        fill('white');
        textAlign(LEFT, TOP);
        text(name, width/2 - (name.length * 10), 20);
        pop();

        text(timer, width-50, 30);

        // adding text for the barbie description
        push();
        textSize(20);
        textFont(`sans-serif`);
        fill('white');
        textAlign(LEFT, TOP);
        text(currentString, pageMargin , pageMargin+50 , pageMargin + 100, 300);
        // text(currentString, pageMargin + 10, pageMargin + 10, width - pageMargin * 2, height - pageMargin);
        pop();
        currentCharacter += 0.1;
    }

    if (cur_page == 2){
        recorder.stop();

        nameInput.hide();
        startButton.hide();
        descriptionInput.hide();

        image(endBackgroundImage, 0, 0, width, height);
        image(mainLogoImage, 150, 60, 320, 140);
        fill(brightPink);
        textSize(16);
        text('You are all done! your video has been downloaded :) \n \n', nameX-100, nameY -300);
        a = createA('http://bunmisram.squarespace.com/', 'Made by @bunmisram');
        a.position(nameX-100, nameY -260);
        a.style('color', '#DF2B9F');
        a.style('font', 'sans-serif');
        a.style('font-size', '16px');
    }
}


function gotResults(error, result) {
    // if there's an error return it
    if (error) {
        console.log(error);
        return;
    }
    // set the result to the global segmentation variable
    segmentation = result;

    // Continue asking for a segmentation image
    backgroundModel.segment(video, gotResults);
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


// function keyPressed() {
//
//     // toggle recording true or false
//     recording = !recording
//     console.log(recording);
//
//     // 82 is keyCode for r
//     // if recording now true, start recording
//     if (keyCode === 82 && recording ) {
//         console.log("recording started!");
//         recorder.start();
//     }
//
//     // if we are recording, stop recording
//     if (keyCode === 82 && !recording) {
//         console.log("recording stopped!");
//         recorder.stop();
//     }
//
//     //this will download the first 5 seconds of the animation!
//     if (key === 's') {
//         saveGif('mySketch', 5);
//     }
//
// }
