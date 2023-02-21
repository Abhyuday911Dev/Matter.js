const canvas = document.querySelector("#canvas");
const addBtn = document.querySelector(".addbtn");
const shootbtn = document.querySelector(".shoot");
const main = document.getElementById("main");
let intervalRunning = false;
let intervalRunning2 = false;
var intervalId2;
// canvas configuration
// module aliases
let Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Composite = Matter.Composite,
  Constraint = Matter.Constraint,
  Events = Matter.Events,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;

shootbtn.addEventListener("click", (params) => {
  if (intervalRunning) {
    clearInterval(intervalId1);
    intervalRunning = false;
  } else {
    intervalId1 = setInterval(shoot, 60);
    intervalRunning = true;
  }
});

intervalId2 = setInterval(createobj, 1000);
intervalRunning2 = true;

document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    clearInterval(intervalId);
    intervalRunning = false;
    clearInterval(intervalId2);
    intervalRunning2 = false;
  } else {
    clearInterval(intervalId2);
    intervalId2 = setInterval(createobj, 1000);
    intervalRunning2 = true;
  }
});

// window.innerWidth - scroller width
let innerh = window.innerHeight;
let innerw = window.innerWidth - 7;

var rockOptions = { density: 0.004 },
  anchor = { x: 170, y: 450 };

// create an engine
let engine = Engine.create();

// create a renderer
let render = Render.create({
  canvas: canvas,
  engine: engine,
  options: {
    background: "transparent",
    wireframes: false,
    width: innerw,
    height: innerh,
  },
});

// create object function
function createobj() {
  let box = Bodies.circle(
    Math.random() * (innerw - innerw / 3) + innerw / 3 - 40,
    0,
    40,
    {
      render: {
        sprite: {
          texture: "../Assets/dark_insta.png",
        },
      },
      restitution: 1,
      density: 0.02,
    }
  );
  Composite.add(engine.world, [box]);
}

// if (intervalRunning2) {
//   clearInterval(intervalId2);
//   intervalRunning2 = false;
// } else {
//   intervalId2 = setInterval(createobj, 1000);
//   intervalRunning2 = true;
// }

const functionName = () => {
  var body = Bodies.circle(280, 100, 3, 30);

  var constraint = Constraint.create({
    pointA: { x: 280, y: 120 },
    bodyB: body,
    pointB: { x: -10, y: -7 },
    stiffness: 0.001,
  });

  Composite.add(engine.world, [constraint]);
};

var rock = Bodies.polygon(innerw / 10, innerh / 2 + 120, 3, 30, {
  density: 0.05,
});

var constraint = Constraint.create({
  pointA: { x: innerw / 10, y: innerh - 200 },
  bodyB: rock,
  pointB: { x: -10, y: -10 },
  length: 0.06,
  damping: 0.01,
  stiffness: 0.05,
});

Composite.add(engine.world, [constraint, rock]);
// ______________________________________slingshot___________________________________________

function shoot() {
  Body.setSpeed(rock, Math.floor((Math.random() + Math.random()) * 25));
  rock = Bodies.polygon(innerw / 12, innerh / 2 + 140, 3, 30, {
    density: 0.02,
    friction: 0,
  });
  Composite.add(engine.world, rock);
  constraint.bodyB = rock;
}

addBtn.addEventListener("click", createobj);

// create two boxes and a ground
let ground = Bodies.rectangle(innerw / 2, innerh - 15, innerw, 30, {
  isStatic: true,
  angle: Math.PI * 0,
  render: { fillStyle: "#222" },
});

// add all of the bodies to the world
Composite.add(engine.world, [ground]);

// run the renderer
Render.run(render);

// create runner
let runner = Runner.create();

// run the engine
Runner.run(runner, engine);

let mouse = Mouse.create(render.canvas);
let mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.01,
    render: {
      visible: false,
    },
  },
});
mouseConstraint.mouse.element.removeEventListener(
  "mousewheel",
  mouseConstraint.mouse.mousewheel
);
mouseConstraint.mouse.element.removeEventListener(
  "DOMMouseScroll",
  mouseConstraint.mouse.mousewheel
);

Composite.add(engine.world, mouseConstraint);



