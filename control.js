export class Control {
    #direction;
    #latestDirectionClick;

    get direction() {
        return this.#direction;
    }

    constructor() {
        document.addEventListener('keydown', evt => {
            const horizontalDirection = ['ArrowLeft', 'ArrowRight'];
            const verticalDirection = ['ArrowUp', 'ArrowDown'];
            const directions = [...horizontalDirection, ...verticalDirection];

            if (!directions.includes(evt.code)) {
                return;
            }

            if (horizontalDirection.includes(evt.code) && horizontalDirection.includes(this.direction)) {
                return;
            }

            if (verticalDirection.includes(evt.code) && verticalDirection.includes(this.direction)) {
                return;
            }

            this.#latestDirectionClick = evt.code;
        });
    }

    update() {
        this.#direction = this.#latestDirectionClick;
    }

    stop() {
        this.#latestDirectionClick = null;
        this.#direction = null;
    }
}