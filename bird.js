class Bird {

    constructor(brain) {
        this.y = height / 2;
        this.x = width / 5;

        this.gravity = 0.6;
        this.velocity = 0;
        this.lift = -12;

        this.score = 0;
        this.fitness = 0;

        if (brain) {
            this.brain = brain.copy()
        } else {
            this.brain = new NeuralNetwork(4, 4, 2);
        }
    }

    mutate() {
        this.brain.mutate(0.1);
    }

    think(pipes) {
        
        let closest = null;
        let closestD = Infinity;
        for (let i = 0; i < pipes.length; i++) {
            let d = pipes[i].x - this.x;
            if (d < closestD && d > 0) {
                closest = pipes[i];
                closestD = d;
            }
        }

        let inputs = [];
        inputs[0] = this.y / height;
        inputs[1] = closest.top / height;
        inputs[2] = closest.bottom / height;
        inputs[3] = closest.x / width;

        let output = this.brain.predict(inputs)

        if (output[0] > output[1]) {
            this.up();
        }
    }

    show() {
        stroke(255)
        fill(255, 50);
        ellipse(this.x, this.y, 25, 25);
    }

    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.y > height) {
            this.y = height;
            this.velocity = 0;
        } 
        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
        this.score++;
    }

    up() {
        this.velocity = -10;
    }
}