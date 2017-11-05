class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function(){
            var s = SceneBird.new(game)
            game.replaceScene(s)
        })
        var bg = GuaImage.new(this.game, 'bg')
        this.addElements(bg)
    }
    draw() {
        // draw labels
        super.draw()
        this.game.context.fillText('按 k 开始游戏', 100, 190)
    }
}
