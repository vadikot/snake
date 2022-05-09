'use strict';

function Snake(fieldWidth, fieldHeight) {
    this.bodyCount = 3;
    this.color = 'none';
    this.moveDirection = '';
    this.speed = 1;
    this.headPositionX = Math.ceil(fieldWidth / 2);
    this.headPositionY = Math.ceil(fieldHeight / 2);
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