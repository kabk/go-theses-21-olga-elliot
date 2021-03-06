

// The SketchRNN model
let model;
// Start by drawing
let previous_pen = 'down';
// Current location of drawing
let x, y;
// The current "stroke" of the drawing
let strokePath;

// For when SketchRNN is fixed
function preload() {

  model = ml5.sketchRNN('mermaid');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  canvas.id="mermaid-one"
  background(255);
  stroke(15);

  // // Button to reset drawing
  // let button = createButton('clear');
  // button.mousePressed(startDrawing);

  // run sketchRNN
  startDrawing();
}

function modelReady() {
  console.log('model loaded');
  startDrawing();
}

// Reset the drawing
function startDrawing() {
  background(255);
  // Start in the middle
  x = width / 2;
  y = height / 2;
  model.reset();
  // Generate the first stroke path
  model.generate(gotStroke);
}

function draw() {
  // If something new to draw
  if (strokePath) {
    // If the pen is down, draw a line
    if (previous_pen == 'down') {
      stroke(0);
      strokeWeight(3.0);
      line(x, y, x + strokePath.dx, y + strokePath.dy);
    }
    // Move the pen
    x += strokePath.dx;
    y += strokePath.dy;
    // The pen state actually refers to the next stroke
    previous_pen = strokePath.pen;

    // If the drawing is complete
    if (strokePath.pen !== 'end') {
      strokePath = null;
      model.generate(gotStroke);
    }
  }
}

setInterval(() => {
  startDrawing();
}, 20000)


// A new stroke path
function gotStroke(err, s) {
  strokePath = s;
}


window.addEventListener("hashchange", function () {
    window.scrollTo(window.scrollX, window.scrollY - 100);
});

function showIndex() {
  var x = document.getElementById("sub-menu");
  if (x.style.display === "inline-block") {
    x.style.display = "none";
  } else {
    x.style.display = "inline-block";
  }
}

$(window).scroll(function() {
    var height = $(window).scrollTop();
    if (height > 100) {
        $('#back2Top').fadeIn();
    } else {
        $('#back2Top').fadeOut();
    }
});
$(document).ready(function() {
    $("#back2Top").click(function(event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

});
