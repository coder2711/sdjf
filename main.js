music = "";
RightX = 0;
RightY = 0;
LeftX = 0;
LeftY = 0;
score_left = 0;
score_right = 0;
function preload(){
    music = loadSound("flute.mp3");

}

function setup(){
    canvas = createCanvas(350 , 350);
    canvas.center();
    vidau = createCapture(VIDEO);
    vidau.hide();
    posenet = ml5.poseNet(vidau, loaded );
    posenet.on('pose',  got_Results)
}
function loaded(){
    console.log("Looooooooooooooaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadddddddddddddddddddddddddddddeeeeeeeeeeeeeeeeeeeeeeeeeeeedddddddddddddddddddddd");
}
function got_Results(Bruh){
    if (Bruh.length>0){
        RightX = Bruh[0].pose.rightWrist.x;
        RightY = Bruh[0].pose.rightWrist.y;
        console.log("Right X and Y recieved");
        LeftX = Bruh[0].pose.leftWrist.x;
        LeftY = Bruh[0].pose.leftWrist.y;
        console.log("Left X and Y recieved");
        console.log(Bruh);
        score_left = Bruh[0].pose.keypoints[9].score;
        score_right = Bruh[0].pose.keypoints[10].score;
        console.log("Score for right = "+ score_right);
        console.log("Score for left = "+ score_left);

    }
}

function draw(){
    image(vidau  , 0,0,350,350);
    fill("#FF0000");
    stroke("#FF0000");
    if(score_left >0.2){
        circle(LeftX,LeftY,20);
        number_left_y = Number(LeftY);
        removeDecimal = floor(number_left_y);
        volume = removeDecimal/350;
        //volume_fixed = volume.toFixed(3);
        
        document.getElementById("Volume").innerHTML = "Volume = "+ volume;
        song.setVolume(volume);
    }

    if(score_right> 0.2){
        circle(RightX , RightY ,20);
        if(RightY>0 && RightY<=70){
            document.getElementById("Speed").innerHTML="Speed = 2.5x";
            song.rate(2.5);
        }
        else if(RightY>70 && RightY<=140){
            document.getElementById("Speed").innerHTML="Speed = 2.0x";
            song.rate(2.0);
        }
        else if(RightY>140 && RightY<=210){
            document.getElementById("Speed").innerHTML="Speed = 1.5x";
            song.rate(1.5);
        }
        else if(RightY>210 && RightY<=280){
            document.getElementById("Speed").innerHTML="Speed = 1.0x";
            song.rate(1.0);
        }
        else if(RightY>280 && RightY<=350){
            document.getElementById("Speed").innerHTML="Speed = 0.5x";
            song.rate(0.5);
        }
    }

}

function Play(){
    music.play();
    music.setVolume(1);
    music.rate(1);
}