class Rocket {
  constructor(location, initdna) {
    // all the physics stuff
    this.acceleration = createVector();
    this.velocity = createVector();
    this.position = location.copy();

    // size
    this.r = 4;

    // Fitness and DNA
    this.fitness = 0;
    this.dna = initdna;

    // to count which force we're on in the genes
    this.geneCounter = 0;

    this.hitTarget = false; // Did the rocket reach the target
  }

  // Fitness Function
  // fitness = one divided by distance squared
  calcFitness() {
    let d = dist(this.position.x, this.position.y, target.x, target.y);
    this.fitness = pow(1 / d, 2);
  }

  // Run in relation to all the obstacles
  // If the rocket is stuck, don't bother updating or checking for intersection
  run() {
    this.checkTarget(); // check to see if we've reached the target
    if (!this.hitTarget) {
      this.applyForce(this.dna.genes[this.geneCounter]);
      this.geneCounter = (this.geneCounter + 1) % this.dna.genes.length;
      this.update();
    }

    this.display();
  }

  checkTarget() {
    let d = dist(this.position.x, this.position.y, target.x, target.y);
    if (d < 12) {
      this.hitTarget = true;
    }
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {
    let theta = this.velocity.heading() + PI / 2;
    let r = this.r;
    
    stroke(0);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);

    // Thruster
    rectMode(CENTER);
    fill(0);
    rect(-r / 2, r * 2, r / 2, r);
    rect(r / 2, r * 2, r / 2, r);

    // Rocket body
    fill(255);
    beginShape(TRIANGLES);
    vertex(0, -r * 2);
    vertex(-r, r * 2);
    vertex(r, r * 2);
    endShape(CLOSE);

    pop();
  }

  getFitness() {
    return this.fitness;
  }

  getDNA() {
    return this.dna;
  }
}