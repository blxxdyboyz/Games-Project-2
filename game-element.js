export class GameElement {
    #context;
    #coordinates;
    #size = 30;
    #options = {
        fillStyle: 'gray',
        strokeStyle: 'black'
    };

    get coordinates() {
        return this.#coordinates;
    }

    get gameWidth() {
        return this.#context.canvas.clientHeight;
    }

    get gameHeight() {
        return this.#context.canvas.clientHeight;
    }

    set coordinates(value) {
        if (typeof value !== 'object') {
            throw new Error('Coordinates should be an array or object');
        }
        this.#coordinates = value;
    }

    get exists() {
        return !!this.#coordinates;
    }

    get size() {
        return this.#size;
    }

    get coordinatesAsArray() {
        if (!this.exists) {
            return [];
        }

        if (Array.isArray(this.#coordinates)) {
            return this.#coordinates;
        }

        return [this.#coordinates];
    }

    get context() {
        return this.#context;
    }

    constructor(renderingContext, options = {}) {
        Object.assign(this.#options, options);
        this.#context = renderingContext;
    }

    render() {
        if (!this.exists) {
            return;
        }
        this.coordinatesAsArray.forEach(c => this.#renderBlock(c));
    }

    empty() {
        this.#coordinates = null;
    }

    intersect(gameElement) {
        if (!gameElement.exists || !this.exists) {
            return false;
        }
        const coordinates = gameElement.coordinatesAsArray;
        return this.coordinatesAsArray.some(c => coordinates.some(gC => c.x === gC.x && c.y === gC.y));
    }

    #renderBlock({ x, y }) {
        this.#context.fillStyle = this.#options.fillStyle;
        this.#context.strokeStyle = this.#options.strokeStyle;
        this.#context.fillRect(x, y, this.size, this.size);
        this.#context.strokeRect(x, y, this.size, this.size);
    }
}