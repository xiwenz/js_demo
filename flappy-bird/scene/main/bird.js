class SceneBird extends GuaScene {
    constructor(game) {
        super(game)

        this.setUp()
        this.setupInputs()
    }

    setUp() {
        this.point = 0

        var game = this.game
        var bg = GuaImage.new(game, 'bg')
        this.addElements(bg)

        this.pipe = Pipes.new(game)
        this.addElements(this.pipe)

        this.grounds = []
        for (var i = 0; i < 30; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 20
            g.y = 420
            this.addElements(g)
            this.grounds.push(g)
        }
        this.skipCount = 4

        var b = GuaAimation.new(game)
        b.x = 120
        b.y = 150
        this.bird = b
        this.addElements(b)
    }

    gameOver() {
        if (this.bird.alive == false && this.bird.y == 390) {
            return true
        }
        return false
    }

    collide(a, b, direction) {
        if (b.x > a.x && b.x < a.x + a.w) {
            if (direction == 'up') {
                if (b.y < a.y + a.h) {
                    return true
                }
            } else if (direction == 'down') {
                if (b.y > a.y) {
                    return true
                }
            }

        }
        return false
    }

    score() {
        var b = this.bird
        var p = this.pipe.pipes
        for (var i = 0; i < p.length; i +=2) {
            var p1 = p[i]
            if (b.x > p1.x + p1.w && p1.passThrough == false) {
                p1.passThrough = true
                this.point += 1
            }
        }
    }

    birdDie() {
        var b = this.bird
        var p = this.pipe.pipes
        for (var i = 0; i < p.length; i +=2) {
            var p1 = p[i]
            var p2 = p[i+1]
            var validateP1 = this.collide(p1, b, 'up')
            var validateP2 = this.collide(p2, b, 'down')
            if (validateP1 || validateP2) {
                b.alive = false
            }
        }
    }

    draw() {
        super.draw()
        var text = this.point
        this.game.context.fillText(text, 130, 100)
        if (this.gameOver()) {
            this.game.context.fillText('GAME OVER', 100, 160)
            this.game.context.fillText('press r retry', 100, 190)
        }
    }

    update() {
        if (this.gameOver()) {
            return
        }
        super.update()
        this.skipCount--
        var offset = -5
        if (this.skipCount == 0) {
            this.skipCount = 4
            offset = 15
        }
        for (var i = 0; i < 30; i++) {
            var g = this.grounds[i]
            g.x += offset
        }

        this.score()
        this.birdDie()
    }

    setupInputs() {
        var self = this
        var b = this.bird
        var g = this.game
        self.game.registerAction('a', function(keystatus) {
            b.move(-3, keystatus)
        })
        self.game.registerAction('d', function(keystatus) {
            b.move(3, keystatus)
        })
        self.game.registerAction('j', function() {
            b.jump()
        })
        self.game.registerAction('r', function() {
            var s = SceneTitle.new(g)
            g.replaceScene(s)
        })
    }
}
