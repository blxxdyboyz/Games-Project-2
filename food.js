import { GameElement } from "./game-element.js";

export class Food extends GameElement {

    create() {
        this.coordinates = {
            x: this.#generateRandom(this.gameWidth),
            y: this.#generateRandom(this.gameHeight)
        };
    }

    #generateRandom(max) {
        const random = Math.random() * (max - this.size);
        return Math.round(random/this.size) * this.size;
    }

}