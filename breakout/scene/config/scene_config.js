class SceneConfig extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    draw() {
        var game = this.game
        game.context.fillStyle = "#554"
        game.context.fillRect(0, 0, 400, 300)
        var blocks = loadLevel(game, 1)
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
    }

    setup() {
        var self = this
        self.game.canvas.addEventListener('click', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            log('click', x, y)
            self.drawBlock(x, y)
        })
    }

    drawBlock(x, y) {
        var offsetX = Math.floor(x/40)*40
        var offsetY = Math.floor(y/20)*20
        var coordinate = []
        coordinate.push(offsetX, offsetY)
        levels[0].push(coordinate)

    }
}
