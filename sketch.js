let circleRadius = 75;
let initialDotNumber = 60;
let dotNumberDecrement = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  noLoop();
}

function draw() {
  background(195, 99, 40);
  scale(1.8); 
  translate(width / 2, height / 2);
  rotate(PI / 12);
  translate(-width / 2 - 80, -height / 2 - 80);

  let spacing = 160;
  let rows = height / spacing;
  let cols = width / spacing;
  for (let i = 0; i <= rows; i++) {
    for (let j = 0; j <= cols; j++) {
      let x = j * spacing + spacing / 2;
      let y = i * spacing + spacing / 2;
      drawWheels(x, y, circleRadius);
    }
  }
}

function drawWheels(x, y, radius) {
  // Draw line or dots
  let drawLines = random(1) > 0.5;
  // Whether to draw arc
  let drawArcs = random(1) > 0.8;
  let numDotRings = 5;
  let dotNumber = [];

  // The number of dots per ring
  for (let i = 0; i < numDotRings; i++) {
    let currentDotNumber = initialDotNumber - i * dotNumberDecrement;
    dotNumber.push(currentDotNumber);
  }

  // Outermost ring
  let ringRadius = radius;
  let col = color(50, random(0, 30), 95);
  fill(col);
  noStroke();
  ellipse(x, y, ringRadius * 2);

  // Using if-else to draw two different kinds of wheels
  if (drawLines) {
    let numLines = 70;
    stroke(random(360), 50, 60);
    strokeWeight(1.5);
    noFill(); 

    beginShape(); 
    for (let k = 0; k < numLines; k++) {
      let angle = TWO_PI / numLines * k;
      let startX = x + cos(angle) * radius * 0.7;
      let startY = y + sin(angle) * radius * 0.7;
      let endX = x + cos(angle) * radius * 0.94;
      let endY = y + sin(angle) * radius * 0.94;
      vertex(startX, startY); 
      vertex(endX, endY); 
    }
    endShape(CLOSE); 

    let dotColor = color(random(360), 50, 60);

    for (let i = 0; i < 3; i++) {
      let dotRingRadius = radius * (1 - i * 0.12);
      let numDots = dotNumber[i];
      for (let j = 0; j < numDots; j++) {
        let angle = j * TWO_PI / numDots;
        let dotX = x + cos(angle) * dotRingRadius * 0.63;
        let dotY = y + sin(angle) * dotRingRadius * 0.63;
        fill(dotColor);
        noStroke();
        ellipse(dotX, dotY, 5);
      }
    }
  } else {
    let dotColor = color(random(360), 50, 60);

    for (let i = 0; i < numDotRings; i++) {
      let dotRingRadius = radius * (1 - i * 0.1);
      let numDots = dotNumber[i];
      for (let j = 0; j < numDots; j++) {
        let angle = j * TWO_PI / numDots;
        let dotX = x + cos(angle) * dotRingRadius * 0.95;
        let dotY = y + sin(angle) * dotRingRadius * 0.95;
        fill(dotColor);
        noStroke();
        ellipse(dotX, dotY, 6);
      }
    }
  }

  // Center circle 
  let numInnerCircles = 5;
  for (let i = 0; i < numInnerCircles; i++) {
    let innerRadius = radius * 0.5 * (1 - i * 0.2);
    fill(color(random(330), 50, random(30, 90)));
    stroke(color(random(330), 50, random(30, 90)));
    strokeWeight(1)
    ellipse(x, y, innerRadius * 1.8);
  }

  // Pink arcs
  if (drawArcs) {
    stroke(348, 63, 90);
    strokeWeight(4);
    noFill();
    let arcRadius = radius * 2;
    let startAngle = PI / 2;
    let endAngle = PI;
    arc(x, y - radius, arcRadius, arcRadius, startAngle, endAngle);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}