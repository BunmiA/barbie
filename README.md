## Introduction 

Hi my name is Bunmi and I love making immersive experiences. This readme details my attempt at making a p5 js barbie filter
it is mostly for me to document my journey while detailing how I made the app 

For reference with the release of the new barbie movie coming out on  21 July 2023 staring Margot Robbie. Barbie released 
these set of posters 

![barbie](https://deadline.com/wp-content/uploads/2023/04/barbie-BARBIE_Character_MARGOT_InstaVert_1638x2048_DOM_rgb.jpg?w=1280)
![president barbie](https://deadline.com/wp-content/uploads/2023/04/barbie-BARBIE_Character_ISSA_InstaVert_1638x2048_DOM_rgb.jpg?w=1280)
![ken](https://deadline.com/wp-content/uploads/2023/04/barbie-BARBIE_Character_RYAN_InstaVert_1638x2048_DOM_rgb.jpg?w=1280)

So I thought it might be fun to make a video version that people can download. 


## Idea

My initial idea was to have the below user journey
- User goes to page
- enters thier barbie feature 
- hits record and saves video

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

Howevere I need to so some smoothing iof the edges suggested here
https://v-hramchenko.medium.com/how-to-cut-out-a-person-in-an-image-with-open-source-projects-e5e7f8798d5c


Other things i researched 
- was how to record the video
https://editor.p5js.org/lisajamhoury/sketches/JMSVEKmx8
- how to have the text moving
https://editor.p5js.org/pippinbarr/sketches/bjxEfpiwS



# Running Project
set up python server
`python -m http.server`

Find process on port and kill on maxc
`lsof -i tcp:8000`
`kill -9 PID`
