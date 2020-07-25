/*
Google CSSI Final Project - A Google-themed Escape Room
Code written by Vysnavi Rajeevan & Angela Zhou
Start Date: 2020-07-23
Projected End Date: 2020-07-31
Possible Next Steps: 
*/


/* global createCanvas, windowWidth, windowHeight, loadImage, rect, mouseX, mouseY, 
  noStroke, background, loadImage, image, height, width, fill, Clickable, text, textSize,
  push, pop, collideRectRect, remove, textAlign, RIGHT, startTimer */

// images
let officeImg, fireImg, brailleImg, keyImg, safeImg;
let ja, cl, yn;

// image settings
const imageWidth  = 1180;
const imageHeight = 787;

// clickable objects
let chair, fireplace, books, moose, ceiling, safe;
let lights = [];

// counters for the clickables
let chairClicks     = 0;
let fireplaceClicks = 0;
let light1Clicks    = 0;
let light2Clicks    = 0;
let light3Clicks    = 0;

// booleans
let keyFound  = false;
let safeFound = false;

// cursor dimensions
const cursorW = 10;
const cursorH = 10;

// text settings
const textX      = imageWidth + 40;
const textY      = 40
const smallText  = 14;
const mediumText = 24;
const largeText  = 32;

// image dimensions
const topRowY     = textY * 4;
const middleRowY  = textY * 10;
const bottomRowY  = textY * 13;

const fireX       = textX;
const fireY       = topRowY;
const fireWidth   = 100;
const fireHeight  = 200;

const keyX        = textX + 100;
const keyY        = topRowY;
const keyWidth    = 100;
const keyHeight   = 100;

const safeX       = textX + 250;
const safeY       = topRowY;
const safeWidth   = 200;
const safeHeight  = 150;

const ynX         = textX;
const clX         = textX + 150;
const jaX         = textX + 300;
const lettersY    = middleRowY;

const brailleX    = textX
const brailleY    = bottomRowY;

// setup the timer
document.getElementById('timer').innerHTML = 5 + ":" + 0;
startTimer();

function setup() {
  // canvas & color settings
  createCanvas(2000, 1000);
  noStroke();
  
  // only want to load images once
  brailleImg = loadImage("https://cdn.glitch.com/20d3db83-bd8e-43c1-8f8b-226c9bb666c5%2Fbraille.png?v=1595525996171");
  officeImg  = loadImage("https://cdn.glitch.com/20d3db83-bd8e-43c1-8f8b-226c9bb666c5%2FgoogleOffice.webp?v=1595524300573");
  fireImg    = loadImage("https://cdn.glitch.com/20d3db83-bd8e-43c1-8f8b-226c9bb666c5%2FfireExtinguisher.png?v=1595696233819");
  keyImg     = loadImage("https://cdn.glitch.com/20d3db83-bd8e-43c1-8f8b-226c9bb666c5%2Fthumbnails%2Fkey.png?1595698947484");
  safeImg    = loadImage("https://cdn.glitch.com/20d3db83-bd8e-43c1-8f8b-226c9bb666c5%2Fsafe.png?1595698100346");
  ja         = loadImage("https://cdn.glitch.com/20d3db83-bd8e-43c1-8f8b-226c9bb666c5%2Fja.png?v=1595688985481");
  cl         = loadImage("https://cdn.glitch.com/20d3db83-bd8e-43c1-8f8b-226c9bb666c5%2Fcl.png?v=1595688989924");
  yn         = loadImage("https://cdn.glitch.com/20d3db83-bd8e-43c1-8f8b-226c9bb666c5%2Fyn.png?v=1595688993883");
  
  // display the title 
  textSize(largeText);
  text("Find your hard drive!", textX, textY);
  
  // display the instructions
  textSize(smallText);
  text("Click anywhere on the image to find clues", textX, textY * 2);
  
  // display the subtitle
  textSize(mediumText);
  text("Tools Collected:", textX, textY * 3);
  
  // display the first alert
  alert("You are the biggest contributor to a world-changing Google update that you put on a hard drive.\nThere’s only one problem: your arch-rival hid your hard drive somewhere in their office.\nYou must find it before the timer runs out and your arch-rival presents their idea at the meeting instead.")
}

function draw() {
  // set the image
  image(officeImg, 0, 0, imageWidth, imageHeight);
  
  // create all the clickables
  chair     = new Clickable( 250, 360, 150, 220);
  fireplace = new Clickable( 500, 430, 210, 130);
  books     = new Clickable( 885, 136,  50,  50);
  moose     = new Clickable( 530, 120,  35, 200);
  ceiling   = new Clickable(   0,   0, 350,  45);
  lights[0] = new Clickable( 390, 205,  40,  50);
  lights[1] = new Clickable( 770, 170,  40,  70);
  lights[2] = new Clickable(1000, 160,  36,  70);
  safe      = new Clickable(safeX, safeY, safeWidth, safeHeight);
  
}

// if statements for clickables getting hit
// main functionality of the game
function mouseClicked() {
  
  if (chair.hit(cursorW, cursorH)) {
    console.log("hit");
    
    // increment the number of hits
    chairClicks++;
    
    // show the alert
    alert("You moved the chair and found a fire extinguisher.");
    
    // only the first time you click...
    if (chairClicks === 1) {
      // show the image
      image(fireImg, fireX, fireY, fireWidth, fireHeight);
    }
  } 
  
  else if (fireplace.hit(cursorW, cursorH)) {
    console.log("hit");
    
    // only if the chair has been clicked...
    if (chairClicks === 1) {
      
      // you start incrementing the number of hits
      fireplaceClicks++;
      
      // show the alert
      alert("You extinguished a fire and found a braille legend.");
      
      // only the first time you click the fireplace after the chair...
      if (fireplaceClicks === 1) {
        // show the image
        image(brailleImg, brailleX, brailleY);
      }
    }
    
  } 
  
  else if (books.hit(cursorW, cursorH)) {
    console.log("hit");
    
    // if the safe hasn't been found yet
    if (!safeFound) {
      // show the input box
      wordLock();
    }
  } 
  
  else if (moose.hit(cursorW, cursorH)) {
    console.log("hit");
    
    // show the alert
    alert("You found a code: 0706");
  } 
  
  else if (ceiling.hit(cursorW, cursorH)) {
    console.log("hit");
    
    // if the key hasn't been found yet
    if (!keyFound) {
      // show the input box
      numberLock();
    }
  }
  
  else if (lights[0].hit(cursorW, cursorH)) {
    console.log("hit");
    // increment the number of hits
    light1Clicks++;
        
    // only the first time you click...
    if (light1Clicks === 1) {
      // reveal a braille image
      image(ja, jaX, lettersY);
    }
  }
  
  else if (lights[1].hit(cursorW, cursorH)) {
    console.log("hit");
    // increment the number of hits
    light2Clicks++;
      
    // only the first time you click...
    if (light2Clicks === 1) {
      // reveal a braille image
      image(cl, clX, lettersY);
    }
  }
    
  else if (lights[2].hit(cursorW, cursorH)) {
    console.log("hit");
    // increment the number of hits
    light3Clicks++;
      
    // only the first time you click...
    if (light3Clicks === 1) {
      // reveal a braille image
      image(yn, ynX, lettersY);
    }
  }
  
  else if (safe.hit(cursorW, cursorH)) {
    // if the key and the safe have both been found
    if (keyFound && safeFound) {
      // the user wins the game
      alert("Congratulations! You found the hard drive!");
    }
  }
  
  // else {}
}

// functions for the user input

function numberLock() {
  
  // prompt the user for a combo
  var combo = prompt("A locked box fell from the ceiling.\nEnter a 4-digit combination to unlock it:");
  
  // if the user enters the right combo
  if (combo == "0706") {
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

function wordLock() {
  
  // prompt the user for a combo
  var combo = prompt("You found a locked box disguised as books.\nEnter a 6-letter word combination to unlock it:");
  
  // if the user enters the right combo
  if (combo == "jaclyn") {
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