class GuaLable {
    constructor(game, test) {
        this.game = game
        this.text = test
    }

    static new(game, text) {
        return new this(game, text)
    }

    draw() {
        // draw labels
        this.game.context.fillText(this.text, 100, 190)
    }

    update() {

    }
}