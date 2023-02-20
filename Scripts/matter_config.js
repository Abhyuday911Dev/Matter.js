const canvas = document.querySelector("#canvas");
const addBtn = document.querySelector(".addbtn");
const main = document.getElementById("main");

// window.innerWidth - scroller width
let innerh = window.innerHeight;
let innerw = window.innerWidth - 7;

// canvas configuration

// module aliases
let Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;

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
  // let box = Bodies.rectangle(innerw / 2 - Math.random() * 80, 0, 80, 80);
  let box = Bodies.circle(innerw / 2 - Math.random() * 80, 0, 40, {
    render: {
      sprite: {
        texture: "../Assets/dark_insta.png",
      }
    },
    restitution: 1
  });
  Composite.add(engine.world, [box]);
}

createobj();
createobj();

addBtn.addEventListener("click", createobj);

// create two boxes and a ground
let ground = Bodies.rectangle(innerw / 2, innerh - 20, innerw, 40, {
  isStatic: true,
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
