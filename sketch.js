let circleRadius = 75; //define radius
let initialDotNumber = 60; //define Dotnumber for ellipse
let dotNumberDecrement = 7; //to make less ellipses in smaller wheel
let baseSpacing = 160; //give the gap among wheels
let drawLinesArray = []; //for lines in the wheel
let drawArcsArray = []; // for the pink arcs
let cols, rows, spacing; // to caculate the postion of the wheels
let song, analyzer; //define sound of the song, add the sound analyzer
let amplitude; //for the sound analyzer
let pan = 0.0; //for the sound conrtol

function preload() {
  song = loadSound('assets/current.mp3'); // 确保替换为你实际的音乐文件路径
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  analyzer = new p5.Amplitude();
  analyzer.setInput(song);
  song.play();
  
 // to make sure there're enough wheels to fill the canvas  
  spacing = 160;
  rows = ceil(height / spacing) + 3;
  cols = ceil(width / spacing) + 3;
  
 // prepare the random value to make sure pink arcs and wheels with lines will be drawn in canvas
  for (let i = -2; i < rows; i++) {
    for (let j = -2; j < cols; j++) {
      drawLinesArray.push(random(1) > 0.5);
      drawArcsArray.push(random(1) > 0.8);
    }
  }
  
  // draw the fixed graphs
  drawWheelsPattern();
}

function draw() {
  // draw the dynamic wheel which follow the music
  push();  
  scale(1.8);
  translate(width / 2, height / 2); 
  rotate(PI / 3);  
  translate(-width / 2, -height / 2);  

  let index = 0;
  for (let i = -2; i < rows; i++) {
    for (let j = -2; j < cols; j++) {
      let x = j * spacing + spacing / 2;
      let y = i * spacing + spacing / 2;
      drawDynamicCircles(x, y, circleRadius);
      index++;
    }
  }
}

// Function of the basic fixed wheels
function drawWheelsPattern() {
  background(195, 99, 40);
  scale(1.8);

  push();  
  translate(width / 2, height / 2); 
  rotate(PI / 3);  
  translate(-width / 2, -height / 2);  

  let index = 0;
  for (let i = -2; i < rows; i++) {
    for (let j = -2; j < cols; j++) {
      let x = j * spacing + spacing / 2;
      let y = i * spacing + spacing / 2;
      drawWheels(x, y, circleRadius, drawLinesArray[index], drawArcsArray[index]);
      index++;
    }
  }
  pop();  
}

//Function defines all the elements of the big wheels 
//Contains 4 elements which can create 2 different types of wheels
function drawWheels(x, y, radius, drawLines, drawArcs) {
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
    strokeWeight(2);
    noFill(); 

    beginShape(); // Begin defining a shape
    for (let k = 0; k < numLines; k++) {
      let angle = TWO_PI / numLines * k;
      let startX = x + cos(angle) * radius * 0.71;
      let startY = y + sin(angle) * radius * 0.71;
      let endX = x + cos(angle) * radius * 0.92;
      let endY = y + sin(angle) * radius * 0.92;
      vertex(startX, startY); 
      vertex(endX, endY); 
    }
    endShape(CLOSE); // End shape definition and close shape

    let dotColor = color(random(360), 50, 60);

    for (let i = 0; i < 3; i++) {
      let dotRingRadius = radius * (1 - i * 0.11);
      let numDots = dotNumber[i];
      for (let j = 0; j < numDots; j++) {
        let angle = j * TWO_PI / numDots;
        let dotX = x + cos(angle) * dotRingRadius * 0.63;
        let dotY = y + sin(angle) * dotRingRadius * 0.63;
        fill(dotColor);
        noStroke();
        ellipse(dotX, dotY, 4);
      }
    }
  } 
  //Second kind: only contain dots
  else {
    let dotColor = color(random(360), 50, 60);
    for (let i = 0; i < numDotRings; i++) {
      let dotRingRadius = radius * (1 - i * 0.1);
      let numDots = dotNumber[i];
      for (let j = 0; j < numDots; j++) {
        let angle = j * TWO_PI / numDots;
        let dotX = x + cos(angle) * dotRingRadius * 0.93;
        let dotY = y + sin(angle) * dotRingRadius * 0.93;
        fill(dotColor);
        noStroke();
        ellipse(dotX, dotY, 7, 5);
      }
    }
  }

 // Draw a Center circle to make sure the wheel has center circle before the music starts
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

function drawDynamicCircles(x, y, radius) {
  // get the volum level of the music
  let volume = analyzer.getLevel();
  let sizeFactor = map(volume, 0, 1, 0, 3); 
  let numInnerCircles = 5;

  // draw the dynamic ellipse following the music
  for (let i = 0; i < numInnerCircles; i++) {
    let innerRadius = radius * 0.5 * (1 - i * 0.2) * sizeFactor;
    fill(color(random(330), 50, random(30, 90)));
    stroke(color(random(330), 50, random(30, 90)));
    strokeWeight(1);
    ellipse(x, y, innerRadius * 1.8);
  }
}

//Window Resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  drawWheelsPattern();
}

//Control wheather play music
function mousePressed() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

//Function that conrtoling the music
//The Volume goes up and down with the Y-axel of the mouse
//The stereo with change with the X-axel if the mouse
function mouseMoved() {
  volume = map(mouseY, 0, height, 1, 0);
  song.setVolume(volume);
  pan = map(mouseX, 0, width, -1, 1);
  song.pan(pan);
}   