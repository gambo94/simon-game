var buttonColors = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var started = false;
var bestScore = 0;
var bestScoreHTML = document.getElementById("score");

// activate this code and deactivate the 'function isMobile()' code to try it on desktop version 

// function isMobile(){
// var buttonMobile = document.getElementsByClassName("buttonMobile")[0];
//     buttonMobile.style.visibility= "visible";
//     buttonMobile.addEventListener("click", function(){
//         nextSequence();
//         buttonMobile.style.visibility= "hidden";
//     });
// }

isMobile();

    function isMobile(){
        // checking if user is mobile. If it is, shows button to start
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            // selecting button and making it visible
            var buttonMobile = document.getElementsByClassName("buttonMobile")[0];
            buttonMobile.style.visibility= "visible";

            // adding click event to button, starting game and making it invisible again for not being able to click it
            buttonMobile.addEventListener("click", function(){
                nextSequence();
                buttonMobile.style.visibility= "hidden";
            });
        }
    }

// creating var with all buttons
var allButtons = document.querySelectorAll(("[type='button']"));

// detecting which button user clicked
allButtons.forEach(button => {
    button.addEventListener("click", function() {
    var userChosenColour = button.id;
    userPattern.push(userChosenColour);
    // adding animation and sound to click
    buttonAnimation(userChosenColour);
    makeSound(userChosenColour);

    // calling checkAnswer and passing index of the current answer
    checkAnswer(userPattern.length-1);
    });
})

function checkAnswer(position){
    // checking if recent answer is the same as game pattern
    console.log(userPattern);
    
    if(gamePattern[position] === userPattern[position]){
        console.log('success');

        if (userPattern.length === gamePattern.length){
            setTimeout(() => {
                console.log('pasa por aquí');
            nextSequence();
            }, 1000);
        }
    } else {
        // adding sound to the game over
        var audioGameOver = new Audio('sounds/wrong.mp3');
        audioGameOver.play();

        // setting animation and timeout
        document.getElementsByTagName('body')[0].classList.add("game-over");
        setTimeout(function (){
            document.getElementsByTagName('body')[0].classList.remove("game-over");
        }, 300);

        // changing h1 with gameover
        document.getElementById("level-title").innerHTML = `Game Over, Press Any Key to Restart`;

        // restarting game
        startOver();

        // re-enabling mobile button
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        document.getElementsByClassName("buttonMobile")[0].style.visibility= "visible";
        }
    }
    
}

function startOver(){
    //updating best score
    if (bestScore < level){
        bestScore = level;
        bestScoreHTML.innerHTML = `<h2 id="score">Best score: ${bestScore}</h2>`
        } else {
            bestScoreHTML.innerHTML = `<h2 id="score">Best score: ${bestScore}</h2>`
        }

    // resetting game variables 
    level = 0;
    gamePattern = [];
    started = false;
}

function nextSequence(){
    // resetting userPattern
    userPattern = [];

    // generating random number and pushing to gamePattern
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    // adjusting level
    level++;
    var levelTitle = document.getElementById("level-title");
    levelTitle.innerHTML = `Level ${level}`;

    // adding animation and sound to button
    buttonAnimation(randomChosenColor);
    makeSound(randomChosenColor);
}


function buttonAnimation(randomChosenColor){
    var buttonChosen = document.getElementById(randomChosenColor);
    buttonChosen.classList.add("pressed");
    setTimeout(function (){
        buttonChosen.classList.remove("pressed");
    }, 300);
}


function makeSound(name){
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}


document.addEventListener("keydown", function(){
    if (started == false){
        nextSequence();
        started = true;
    }
});







