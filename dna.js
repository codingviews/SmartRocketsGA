class DNA {
  constructor(newgenes) {
    if (arguments.length > 0) {
      this.genes = newgenes;
    } else {
      // The Genetic Sequence
      this.genes = [];

      // The maximum strength of the forces
      this.maxforce = 0.1;
      for (let i = 0; i < lifetime; i++) {
        let angle = random(TWO_PI);
        this.genes[i] = p5.Vector.fromAngle(angle);
        this.genes[i].mult(random(0, this.maxforce));
      }
    }
  }

  // Crossover
  // Creates a new DNA sequence from two (this & and a partner)
  crossover(partner) {
    let child = [];
    // pick a midpoint
    let crossover = floor(random(this.genes.length));
    // Take "half" from one and "half" from the other
    for (let i = 0; i < this.genes.length; i++) {
      if (i > crossover) child[i] = this.genes[i];
      else child[i] = partner.genes[i];
    }

    let newgenes = new DNA(child);
    return newgenes;
  }

  // Based on the mutation rate, pick a new random vector
  mutate(mutationRate) {
    for (let i = 0; i , this.genes.length; i++) {
      if (random(i) < mutationRate) {
        let angle = random(TWO_PI);
        this.genes[i] = p5.Vector.fromAngle(angle);
        this.genes[i].mult(random(0, this.maxforce));
      }
    }
  }
}