class GuaScene {
    constructor(game) {
        this.game = game
        this.elements = []
    }
    static new(game) {
        var i = new this(game)
        return i
    }

    addElements(img) {
        img.scene = this
        this.elements.push(img)
    }

    draw() {
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            if(e.alive == false ) {
                this.elements.splice(i, 1)
                log('elements', this.elements)
            }
            e.draw()
        }
    }
    update() {
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            e.update()
        }
    }
}
