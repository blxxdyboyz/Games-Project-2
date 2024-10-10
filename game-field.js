import { Food } from "./food.js";
import { GameElement } from "./game-element.js";
import { Snake } from "./snake.js";

export class GameField extends GameElement {
    #score;
    #snake;
    #food;

    constructor(renderingContext) {
        super(renderingContext);
        this.#score = 0;
        this.#snake = new Snake(renderingContext);
        this.#food = new Food(renderingContext, { fillStyle: 'lightgray', strokeStyle: 'gray' });
    }

    render() {
        this.context.fillStyle = 'green';
        this.context.fillRect(0, 0, this.gameWidth, this.gameHeight);

        this.context.strokeStyle = 'brown';
        this.context.lineWidth = 5;
        this.context.strokeRect(0, 0, this.gameWidth, this.gameHeight);

        this.#snake.render();
        this.#food.render();
    }

    start() {
        this.#snake.create();
        this.#score = 0;
        this.#food.empty();
        document.getElementById('score').innerText = this.#score;
        this.#gameLoop();
    }

    #gameLoop() {
        try {
            this.#update();
            this.render();
            setTimeout(() => this.#gameLoop(), 100);
        } catch (e) {
            alert(e.message);
        }
    }

    #update() {
        const hasEaten = this.#snake.intersect(this.#food);
        this.#snake.move(hasEaten);
        if (this.#snake.hasCollided()) {
            throw Error(`Кінець гри. Ваш результат: ${this.#score}`);
        }
        if (hasEaten) {
            this.#food.empty();
            this.#score += 1;
            document.getElementById('score').innerText = this.#score;
        }
        this.#createFoodIfNotExists();
    }

    #createFoodIfNotExists() {
        if (this.#food.exists) {
            return;
        }

        this.#food.create();
        if (this.#food.intersect(this.#snake)) {
            this.#createFoodIfNotExists();
        }
    }
}