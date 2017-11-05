


class GuaParticle extends GuaImage {
    constructor(game) {
        super(game, 'fire')
        this.setUp()
    }

    setUp() {
        this.live = 20
    }

    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }

    update() {
        this.live--
        // log('this.live', this.live)
        this.x += this.vx
        this.y += this.vy
        var factor = 0.01
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }
}


class GuaParticleSystem {
    constructor(game) {
        this.game = game
        this.setUp()
    }

    static new(game) {
        return new this(game)
    }

    setUp() {
        this.x = 150
        this.y = 200
        this.nuberOfParticles = 20
        this.particles = []
    }

    update() {
        if (this.particles.length < this.nuberOfParticles) {
            var p = GuaParticle.new(this.game)
            var s = 2
            var vx = randomBetween(-s, s)
            var vy = randomBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }

        var cache = []
        for(var p of this.particles) {
            p.update()
            if (p.live > 0) {
                cache.push(p)
            }
        }
        this.particles = cache
    }

    draw() {
        for(var p of this.particles) {
            p.draw()
        }
    }
}