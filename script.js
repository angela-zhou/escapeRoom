/*
Google CSSI Final Project - A Google-themed Escape Room
Code written by Vysnavi Rajeevan & Angela Zhou
Start Date: 2020-07-23
Projected End Date: 2020-07-31
Possible Next Steps: More screens, hints, or a 360 degree display
*/


/* global createCanvas, windowWidth, windowHeight, loadImage, rect, mouseX, mouseY, 
  noStroke, background, loadImage, image, height, width, fill, Clickable, text, textSize,
  push, pop, collideRectRect, remove, textAlign, RIGHT, startTimer, loadSound, soundFormats, key, removeItem, ellipse, random, dist,
  stroke, strokeWeight*/

// images
let officeImg, screwImg, fireImg, brailleImg, keyImg, safeImg;
let wa, ff, le;
let r,g,b,y;

// sound
let backgroundMusic;
let loopStart    = 0.5;
let loopDuration = 0.2;

// image settings
const imageWidth  = 1180;
const imageHeight = 787;

// clickable objects
let cup, chair, fireplace, books, moose, ceiling, box, safe, col;
let lights = [];

// counters for the clickables
let cupClicks       = 0;
let chairClicks     = 0;
let fireplaceClicks = 0;
let light1Clicks    = 0;
let light2Clicks    = 0;
let light3Clicks    = 0;
let colClicks = 0;

// screen booleans
let isWelcome  = true;
let isInstruct = false;
let gameWin    = false;
let gameLose   = false;

// screen images
let welcomeScreen, instructScreen, gameWinScreen, gameLoseScreen;

// combinations
const numberCode = "0706";
const letterCode = "waffle";
const colorCode  = "red yellow green blue";

// booleans
let extinguisherFound = false;
let screwdriverFound  = false;
let buttonPressed     = false;
let keyFound          = false;
let safeFound         = false;

// cursor dimensions
const cursorW = 10;
const cursorH = 10;

// text settings
const textX      = imageWidth + 40;
const textY      = 40
const largeText  = 32;

// image dimensions
const topRowY     = textY * 2;
const middleRow1Y = textY * 8;
const middleRow2Y = textY * 12;
const bottomRowY  = textY * 14;

const screwX      = textX;
const screwY      = topRowY;
const screwWidth  = 200;
const screwHeight = 200;

const fireX       = textX + 250;
const fireY       = topRowY;
const fireWidth   = 100;
const fireHeight  = 200;

const keyX        = textX;
const keyY        = middleRow1Y;
const keyWidth    = 100;
const keyHeight   = 100;

const safeX       = textX + 150;
const safeY       = middleRow1Y;
const safeWidth   = 200;
const safeHeight  = 150;

const leX         = textX;
const ffX         = textX + 150;
const waX         = textX + 300;
const lettersY    = middleRow2Y;

const brailleX      = textX - 20;
const brailleY      = bottomRowY;
const brailleWidth  = 500;
const brailleHeight = 250;

// setup the timer
document.getElementById('timer').innerHTML = 20 + ":" + 0;

startTimer();

function setup() {
  // canvas & color settings
  createCanvas(1700, 800);
  noStroke();
  
  r = random(255);
  g = random(255);
  b = random(255);
  
  // // load sound
  soundFormats('mp3', 'ogg');
  backgroundMusic = loadSound("https://cdn.glitch.com/20d3db83-bd8e-43c1-8f8b-226c9bb666c5%2FmysteryMusicTrim.mp3?v=1595880669023");
  // make the music quieter
  backgroundMusic.setVolume(0.5); 
  
  // load the clue images
  brailleImg = loadImage("https://cdn.glitch.com/20d3db83-bd8e-43c1-8f8b-226c9bb666c5%2Fbraille.png?v=1595525996171");
  officeImg  = loadImage("https://cdn.glitch.com/20d3db83-bd8e-43c1-8f8b-226c9bb666c5%2FgoogleOffice.webp?v=1595524300573");
  screwImg   = loadImage("https://cdn.glitch.com/20d3db83-bd8e-43c1-8f8b-226c9bb666c5%2Fscrewdriver.png?v=1596038794743");
  fireImg    = loadImage("https://cdn.glitch.com/20d3db83-bd8e-43c1-8f8b-226c9bb666c5%2FfireExtinguisher.png?v=1595696233819");
  keyImg     = loadImage("https://cdn.glitch.com/20d3db83-bd8e-43c1-8f8b-226c9bb666c5%2Fthumbnails%2Fkey.png?1595698947484");
  safeImg    = loadImage("https://cdn.glitch.com/20d3db83-bd8e-43c1-8f8b-226c9bb666c5%2Fsafe.png?1595698100346");
  wa         = loadImage("https://cdn.glitch.com/20d3db83-bd8e-43c1-8f8b-226c9bb666c5%2Fwa.png?v=1596037780546");
  ff         = loadImage("https://cdn.glitch.com/20d3db83-bd8e-43c1-8f8b-226c9bb666c5%2Fff.png?v=1596037780416");
  le         = loadImage("https://cdn.glitch.com/20d3db83-bd8e-43c1-8f8b-226c9bb666c5%2Fle.png?v=1596037780630");
  
  // load the screens
  welcomeScreen  = loadImage("https://cdn.glitch.com/20d3db83-bd8e-43c1-8f8b-226c9bb666c5%2F1.png?v=1595868392779");
  instructScreen = loadImage("https://cdn.glitch.com/20d3db83-bd8e-43c1-8f8b-226c9bb666c5%2F2.png?v=1595868395603");
  gameWinScreen  = loadImage("https://cdn.glitch.com/20d3db83-bd8e-43c1-8f8b-226c9bb666c5%2F3.png?v=1595864023786");
  gameLoseScreen = loadImage("https://cdn.glitch.com/20d3db83-bd8e-43c1-8f8b-226c9bb666c5%2F4.png?v=1595864028270");
}


function draw() {
  
  // draw the appropriate screens
  if (isWelcome) {
    background(welcomeScreen);
  } else if (isInstruct) {
    background(instructScreen);
  } else if (gameWin) {
    background(gameWinScreen);
  } else if (gameLose) {
    background(gameLoseScreen);
  }
  
  
}

function startGame() {
  // set the game background
  background(255);
  
  // play the sound
  backgroundMusic.loop();
  
  // display the title 
  textSize(largeText);
  text("Tools Collected:", textX, textY);
      
   // set the image
  image(officeImg, 0, 0, imageWidth, imageHeight);

  // create all the clickables  
  cup       = new Clickable( 610, 335,  20,  25);
  chair     = new Clickable( 250, 360, 150, 220);
  fireplace = new Clickable( 500, 430, 210, 130);
  books     = new Clickable( 885, 136,  50,  50);
  moose     = new Clickable( 530, 120,  35, 200);
  ceiling   = new Clickable(   0,   0, 200,  45);
  box       = new Clickable(1105, 580,  60,  40);
  lights[0] = new Clickable( 390, 205,  40,  50);
  lights[1] = new Clickable( 770, 170,  40,  70);
  lights[2] = new Clickable(1000, 160,  36,  70);
  col       = new Clickable( 275,   4,  18,  14);
  safe      = new Clickable(safeX, safeY, safeWidth, safeHeight);
}


// introduction of the game
// the code that triggers the main functionality
function keyPressed() {
  // pressing 's' starts the instructions/game
  if (key == 's') {
    if (isWelcome) {
      // get rid of the welcome screen
      isWelcome  = false;
      // set the instructions screen
      isInstruct = true;
    } else if (isInstruct) {
      // get rid of the instructions screen
      isInstruct = false;
      // start the game
      startGame();
    }
  }
}



// if statements for clickables getting hit
// main functionality of the game
function mouseClicked() {
  
  if(col.hit(cursorW, cursorH)) {
    
    if (buttonPressed) {
        // increment the number of hits
        colClicks++;

        // first color
        if(colClicks==1) {
            fill('red');
            ellipse(275,4,18, 14);
        }

        // second color
       else if(colClicks==2) {
            fill('yellow');
            ellipse(275,4,18, 14);
        }

      // third color
      else if(colClicks==3) {
            fill('green');
            ellipse(275,4,18, 14);      
      }

      // fourth color
      else if(colClicks==4){
            fill('blue');
            ellipse(275,4,18, 14);
        colClicks = 0;
      }
   }
}
  
  if (cup.hit(cursorW, cursorH)) {
    //console.log("hit");
    
    // increment the number of hits
    cupClicks++;
    
    // only the first time you click...
    if (cupClicks === 1) {
      // show the alert
      alert("You found a screwdriver in the cup. I wonder if screwdrivers are useful.");
      // change the boolean value
      screwdriverFound = true;
      // show the image
      image(screwImg, screwX, screwY, screwWidth, screwHeight);
    }
  }
  
  
  else if (chair.hit(cursorW, cursorH)) {
    //console.log("hit");
    
    // increment the number of hits
    chairClicks++;
    
    // only the first time you click...
    if (chairClicks === 1) {
      // show the alert
      alert("You moved the chair and found a fire extinguisher. I wonder who puts a fire extinguisher behind a chair.");
      // change the boolean value
      extinguisherFound = true;
      // show the image
      image(fireImg, fireX, fireY, fireWidth, fireHeight);
    }
    
  } 
  
  else if (fireplace.hit(cursorW, cursorH)) {
    //console.log("hit");
    
    // if the extinguisher has not been found
    if (extinguisherFound == false) {
      
      // let the user know something is there
      alert("You see something under the wood, but you can't pick it up.\nThe fire is too hot.")
      
    } else {
      
      // you start incrementing the number of hits
      fireplaceClicks++;
      
      // show the alert
      alert("You extinguished a fire and found a braille legend.");
      
      // only the first time you click the fireplace after the chair...
      if (fireplaceClicks === 1) {
        // show the image
        image(brailleImg, brailleX, brailleY, brailleWidth, brailleHeight);
      }
    }
  } 
  
  else if (books.hit(cursorW, cursorH)) {
    //console.log("hit");
    
    // if the safe hasn't been found yet
    if (!safeFound) {
      // show the input box
      wordLock();
    }
  } 
  
  else if (moose.hit(cursorW, cursorH)) {
    //console.log("hit");
    
    if (screwdriverFound == false) {
      // let the user know something is there
      alert("You see something stuck inside the moose, but the metal is screwed onto the wood.");
      
    } else {
      // show the alert
      alert("You found a photo of your arch-rival practicing their project presentation.\nOn the back of the image is a date: July 6th");
    }
  } 
  
  else if (ceiling.hit(cursorW, cursorH)) {
    //console.log("hit");
    
    // if the button has not been pressed yet
    if (!buttonPressed) {
      // show the input box
      numberLock();
    }
  }
  
  else if (box.hit(cursorW, cursorH)) {
    //console.log("hit");
    
    // if the key has not been found yet
    if (!keyFound) {
      // show the input box
      colorLock();
    }
  }
  
  else if (lights[0].hit(cursorW, cursorH)) {
    //console.log("hit");
    // increment the number of hits
    light1Clicks++;
        
    // only the first time you click...
    if (light1Clicks === 1) {
      // reveal a braille image
      image(wa, waX, lettersY);
    }
  }
  
  else if (lights[1].hit(cursorW, cursorH)) {
    //console.log("hit");
    // increment the number of hits
    light2Clicks++;
      
    // only the first time you click...
    if (light2Clicks === 1) {
      // reveal a braille image
      image(ff, ffX, lettersY);
    }
  }
    
  else if (lights[2].hit(cursorW, cursorH)) {
    //console.log("hit");
    // increment the number of hits
    light3Clicks++;
      
    // only the first time you click...
    if (light3Clicks === 1) {
      // reveal a braille image
      image(le, leX, lettersY);
    }
  }
  
  else if (safe.hit(cursorW, cursorH)) {
    // if the key and the safe have both been found
    if (keyFound && safeFound) {
      // the user wins the game
      gameWin = true;
    }
  }
}

// functions for the user input

function numberLock() {
  
  // prompt the user for a combo
  var combo = prompt("A locked box fell from the ceiling. Ouch! \nEnter a 4-digit combination to unlock it:");
  
  // if the user enters the right combo
  if (combo == numberCode) {
    // tell the user they can now change the color of the light
    alert("You unlocked the box and pressed a button.\nThen you heard a noise coming from the ceiling.\nMaybe there's another clue on the ceiling.\nHopefully not another locked box.");
    // change the value of the boolean
    buttonPressed = true;
    
  // edge cases
  } else if (combo == null || combo == "") {
      alert("You didn't enter anything.\nTry again once you find the combination.");
  } else {
      alert("Wrong combination\nPlease try again.");
  }
}

function wordLock() {
  
  // prompt the user for a combo
  var combo = prompt("You found a locked box disguised as a 'Javascript for Dummies' book.\nEnter a 6-letter word combination to unlock it:");
  
  // if the user enters the right combo
  if (combo.toLowerCase() == letterCode) {
    // tell them they found a safe
    alert("You found a locked safe. It looks like it needs a key to open it.");
    // set safeFound to true
    safeFound = true;
    // show the image
    image(safeImg, safeX, safeY, safeWidth, safeHeight);
  
  // edge cases
  } else if (combo == null || combo == "") {
      alert("You didn't enter anything.\nTry again once you find the combination.");
  } else {
      alert("Wrong combination\nPlease try again.");
  }
}

function colorLock() {
  
  // prompt the user for a combo
  var combo = prompt("You found a locked box disguised as a 'Cracking the Coding Interview' book.\nType in a color combination to unlock it.\n Hint: Each color name should be seperated by a space.");
  
  // if the user enters the right combo
  if (combo.toLowerCase() == colorCode) {
    // tell them they found the key
    alert("You found a key!");
    // set keyFound to true
    keyFound = true;
    // show the image
    image(keyImg, keyX, keyY, keyWidth, keyHeight);
  
  // edge cases
  } else if (combo == null || combo == "") {
      alert("You didn't enter anything.\nTry again once you find the combination.");
  } else {
      alert("Wrong combination\nPlease try again.");
  }
}

// timer functions

function startTimer() {
  
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  
  if (s== 59) {
    m--;
  }
  
  if (m < 0) {
    gameLose = true;
    //remove(startTimer);
    //alert("Time is UP");
  }
  
  document.getElementById('timer').innerHTML = m + ":" + s;
  console.log(m)
  setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}