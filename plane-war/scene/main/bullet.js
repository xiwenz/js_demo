class Bullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }

    setup() {
        this.speed = 3
        this.alive = true
        this.type = null
    }

    update() {
        if (this.type == 'player') {
            this.y -= this.speed
        } else if (this.type == 'enemy') {
            this.y += this.speed
        }
    }
}
