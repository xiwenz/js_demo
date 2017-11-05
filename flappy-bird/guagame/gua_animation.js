class GuaAimation {
    constructor(game) {
        this.game = game
        this.animations = {
            bird: [],
        }
        for (var i = 1; i < 4; i++) {
            var name = `bird0_${i}`
            var t = game.textureByName(name)
            this.animations['bird'].push(t)
        }
        this.animationName = 'bird'
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.frameIndex = 0
        this.frameCount = 3

        this.flipx = false
        this.rotation = 0

        this.gy = 10
        this.vy = 0

        this.alive = true
    }

    static new(game) {
        return new this(game)
    }

    frames() {
        return this.animations[this.animationName]
    }

    jump() {
        if (this.alive == false) {
            return
        }
        this.vy = -10
        this.rotation = -45
    }

    update() {
        this.y += this.vy
        this.vy += this.gy * 0.2
        var h = 390
        if (this.y > h) {
            this.y = h
            this.alive = false
        }

        if (this.rotation < 45) {
            this.rotation += 5
        }

        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 3
            this.frameIndex  = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }

    draw() {
        var context = this.game.context
        context.save()

        var w2 = this.w / 2
        var h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2)
        if (this.flipx) {
            context.scale(-1, 1)
        }
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)

        context.drawImage(this.texture, 0, 0)

        context.restore()
    }

    move(x, keyStatus) {
        this.flipx = x < 0

        this.x += x

        // var animationNames = {
        //     down: 'bird',
        //     up: 'bird',
        // }
        // var name = animationNames[keyStatus]
        // this.changeAnimationName(name)
    }

    changeAnimationName(name) {
        this.animationName = name
    }
}