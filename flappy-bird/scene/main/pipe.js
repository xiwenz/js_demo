class Pipes {
    constructor(game) {
        this.game = game
        this.setUp()
    }

    static new(game) {
        return new this(game)
    }

    setUp() {
        this.pipes = []
        this.pipeSpace = 150
        this.管子横向间距 = 200
        this.columsOfPipe = 3
        this.setAllPipes()
    }

    setAllPipes() {
        var game = this.game
        for (var i = 0; i < this.columsOfPipe; i++) {
            var p1 = GuaImage.new(game, 'pipe')
            p1.flipY = true
            p1.x = 500 + i * this.管子横向间距
            p1.passThrough = false
            var p2 = GuaImage.new(game, 'pipe')
            p2.x = p1.x
            p2.passThrough = false
            this.resetPipePosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }

    resetPipePosition(p1, p2) {
        p1.y = randomBetween(-300, -50)
        p2.y = p1.y + p1.h + this.pipeSpace
    }

    debug() {
        this.管子横向间距 = config.管子横向间距.value
        this.pipeSpace = config.pipe_space.value
    }

    resetPipe(p) {
        p.x += this.管子横向间距 * this.columsOfPipe
        p.passThrough = false
    }

    update() {
        for (var i = 0; i < this.pipes.length; i += 2) {
            var p1 = this.pipes[i]
            var p2 = this.pipes[i+1]
            p1.x -= 5
            p2.x -= 5
            if (p1.x < -100) {
                this.resetPipe(p1)
            }
            if (p2.x < -100) {
                this.resetPipe(p2)
                this.resetPipePosition(p1, p2)
            }
        }
    }

    draw() {
        var context = this.game.context

        for (var p of this.pipes) {

            context.save()

            var w2 = p.w / 2
            var h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2)
            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2)

            context.drawImage(p.texture, 0, 0)

            context.restore()
        }
    }
}
