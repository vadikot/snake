'use strict';

let game = {
    fieldArray: [],
    newFieldArray: [],
    started: false,
    fieldWight: 12,
    fieldHeight: 12,
    start(str) {
        console.log(str);
        createFieldArray(this.fieldWight, this.fieldHeight);
        showFieldHTML(this.fieldArray);

    },
    speed: 1,
};


function Snake(ObjGame) {
    this.body = 2;
    this.moveDirection = '';
    this.headPositionX = ObjGame.fieldWight / 2;
    this.headPositionY = ObjGame.fieldHeight / 2;
    this.tailPositionX = this.headPositionX - this.body;
    this.tailPositionY = this.headPositionY
        // headPositionX: game.fieldWight / 2,
}
let snake = new Snake(game);

// let snake = {
//     body: 2,
//     moveDirection: 'right',
//     headPositionX: game.fieldWight / 2,
//     headPositionY: game.fieldHeight / 2,
//     tailPositionX: this.headPositionX,
//     tailPositionY: this.headPositionY-this.body,
// };

game.start('hi, my name is vadim');


function createFieldArray(width, height) {
    let snakeBody = snake.body;

    console.log('snake:');
    console.log(snake);

    for (let i = 0; i < width; i++) {
        let newColumn = [];

        for (let j = 0; j < height; j++) {

            if (i == snake.headPositionX && j == snake.headPositionY - snakeBody && snakeBody > 0) {
                newColumn.push(0);
                snakeBody--;
            } else if (snake.headPositionX == i && snake.headPositionY == j) {
                newColumn.push(1);
            } else {
                newColumn.push(null);
            }
        }
        game.fieldArray.push(newColumn);
    }

    // food
    game.fieldArray[4][4] = -1;

}


function move(direcrion) {
    switch (direcrion) {
        case 'right' :
            console.log('right direction selected');

            // change head position
            game.fieldArray[snake.headPositionY][snake.headPositionX]=0;
            snake.headPositionX++;
            game.fieldArray[snake.headPositionY][snake.headPositionX]=1;

            // change tail position
            game.fieldArray[snake.tailPositionY][snake.tailPositionX]=null;
            snake.tailPositionX++;


            showFieldHTML(game.fieldArray);
            showFieldInConsole(game.fieldArray);

            break;

        case 'top' :
            console.log('top direction selected');

            // change head position
            game.fieldArray[snake.headPositionY][snake.headPositionX]=0;
            snake.headPositionY--;
            game.fieldArray[snake.headPositionY][snake.headPositionX]=1;

            // change tail position
            game.fieldArray[snake.tailPositionY][snake.tailPositionX]=null;
            snake.tailPositionY--;


            showFieldHTML(game.fieldArray);
            showFieldInConsole(game.fieldArray);

            break;

    }
}

function showFieldInConsole(fieldArray) {
    let fieldString = '';

    for (let i = 0; i < fieldArray.length; i++) {
        for (let j = 0; j < fieldArray.length; j++) {
            if (fieldArray[i][j] !== null) {
                fieldString += `\u00A0${fieldArray[i][j]}\u00A0\u00A0|`;
            } else {
                // fieldString += `\u00A0\u00A0\u00A0\u00A0|`;
                fieldString += `${fieldArray[i][j]}|`;
            }
        }
        fieldString += "\r\n";
    }
    console.log(fieldString);
}

function copyArray(from, to) {
    from.forEach((item, index) => to[index] = item.slice());
}


// setTimeout(() => {
//     console.log('Foo bar')
// }, 1000)
//
// let n =0;
//
// let updateFunc = setInterval(update, 1000);


function update() {
    game.fieldArray[n][n] = -1;
    showFieldHTML(game.fieldArray);
    n++;
    console.log(n);
    if (n == 3) {
        clearTimeout(updateFunc);
    }
}


function createFieldHTML(fieldArray) {
    let fieldHtml = '';

    for (let column of fieldArray) {
        let columnDiv = `<div class='column'>`;
        for (let ceil of column) {

            switch (ceil) {
                case -1:
                    columnDiv += `<div class="ceil food"></div>`;
                    break;
                case 0:
                    columnDiv += `<div class="ceil body"></div>`;
                    break;
                case 1:
                    columnDiv += `<div class="ceil head"></div>`;
                    break;
                case null:
                    columnDiv += `<div class="ceil"></div>`;
                    break;
            }

        }
        columnDiv += `</div>`;
        fieldHtml += columnDiv;
    }
    // for (let i = 0; i < width; i++) {
    //     for (let j = 0; j < height; j++) {
    //         fieldHtml = `<div class="ceil"></div>`;
    //     }
    // }

    return fieldHtml;
}

function showFieldHTML(fieldArray) {
    let fieldEl = document.querySelector('.field');
    fieldEl.innerHTML='';

    let fieldHTML = createFieldHTML(fieldArray);

    fieldEl.insertAdjacentHTML('afterbegin', fieldHTML);
}

function updateFiledArray() {
}

let clickEl = document.querySelector('.h1');

clickEl.onclick = function test() {
    console.log('work');
}

