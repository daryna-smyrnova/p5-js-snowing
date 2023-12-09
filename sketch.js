let bgImage; // Variable to store the background image

// let textOptions = [
//   { text: "*", size: random(3,36) },
//   { text: "*", size: random(3,36) },
//   { text: "*", size: random(3,36) },
//   { text: "*", size: random(3,36) },
//   { text: "*", size: random(3,36) },
//   { text: "*", size: random(3,36) },
//   { text: "TTI", size: 12 },
//   { text: "myVeeva", size: 12 },
//   { text: "DisQover", size: 12 },
//   { text: "MaVric", size: 12 },
//   { text: "*", size: random(3,36) }
// ]; // Array of text options with sizes

let snowflakes = []; // array to hold snowflake objects

function preload() {
  // Load the image and store it in bgImage
  bgImage = loadImage('xmas.png'); // Replace with your image path
}


function setup() {
  createCanvas(900, 500);
  //fill(240);
  noStroke();
  // Draw the image, resizing it to fit the canvas
  image(bgImage, 0, 0, width, height);

}

function draw() {
  //background(color(0,0,139, 120));
  //background('darkblue')
   image(bgImage, 0, 0, width, height);
  let t = frameCount / 50; // update time
  
  // create a random number of snowflakes each frame
  for (var i = 0; i < random(0,1); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }
    // Draw the transparent gradient on top
  //drawGradient(width / 2, height / 2, width, height);
}

// snowflake class
function snowflake() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
// Choose mostly '*' and occasionally 'Merry Xmas'
  if (random(1) < 0.99) { // 95% probability of '*'
    this.text = '*';
    this.size = random(3, 36); // Random size between 18 and 32
    this.color = color("white")
  } else { // 5% probability of 'Merry Xmas'
    this.text = 'Merry Holidays';
    this.size = 18; // Fixed size for 'Merry Xmas'
    this.color = color("rgb(26,26,225)")
  }

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width/2 , 2)));

  this.update = function(time) {
    // x position follows a circle
    let w = 0.1; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.01);
    this.transparency = random(100,255)
    

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    textSize(this.size)
 //fill(255,255,255,200)
    fill(this.color)
    text(this.text,this.posX, this.posY);
  };
}
function drawGradient(x, y, w, h) {
  noFill();

  // Gradient from transparent to a color (e.g., black)
  for (let i = y - h / 2; i <= y + h / 2; i++) {
    let inter = map(i, y - h / 2, y + h / 2, 0, 1);
    let c = lerpColor(color(255,255,255, 0), color(255,255,255, 255), inter);
    stroke(c);
    line(x - w / 2, i, x + w / 2, i);
  }
}