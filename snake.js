import { Control } from "./control.js";
import { GameElement } from "./game-element.js";

export class Snake extends GameElement {
    #control;
    #directionsCoordinates = {
        ArrowLeft: { x: -this.size, y: 0 },
        ArrowRight: { x: this.size, y: 0 },
        ArrowUp: { x: 0, y: -this.size },
        ArrowDown: { x: 0, y: this.size }
    };

    constructor(renderingContext) {
        super(renderingContext);
        this.#control = new Control();
        this.create();
    }

    create() {
        this.#control.stop();
        this.coordinates = [...new Array(4)].map((v, i) => ({
            y: this.gameHeight / 2,
            x: this.gameWidth / 2 - i * this.size
        }));
    }

    get head() {
        return this.coordinates.at(0);
    }

    move(increase) {
        this.#control.update();
        if (!this.#control.direction) {
            return;
        }
        const currentHeadPosition = this.head;
        const diff = this.#directionsCoordinates[this.#control.direction];

        const newHeadPosition = { x: currentHeadPosition.x + diff.x, y: currentHeadPosition.y + diff.y };

        this.coordinates.unshift(newHeadPosition);
        if (!increase) {
            this.coordinates.pop();
        }
    }

    hasCollided() {
        const { x, y } = this.head;
        if (x < 0 || y < 0) {
            return true;
        }

        if (x > this.gameWidth || y > this.gameHeight) {
            return true;
        }

        const body = this.coordinates.slice(1);

        return body.some(c => c.x === x && c.y === y);
    }
}