let inputdir = {
    x: 0,
    y: 0
};
let scorevalue = document.getElementById("scorebox");
let foodsound = new Audio('food.mp3');
let gameoversound = new Audio('gameover.mp3');
let movesound = new Audio('move.mp3');
let musicsound = new Audio('music.mp3');
let speed = 5
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
let food = { x: 6, y: 8 };
let score = 0;
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < (1 / speed)) {
        return;
    }
    lastPaintTime = ctime;
    gameengine();

}
function isCollide(snake) {
    //if you bump into yourself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0) {
        return true;
    }
    if (snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}
function gameengine() {
    //updating snake array and food
    if (isCollide(snakeArr)) {
        gameoversound.play();
        inputdir = { x: 0, y: 0 };
        alert("Game over press amy key to play again!")   
        snakeArr = [
            { x: 13, y: 15 }
        ]
        musicsound.play();
        score = 0;
    }

    //if food is eaten increment the score and regenrate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodsound.play()
        score += 1
        scorevalue.innerHTML = "Score:" + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputdir.x, y: snakeArr[0].y + inputdir.y })
        food = { x: Math.round(2 + (16 - 2) * Math.random()), y: Math.round(2 + (16 - 2) * Math.random()) }

    }
    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {

        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputdir.x;
    snakeArr[0].y += inputdir.y;
    //display snake
    board.innerHTML = '';
    snakeArr.forEach((e, index) => {
        snakeelement = document.createElement("div");
        snakeelement.style.gridRowStart = e.y;
        snakeelement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeelement.classList.add('head');
        }
        else { snakeelement.classList.add('snake'); }

        board.appendChild(snakeelement);
    })
    //display food
    foodelement = document.createElement("div");
    foodelement.style.gridRowStart = food.y;
    foodelement.style.gridColumnStart = food.x;
    foodelement.classList.add('food')
    board.appendChild(foodelement);
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputdir = { x: 0, y: 1 };
    musicsound.play()
    movesound.play()
    switch (e.key) {
        case 'ArrowUp':
            console.log('ArrowUp');
            inputdir.x = 0;
            inputdir.y = -1;
            break;
        case 'ArrowDown':
            console.log('ArrowDown')
            inputdir.x = 0;
            inputdir.y = 1;
            break;
        case 'ArrowLeft':
            console.log('ArrowLeft')
            inputdir.x = -1;
            inputdir.y = 0;
            break;
        case 'ArrowRight':
            console.log('ArrowRight')
            inputdir.x = 1;
            inputdir.y = 0;
            break;
        default:
            break;


    }

})

