'use strict';

let game = {
    fieldArray: [],
    newFieldArray: [],
    started: false,
    fieldWight: 12,
    fieldHeight: 12,
    start(snake) {
        this.started = true;
        console.log(snake);

        createFieldArray(this.fieldWight, this.fieldHeight);
        addSnakeOnField(this.fieldArray, snake);
        addFoodOnField();

        showFieldInConsole(this.fieldArray)

        showFieldHTML(this.fieldArray);

        console.log('Game started, good luck!');
    },
    score: 0,
};

function Snake(ObjGame) {
    this.bodyCount = 3;
    this.moveDirection = '';
    this.speed = 1;
    this.headPositionX = Math.ceil(ObjGame.fieldWight / 2);
    this.headPositionY = Math.ceil(ObjGame.fieldHeight / 2);
    this.bodyPositionsArray = [
        {
            x: this.headPositionX,
            y: this.headPositionY,
        },
        {
            x: this.headPositionX - 1,
            y: this.headPositionY,
        },
        {
            x: this.headPositionX - 2,
            y: this.headPositionY,
        },
    ];
}

let snake = new Snake(game);

game.start(snake);

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
    snake.bodyPositionsArray.forEach((item,index,array) => (index==0) ? fieldArray[item.y][item.x]=1: fieldArray[item.y][item.x]=0);
}

function updateSnakeBodyPositions(bodyPositionArray) {


    // add TAIL before HEAD with new position
    bodyPositionArray.unshift({
        x: bodyPositionArray[0].x+1,
        y: bodyPositionArray[0].y ,
    })

    //
    //delete tail
    //
    // delete bodyPositionArray[4-1]
    // bodyPositionArray = bodyPositionArray.slice(bodyPositionArray.length-1, 1);
    // console.log(bodyPositionArray[0]=1);
    console.log(bodyPositionArray);



    //
    // NOT Work!!
    //
    // bodyPositionArray.splice(bodyPositionArray.length-1, 1);



    //
    // Work!! But i need to do this dinamic way, not in 3 elements
    //
    bodyPositionArray.splice(3, 1);



    console.log(bodyPositionArray);
    // bodyPositionArray[bodyPositionArray.length-1]



    //
    // BodyPositionArray.forEach((item,index,array) => {
    //     array[]
    //     if (item)
    //     console.log(item);
    // });
    console.log('yep, we update array');
}

function addFoodOnField() {
    game.fieldArray[4][4] = -1;
}

function removeSnakeFromField(fieldArray, snakeArray) {
    fieldArray.map((itemColumn, indexColumn) => {
        itemColumn.forEach((itemCeil, indexCeil) => {
            if (itemCeil== 0 || itemCeil==1) {
                console.log(`item: ${itemCeil} with index[${indexColumn}${indexCeil}]`);
                fieldArray[indexColumn][indexCeil]= null;
                return null;
            }
        });
        // return itemColumn.forEach((itemCeil, indexCeil) => console.log(`item: ${itemCeil} with index[${indexColumn}${indexCeil}]`))
    });
    console.log(fieldArray.forEach(column => column.map(item => {
        if (item == 1 || item == 0) return 9;
    })));
    // console.log(fieldArray.forEach(column => column.map(item => {
    //     if (item == 1 || item == 0) return 9;
    // })));
}

function move(direcrion) {
    switch (direcrion) {
        case 'right' :
            console.log('right direction selected');
            ///
            //work code
            ///
            removeSnakeFromField(game.fieldArray, snake.bodyPositionsArray);
            console.log("---------");
            console.log(game.fieldArray);
            console.log("---------");



            /////
            /////   work code!
            /////
            updateSnakeBodyPositions(snake.bodyPositionsArray);
            updateSnakeBodyPositions(snake.bodyPositionsArray);
            addSnakeOnField(game.fieldArray, snake);
            // showFieldHTML(game.fieldArray);


            // change head position
            // game.fieldArray[snake.headPositionY][snake.headPositionX] = 0;
            // snake.headPositionX++;
            // game.fieldArray[snake.headPositionY][snake.headPositionX] = 1;
            //
            // // change tail position
            // game.fieldArray[snake.tailPositionY][snake.tailPositionX] = null;
            // snake.tailPositionX++;


            showFieldHTML(game.fieldArray);
            showFieldInConsole(game.fieldArray);

            break;

        case 'top' :
            console.log('top direction selected');

            // change head position
            game.fieldArray[snake.headPositionY][snake.headPositionX] = 0;
            snake.headPositionY--;
            game.fieldArray[snake.headPositionY][snake.headPositionX] = 1;

            // change tail position
            game.fieldArray[snake.tailPositionY][snake.tailPositionX] = null;
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
    fieldEl.innerHTML = '';

    let fieldHTML = createFieldHTML(fieldArray);

    fieldEl.insertAdjacentHTML('afterbegin', fieldHTML);
}

function updateFiledArray() {
}

let clickEl = document.querySelector('.h1');

clickEl.onclick = function test() {
    console.log('work');
}

