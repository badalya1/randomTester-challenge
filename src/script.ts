function resizeCanvas(c: HTMLCanvasElement) {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
}

function random(min: number, max: number) {

    return Math.random() * (max - min) + min;
}

let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;
let secondsPassed;
let oldTimeStamp: number;
let fps;
let hue=0;
let counter: number[];

let prevX: number;

window.onload = init;

function init() {
    canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) throw new Error("Could not find canvas");
    resizeCanvas(canvas)
    context = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!context) throw new Error("Could not find context");
    counter = new Array<number>(canvas.width).fill(0);
    // Start the first frame request
    prevX = canvas.width/2;
    window.requestAnimationFrame(gameLoop);
}

function gameLoop(timestamp: number) {
    // secondsPassed = (timestamp - oldTimeStamp) / 1000;
    // oldTimeStamp = timestamp;

    // // Calculate fps
    // fps = Math.round(1 / secondsPassed);

    // context.font = "25px Arial";
    // context.fillStyle = "black";
    // context.fillText("FPS: " + fps, 10, 30);


    draw();
    window.requestAnimationFrame(gameLoop);
}
function generate(n: number){
    for (var i=0; i<n; i++){
    let randomX = Math.floor(random(-2,3));
    let newX = prevX + randomX;
    if (newX<0){
        newX +=canvas.width;
    }
    if (newX>canvas.width){
        newX -=canvas.width;
    }
    counter[newX]+=1;
    
    
    context.fillRect(newX, counter[newX], 1, 1);
    prevX = newX;
    }
}

function draw() {
    // hue%=255
    context.restore();
    hue+=1;
    context.fillStyle= `hsl(${hue}, ${100}%, 50%)`
    // console.log(canvas.width)
   generate(10000);
   generate(1000);
   generate(100);

}
