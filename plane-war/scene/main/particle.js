
class GuaParticle extends GuaImage {
    constructor(game) {
        super(game, 'fire')
        this.setUp()
    }

    setUp() {

    }

    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }

    update() {
        this.x += this.vx
        this.y += this.vy
        var factor = 0.01
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }
}



class GuaParticleSystem {
    constructor(game, x, y) {
        this.game = game
        this.x = x
        this.y = y
        this.setUp()
    }

    static new(game, x, y) {
        return new this(game, x, y)
    }

    setUp() {
        this.nuberOfParticles = 20
        this.particles = []
        this.live_time = 20
        this.alive = true
    }

    update() {
        this.live_time--
        if (this.live_time == 0) {
            // log('lllll', this.scene.elements[1])
            // this.scene.elements.splice(1)
            this.alive = false
        }
        if (this.particles.length < this.nuberOfParticles) {
            var p = GuaParticle.new(this.game)
            var s = 2
            var vx = randomBetween(-s, s)
            var vy = randomBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }

        for(var p of this.particles) {
            p.update()
        }
    }

    draw() {
        for(var p of this.particles) {
            p.draw()
        }
    }
}
