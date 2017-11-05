const randomBetween = function(start, end) {
    var n = Math.random() * (end - start + 1)
    n = Math.floor(n + start)
    return n
}


class Enemy extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 4)
        var name = 'enemy' + type
        super(game, name)
        this.setup()
    }

    setup() {
        this.speed = randomBetween(1, 3)
        this.x = randomBetween(0, 275)
        this.y = -randomBetween(0, 200)
        this.cooldown = 0
        this.buttets = []
    }

    update() {
        this.y += this.speed
        if (this.y > 320) {
            this.setup()
        }
        if (this.cooldown > 0) {
            this.cooldown--
        }
    }

    fire() {
        if (this.cooldown != 0) {
            return
        }
        this.cooldown = 60
        var x = this.x + this.w / 2
        var y = this.y+ this.h
        var b = Bullet.new(this.game)
        b.x = x
        b.y = y
        b.type = 'enemy'
        b.speed = 4
        this.buttets.push(b)
        this.scene.addElements(b)
    }

    collide(b) {
        return rectIntersects(this, b)
    }

    killed(b) {
        b.alive = false
        this.setup()
    }
}
