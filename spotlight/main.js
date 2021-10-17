title = "spotlight";

description = `
Track them!
[Hold] 2x score
`;

const G = {
  WIDTH: 100,
  HEIGHT: 150,

  DUDE_START_SPEED: 0.25,
  DUDE_MOVE_DURATION: 120,

  SPEED_CHANGE: 300
}
characters = [
`
 rrr 
 r r
 rrr
  r
  r
 r r
`
];

/** @typedef {{ pos: Vector }} Spotlight */
/** @type { Spotlight} */
let spotlight;

/** @typedef {{ pos: Vector, moveDuration: number, moveSpeed: number }} Dude */
/** @type { Dude } */
let dude;

let dir;

let countdown;

let timer = 300;

let multiplier;

options = {
  theme:"shapeDark",
  isPlayingBgm: true,
  isReplayEnabled: true,
  seed: 20,
  isCapturing: true
};

function update() {
  if (!ticks) {
    spotlight = {
      pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5)
    };
    dude = {
      pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5),
      moveDuration: 0,
      moveSpeed: G.DUDE_START_SPEED
    };
    timer = 300;
    countdown = G.SPEED_CHANGE;
  }

  if(timer <= 0)
  {
      end();
  }

  if(timer >= 600)
  {
    timer = 600;
  }

  dude.pos.x += dude.moveSpeed;

  dude.moveDuration--;
  if(dude.moveDuration <= 0)
  {
    dir = rnd(0,2);
    if(dir = 0) {
      
    }
    if(dir = 1) {
      dude.moveSpeed *= -1;
    }
      //nothing
    dude.moveDuration = 120 + rnd(-90, 90);
  }

  if(dude.pos.x >= G.WIDTH || dude.pos.x <= 0) {
    dude.moveSpeed*=-1;
  }
  countdown--;
  if(countdown <= 0) {
    dude.moveSpeed*=1.1;
    countdown = G.SPEED_CHANGE;
    console.log("a");
  }

  dude.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);

  if(input.isPressed)
  {
    color("light_black");
    box(spotlight.pos, 8);
    multiplier=2;
  }
  else
  {
    color("light_black");
    box(spotlight.pos, 15);
    multiplier=1;
  }
  
  if(char("a", dude.pos).isColliding.rect.light_black)
  {
    score+=1*multiplier;
    particle(
      dude.pos.x,
      dude.pos.y,
      2,
      1,
      0,
      5
    );
    timer += 1.25;
  }

  color("black");
  char("a", dude.pos.x, dude.pos.y);
  
  timer-=1;
  color("cyan")
  rect(0,7,timer/6,2);

  console.log(timer);
  spotlight.pos = vec(input.pos.x, input.pos.y);
}
