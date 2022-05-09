'use strict';

let game = {
    fieldArray: [],
    freeCellsArray: [],
    previosMoveDirection: '',
    state: 'not started',
    fieldWidth: 12,
    fieldHeight: 12,
    start(snake) {
        if (this.state == "not started") {
            // modal.
        }

        this.score = 0;
        this.state = 'started';
        this.previosMoveDirection = 'right';
        // modal.style.display = "none";
        // console.log(snake);

        createFieldArray(this.fieldWidth, this.fieldHeight);
        addSnakeOnField(this.fieldArray, snake);

        this.createFreeCellsArray();

        // могут два фрукта выпасть в одну ячейку, тк после добавления фрукта не обновляем массив пустых ячеек
        // иногда еда может выпасть в теле змеи!
        addFoodOnField(this.freeCellsArray, 'apple');
        addFoodOnField(this.freeCellsArray, 'banana');
        addFoodOnField(this.freeCellsArray, 'kiwi');

        // showFieldInConsole(this.fieldArray)

        let kiwiii = new Kiwi();

        this.fieldArray[3][3] = kiwiii;

        showFieldHTML(this.fieldArray);

        modal.close();
        console.log('Game started, good luck!');

    },
    createFreeCellsArray() {

        // При обновлдении массива сразу записывать пустые ячейки

        this.fieldArray.forEach(
            (column, indexY) => column.forEach(
                (cell, indexX) => {
                    if (cell == null) {
                        this.freeCellsArray.push(`${indexX},${indexY}`);
                    }
                }
            ));

    },
    restart() {

        snake.color = 'none';
        this.score = 0;
        this.state = 'started';

        snake.bodyPositionsArray = [
            {
                //  this doesn't working here, only snake
                x: snake.headPositionX,
                y: snake.headPositionY,
            },
            {
                x: snake.headPositionX - 1,
                y: snake.headPositionY,
            },
            {
                x: snake.headPositionX - 2,
                y: snake.headPositionY,
            },
        ];

        console.log(snake);
        // need to clear the field from the snake and food and than add new ones
        removeSnakeFromField(game.fieldArray, snake.bodyPositionsArray);
        addSnakeOnField(game.fieldArray, snake);

        showFieldHTML(game.fieldArray);
        // showFieldInConsole(game.fieldArray);

        modal.close();
        console.log('Game RESTARTED, good luck!');
    },
    over() {
        modal.createNew('Game Over', `The game was incredible, yor score: ${this.score}`, 'Do you want to try again?', 'end').show();
    },
    score: 0,
};

function changeScoreInHTML(score) {
    let scoreEl = document.querySelector('.score b');

    scoreEl.innerText = score;
}

function createFieldArray(width, height) {

    for (let i = 0; i < height; i++) {
        let newColumn = [];

        for (let j = 0; j < width; j++) {
            newColumn.push(null);
        }

        game.fieldArray.push(newColumn);
    }
}

function addSnakeOnField(fieldArray, snake) {
    snake.bodyPositionsArray.forEach((item, index, array) => (index == 0) ? fieldArray[item.y][item.x] = 1 : fieldArray[item.y][item.x] = 0);
}

function updateField(direction) {
    updateSnakeBodyPositions(snake.bodyPositionsArray, direction);

    //
    // IMPORTANT!!!!
    //
    //если сначала удалить змею с поля, а потом обновитьь ее, то при попадании в себя игра не закончится
    //
    removeSnakeFromField(game.fieldArray, snake.bodyPositionsArray);

    addSnakeOnField(game.fieldArray, snake);

    showFieldHTML(game.fieldArray);
    showFieldInConsole(game.fieldArray);
}

function updateSnakeBodyPositions(bodyPositionArray, direction) {
    let snaskeBodyArrayLength = bodyPositionArray.length;
    let newXPosition;
    let newYPosition;

    switch (direction) {
        case 'top' :
            newYPosition = bodyPositionArray[0].y - 1;

            if (newYPosition == -1) {
                game.state = 'game over';
                game.over();
            } else {
                // add TAIL before HEAD with new position
                bodyPositionArray.unshift({
                    x: bodyPositionArray[0].x,
                    y: bodyPositionArray[0].y - 1,
                });
                // delete tail
                bodyPositionArray.splice(snaskeBodyArrayLength, 1);
            }

            break;

        case 'right' :
            newXPosition = bodyPositionArray[0].x + 1;

            if (newXPosition == game.fieldWidth) {
                game.state = 'game over';

                game.over();
            } else {

                //
                // Работает, но криво !!!
                // Перебор идет сначала строка, потом по ячейкам, поэтому первый индекс вписываем Y, а второй X
                // game.fieldArray[bodyPositionArray[0].y][newXPosition]
                //
                let nextCell = game.fieldArray[bodyPositionArray[0].y][newXPosition];

                if (nextCell === null) {
                    // Просто ставим хвост перед головой
                    // add TAIL before HEAD with new position
                    bodyPositionArray.unshift({
                        x: bodyPositionArray[0].x + 1,
                        y: bodyPositionArray[0].y,
                    });
                    // delete tail
                    bodyPositionArray.splice(snaskeBodyArrayLength, 1);
                } else if (nextCell === 1 || nextCell === 0) {
                    console.log('game over');
                    console.log(nextCell);
                    game.state = 'game over';

                    game.over();
                } else {
                    let lastEatenFruitName = nextCell.constructor.name.toLowerCase();

                    game.score += nextCell.foodValue;
                    changeScoreInHTML(game.score);

                    // console.log(nextCell.foodValue);
                    bodyPositionArray.unshift({
                        x: bodyPositionArray[0].x + 1,
                        y: bodyPositionArray[0].y,
                    });

                    let foodIsKiwi = nextCell instanceof Kiwi;

                    if (foodIsKiwi) {
                        nextCell.changeColor(snake);
                    }

                    addFoodOnField(game.freeCellsArray, lastEatenFruitName);

                    // delete tail
                    // bodyPositionArray.splice(snaskeBodyArrayLength, 1);
                }


            }

            break;

        case 'bottom' :
            newYPosition = bodyPositionArray[0].y + 1;

            if (newYPosition == game.fieldHeight) {
                game.state = 'game over';
                game.over();
            } else {
                // add TAIL before HEAD with new position
                bodyPositionArray.unshift({
                    x: bodyPositionArray[0].x,
                    y: bodyPositionArray[0].y + 1,
                });
                // delete tail
                bodyPositionArray.splice(snaskeBodyArrayLength, 1);
            }

            break;

        case 'left' :
            newXPosition = bodyPositionArray[0].x - 1;


            if (newXPosition == -1) {
                game.state = 'game over';
                game.over();
            } else {
                // add TAIL before HEAD with new position
                bodyPositionArray.unshift({
                    x: bodyPositionArray[0].x - 1,
                    y: bodyPositionArray[0].y,
                });
                // delete tail
                bodyPositionArray.splice(snaskeBodyArrayLength, 1);

            }

            break;
    }


    //console.log(bodyPositionArray);
}

function addFoodOnField(freeCellsArray, typeOfFood) {
    let cellIndicesArray = getRandomFreeCell(freeCellsArray);
    let indexX = cellIndicesArray[0];
    let indexY = cellIndicesArray[1];

    switch (typeOfFood) {
        case 'apple':
            game.fieldArray[indexX][indexY] = new Apple();
            break;
        case 'banana':
            game.fieldArray[indexX][indexY] = new Banana();
            break;
        case 'kiwi':
            game.fieldArray[indexX][indexY] = new Kiwi();
            break;

    }
}

function getRandomFreeCell(freeCellsArray) {
    let randomIndex = getRandomNumberBetween(0, freeCellsArray.length - 1);


    return freeCellsArray[randomIndex].split(',');
}

function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function removeSnakeFromField(fieldArray, snakeArray) {
    fieldArray.map((itemColumn, indexColumn) => {
        itemColumn.forEach((itemCeil, indexCeil) => {
            if (itemCeil == 0 || itemCeil == 1) {
                // console.log(`item: ${itemCeil} with index[${indexColumn}${indexCeil}]`);
                fieldArray[indexColumn][indexCeil] = null;
                return null;
            }
        });
        // return itemColumn.forEach((itemCeil, indexCeil) => console.log(`item: ${itemCeil} with index[${indexColumn}${indexCeil}]`))
    });
    // console.log(fieldArray.forEach(column => column.map(item => {
    //     if (item == 1 || item == 0) return 9;
    // })));
    // console.log(fieldArray.forEach(column => column.map(item => {
    //     if (item == 1 || item == 0) return 9;
    // })));
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


function createFieldHTML(fieldArray) {
    let fieldHtml = '';

    for (let column of fieldArray) {
        let columnDiv = `<div class='column'>`;
        for (let ceil of column) {

            let snakeColor = (snake.color == 'pink') ? 'pink' : '';

            if (ceil !== null && typeof ceil == 'object') {

                // columnDiv += `<div class="ceil food">1</div>`;
                // let isFood = apple instanceof Food;
                let isApple = ceil instanceof Apple;
                let isBanana = ceil instanceof Banana;
                let isKiwi = ceil instanceof Kiwi;


                if (isApple) {
                    columnDiv += `<div class="ceil food apple"></div>`;
                }
                if (isBanana) {
                    columnDiv += `<div class="ceil food banana"></div>`;
                }
                if (isKiwi) {
                    columnDiv += `<div class="ceil food kiwi"></div>`;
                }


            }
            switch (ceil) {
                case 0:
                    columnDiv += `<div class="ceil body ${snakeColor}"></div>`;
                    break;
                case 1:
                    columnDiv += `<div class="ceil head ${snakeColor}"></div>`;
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

    console.log(game.fieldArray);

    return fieldHtml;
}

function showFieldHTML(fieldArray) {
    let fieldEl = document.querySelector('.field');
    fieldEl.innerHTML = '';

    let fieldHTML = createFieldHTML(fieldArray);

    fieldEl.insertAdjacentHTML('afterbegin', fieldHTML);
}

function updateFiledArray() {
}
