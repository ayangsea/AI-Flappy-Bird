const population = 1000;
let birds = [];
let savedBirds = [];
let storedBirds = [];
let pipes = [];
let counter = 0;
let cycles = 100;
let slider;
let currentHighestScore = 0;
let highestEverScore = 0;
let highestScoringBird;
let trainingMode = true;

function setup() {
  createCanvas(1000, 600);
  for (let i = 0; i < population; i++) {
    birds[i] = new Bird();
  }
  highestScoringBird = new Bird();
  slider = createSlider(1, 100, 1);
  textSize(16);
  let highestScoringBirdButton = createButton('see only highest scoring bird');
  highestScoringBirdButton.mousePressed(runHighestScoringBird);
  let resumeTrainingButton = createButton('resume training');
  resumeTrainingButton.mousePressed(resumeTraining);
  let loadBirdButton = createButton('load bird');
  loadBirdButton.mousePressed(loadBird);
}

function draw() {
  background(0);
  fill('white')
  text('current highest score: ' + currentHighestScore, 0, height - 25);
  text('highest ever score: ' + highestEverScore, 0, height - 8);
  for (let n = 0; n < slider.value(); n++) {

    if (counter % 100 == 0) {
      pipes.push(new Pipe());
    }

    for (let bird of birds) {
      bird.update();
      bird.think(pipes);
    }

    for (var i = 0; i < pipes.length; i++) {
      pipes[i].update();

      for (let j = 0; j < birds.length; j++) {
        if (pipes[i].hits(birds[j]) || birds[j].y == height) {
          savedBirds.push(birds.splice(j, 1)[0]);
        }
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1)
      }
    }

    counter++;

    if (birds.length == 0 && trainingMode) {
      nextGeneration();
      pipes = [];
      counter = 0;
      currentHighestScore = 0;
      highestScoringBird.score = 0;
    }
  }

  for (let bird of birds) {
    bird.show();
    currentHighestScore = max(currentHighestScore, bird.score);
    if (bird.score > highestEverScore) {
      highestEverScore = bird.score;
      highestScoringBird = bird;
    }
  }
  for (let pipe of pipes) {
    pipe.show();
  }
}

function keyPressed() {
  if (key == ' ') {
    bird.up();
  }
}

function runHighestScoringBird() {
  console.log('button pressed');
  storedBirds = birds.splice();
  birds = [highestScoringBird];
  trainingMode = false;
}

function resumeTraining() {
  birds = storedBirds.splice();
  storedBirds = [];
  trainingMode = true;
}

function loadBird() {
  let brainJSON = loadJSON("bird.json");
  let birdBrain = NeuralNetwork.deserialize(brainJSON)
  storedBirds = birds.splice();
  let loadedBird = new Bird(birdBrain);
  birds = [loadedBird];
}

function keyPressed() {
  if (key == 's') {
    let json = highestScoringBird.brain.serialize();
    //save(json, 'bird.json');
    saveJSON(highestScoringBird.brain, 'bird.json')
    console.log(json);
  }
}