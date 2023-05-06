## Introduction 

Hi my name is Bunmi, I am a multi displinary technologist and I love making immersive experiences. 
This readme details my attempt at making a p5 js barbie filter/gif maker 
it is mostly for me to document my journey while detailing how I made the app 

For reference with the release of the new barbie movie coming out on  21 July 2023 staring Margot Robbie. Barbie released 
these set of posters 

![barbie](https://deadline.com/wp-content/uploads/2023/04/barbie-BARBIE_Character_MARGOT_InstaVert_1638x2048_DOM_rgb.jpg?w=1280)
![president barbie](https://deadline.com/wp-content/uploads/2023/04/barbie-BARBIE_Character_ISSA_InstaVert_1638x2048_DOM_rgb.jpg?w=1280)
![ken](https://deadline.com/wp-content/uploads/2023/04/barbie-BARBIE_Character_RYAN_InstaVert_1638x2048_DOM_rgb.jpg?w=1280)

So I thought it might be fun to make a personalized video/gif version that people can download. 


## Idea

My initial idea was to have the below user journey
- User goes to page
- Enters thier barbie feature 
- Hits record and saves video

![idea sketch 1](img/initial_idea.jpg)


## Exploration Phase

I was curious about how to cut out the background of the video and replace with the barbie background and i found this simple way of doing this 
by applying a threshold to the video pixel 
https://editor.p5js.org/lisajamhoury/sketches/zdx7KtsTM

https://idmnyu.github.io/p5.js-image/Filters/index.html

I also found these methods using open cv 
https://www.freedomvc.com/index.php/2022/01/17/basic-background-remover-with-opencv/#:~:text=Background%20Remover%20with%20OpenCV%20%E2%80%93%20Method%201&text=Perform%20Gaussian%20Blur%20to%20remove,a%20mask%20of%20the%20foreground

This methods where not as clear as I would like so I went into looking at ai methods

https://michael-holstein.medium.com/remove-background-from-person-by-using-ai-and-javascript-eb85674f9e8d

the model mentioned in the above was also avaliable in ml5js a ml library for P5 js
https://ml5js.org/community/

However I need to so some smoothing iof the edges suggested here
https://v-hramchenko.medium.com/how-to-cut-out-a-person-in-an-image-with-open-source-projects-e5e7f8798d5c

Other things I researched 
- was how to record the video
https://editor.p5js.org/lisajamhoury/sketches/JMSVEKmx8
- how to have the text moving
https://editor.p5js.org/pippinbarr/sketches/bjxEfpiwS


## Segementation Model

I first started with the [bodypix](https://npm.io/package/@tensorflow-models/body-pix)
![body pix model result](img/bodypix_result.jpeg)

I decided to switch to the [UNET](https://learn.ml5js.org/#/reference/unet)


## Final flow 
so after i tested this can work. I  can up with the below final flow, excuse the sketch was on a short timeline line.
![Final flow sketch](img/Final_flow_sketch.png) https://editor.p5js.org/ml5/sketches/UNET_webcam


##Assets

https://www.youtube.com/watch?v=oMGhyVoi4Fg&t=705s&ab_channel=Nucly%E2%80%A2PhotoshopandCreativeDesignTraining

# Running Project
set up python server
`python -m http.server`

If task is not killed properly
`lsof -i tcp:8000`
`kill -9 PID`
