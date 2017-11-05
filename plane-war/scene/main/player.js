class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }

    setup() {
        this.speed = 10
        this.cooldown = 0
        this.buttets = []
        this.alive = true
    }

    update() {
        if (this.cooldown > 0) {
            this.cooldown--
        }
    }

    fire() {
        if (this.cooldown != 0) {
            return
        }
        this.cooldown = 5
        var x = this.x + this.w / 2
        var y = this.y
        var b = Bullet.new(this.game)
        b.x = x
        b.y = y
        b.type = 'player'
        this.buttets.push(b)
        this.scene.addElements(b)
    }

    moveLeft() {
        this.x -= this.speed
        if (this.x < 0) {
            this.x = 0
        }
    }

    moveRight() {
        this.x += this.speed
        if (this.x > 275) {
            this.x = 275
        }
    }

    moveUp() {
        this.y -= this.speed
        if (this.y < 0) {
            this.y = 0
        }
    }

    moveDown() {
        this.y += this.speed
        if (this.y > 320) {
            this.y = 320
        }
    }

    killed() {
        this.alive = false
    }

    collide(b) {
        return rectIntersects(this, b)
    }
}
