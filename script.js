/*
Google CSSI Final Project - A Google-themed Escape Room
Code written by Vysnavi Rajeevan & Angela Zhou
Start Date: 2020-07-23
Projected End Date: 2020-07-31
Possible Next Steps: 
*/


/* global createCanvas, windowWidth, windowHeight, loadImage, rect, mouseX, mouseY, 
  noStroke, rect, background, loadImage, image, height, width, CENTER, imageMode, fill,
  Clickable */

// images
let officeImg;
let brailleImg;

// clickable objects
let chair, fireplace, books, ceiling, moose, numberOfLights;
let lights      = [];

// cursor dimensions
let cursorW = 10;
let cursorH = 10;

function setup() {
  // canvas & color settings
  createCanvas(windowWidth, windowHeight);
  noStroke();
  
  // only want to load images once
  brailleImg = loadImage("https://cdn.glitch.com/20d3db83-bd8e-43c1-8f8b-226c9bb666c5%2Fbraille.png?v=1595525996171");
  officeImg = loadImage("https://cdn.glitch.com/20d3db83-bd8e-43c1-8f8b-226c9bb666c5%2FgoogleOffice.webp?v=1595524300573");
}

function draw() {
  // image settings
  imageMode(CENTER);
  image(officeImg, width/2, height/2);
 
  // create all the clickables
  chair     = new Clickable( 620, 430, 150, 220);
  fireplace = new Clickable( 870, 510, 210, 120);
  books     = new Clickable(1250, 210,  55,  50);
  moose     = new Clickable( 895, 195,  40, 120);
  ceiling   = new Clickable( 440,  80, 300,  40);
  lights[0] = new Clickable( 765, 285,  30,  40);
  lights[1] = new Clickable(1145, 250,  30,  60);
  lights[2] = new Clickable(1375, 240,  30,  60);
  
}

function mouseClicked() {
  // if statements for clickables getting hit
  if (chair.hit(cursorW, cursorH)) {
    console.log("hit");
  } else if (fireplace.hit(cursorW, cursorH)) {
    console.log("hit");
  } else if (books.hit(cursorW, cursorH)) {
    console.log("hit");
  } else if (moose.hit(cursorW, cursorH)) {
    console.log("hit");
  } else if (ceiling.hit(cursorW, cursorH)) {
    console.log("hit");
  } else {
    // for loop for the lights clickables
    for (const l of lights) {
      if (l.hit(cursorW, cursorH)) {
        console.log("hit");
      }
    }
  }
}

     
