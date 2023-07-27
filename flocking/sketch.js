// created in basis of Daniel Shiffman's Flocking Tutorial
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// and flying animation from https://codepen.io/leimapapa/pen/abzZLBy


//CONSTANTS
const flock = [];
let isActive = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < windowWidth/15; i++) {
    flock.push(new Boid());
  }

}

function draw() {
  background(217, 217, 212);
  if (isActive==true) {
    for (let boid of flock) {
      boid.edges();
      boid.flock(flock);
      boid.update();
      boid.show();
    } 
  } 
  // windowResize();
}

function mouseClicked() {
  if (isActive==true) {
    isActive=false;
  } else if (isActive==false) {
    isActive=true;
  }
}

// function windowResize() {
//   resizeCanvas(windowWidth, windowHeight);
// }
