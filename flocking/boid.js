// created in basis of Daniel Shiffman's Flocking Tutorial
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// and flying animation from https://codepen.io/leimapapa/pen/abzZLBy


var boidColor = "rgb(" + 206 + ", " + 97 + ", " + 80 + ")";
var boidColor2 = "rgb(" + 255 + ")";

class Boid {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4));
    this.acceleration = createVector();
    this.maxForce = 0.2;
    this.maxSpeed = 5;

    this.col = boidColor;

    this.wingSpeed = 10;
		this.num = 0;
		//vertex positions that are cycled through to create a flapping motion
		this.flap = [
			-16,
			-16,
			-16,
			-16,
			-16,
			-16,
			-15,
			-14,
			-13,
			-12,
			-11,
			-10,
			-9,
			-8,
			-7,
			-6,
			-5,
			-4,
			-3,
			-2,
			-1,
			0,
			1,
			2,
			3,
			4,
			5,
			6,
			7,
			8,
			9,
			10,
			11,
			12,
			13,
			14,
			15,
			16,
			15,
			14,
			13,
			12,
			11,
			10,
			9,
			8,
			7,
			6,
			5,
			4,
			3,
			2,
			1,
			-1,
			-2,
			-3,
			-4,
			-5,
			-6,
			-7,
			-8,
			-9,
			-10,
			-11,
			-12,
			-13,
			-14,
			-15,
			-16,
			-16,
			-16,
			-16,
			-16
		];
		this.flapLength = this.flap.length - 1;
		this.startNum = random(0, this.flapLength);
  }

  edges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }

  align(boids) {
    let perceptionRadius = 30;
    let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other != this && d < perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  separation(boids) {
    let perceptionRadius = 24;
    let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other != this && d < perceptionRadius) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(d * d);
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  cohesion(boids) {
    let perceptionRadius = 50;
    let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other != this && d < perceptionRadius) {
        steering.add(other.position);
        total++;
      }
    }

    //color change
    if (total > 1) {
			this.startNum = 30;
			this.col = boidColor;
      this.startNum++;
			return createVector(0, 0);
		} else {
      //loners
			this.col = boidColor2;
			this.startNum++;
			return createVector(0, 0);
		}

		// this.startNum++;
		// return createVector(0, 0);
  }

  flock(boids) {
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let separation = this.separation(boids);

    alignment.mult(2.5);
    cohesion.mult(2);
    separation.mult(1.5);

    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);

    if (this.startNum > this.flapLength) {
			this.startNum = 0;
		}
  }

  show() {
    var flapper = this.startNum;
		push();
		translate(this.position.x, this.position.y);
		rotate(this.velocity.heading() + radians(180));
		beginShape();
		fill(this.col);
		stroke(this.col);
		strokeWeight(1);
		//front
		vertex(0, 0);
		//wing 1
		vertex(this.flap[flapper], -13);
		//where the backside point ends
		vertex(5, 0);
		//wing 2
		vertex(this.flap[flapper], 13);
		scale(this.boidSize);
		endShape(CLOSE);
		pop();
  }
}
