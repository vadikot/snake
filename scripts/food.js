'use strict';

class Food {
    foodValue = 1;

    // constructor(positionArray) {
    //     this.positionX = positionArray[0];
    //     this.positionY = positionArray[1];
    // }

}

class Apple extends Food {
    name = 'apple';
}

class Banana extends Food {
    foodValue = 2;
    name = 'banana';
}

class Kiwi extends Food {
    name = 'kiwi';

    changeColor(snake) {
        let bodyElements = document.querySelectorAll('.ceil.body');
        let headElement = document.querySelector('.ceil.head');

        console.log(1);
        console.log(snake);

        snake.color = 'pink';
        // bodyElements.forEach(element => element.classList.add('pink'));
        // headElement.classList.add('pink');
    }
}

//
// let kiwi2 = new Kiwi();
// kiwi2.changeColor();
// console.log(kiwi2);


// let vadimCode = 5;
//
// vadimCode= 'vaddim';
//
// console.log(vadimCode);

// let apple =  new Apple();
// console.log(apple);
//
// let apple = new Apple();
// let banana = new Banana();
//
// console.log(apple);
// console.log(banana);


