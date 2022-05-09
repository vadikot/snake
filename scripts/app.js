'use strict';


let bodyEl = document.querySelector('#body');

bodyEl.addEventListener('keydown', arrowsControlHundler);
modal.createNew('Glad to see you', 'Are you ready to start the game?', 'Game developed by Vadi_kot', 'start').show();

let snake = new Snake(game.fieldWidth, game.fieldHeight);

// console.log(snake);


function arrowsControlHundler(event) {

    if (game.state == 'started') {

        switch (event.key) {
            case 'ArrowUp' :

                if (game.previosMoveDirection != 'bottom') {
                    game.previosMoveDirection = 'top';
                    updateField('top');
                }

                break;

            case 'ArrowRight' :

                if (game.previosMoveDirection != 'left') {
                    game.previosMoveDirection = 'right';
                    updateField('right');
                }

                break;

            case 'ArrowDown' :

                if (game.previosMoveDirection != 'top') {
                    game.previosMoveDirection = 'bottom';
                    updateField('bottom');
                }

                break;

            case 'ArrowLeft' :

                if (game.previosMoveDirection != 'right') {
                    game.previosMoveDirection = 'left';
                    updateField('left');
                }

                break;

        }
    } else {
        if (game.state == 'game over' && event.key == 'Enter') {
            game.restart();
        }
        if (game.state == 'not started' && event.key == 'Enter') {
            game.start(snake);
        }

    }
}
