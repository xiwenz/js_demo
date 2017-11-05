class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }

    setup() {
        this.bg = GuaImage.new(this.game, 'bg')
        this.nemberOfEnemies = 5
        this.player = Player.new(this.game)
        this.player.x = 150
        this.player.y = 250
        this.enemies = []

        this.addElements(this.bg)
        this.addElements(this.player)
        this.addEnemies()
    }

    addEnemies() {
        var es = []
        for (var i = 0; i < this.nemberOfEnemies; i++) {
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElements(e)
        }
        this.enemies = es
    }

    setupInputs() {
        var g = this.game
        var s = this
        g.registerAction('a', function(){
            s.player.moveLeft()
        })
        g.registerAction('d', function(){
            s.player.moveRight()
        })
        g.registerAction('w', function(){
            s.player.moveUp()
        })
        g.registerAction('s', function(){
            s.player.moveDown()
        })
        g.registerAction('j', function(){
            s.player.fire()
        })
    }

    boom(element) {
        var x = element.x + element.w / 2
        var y = element.y + element.h / 2
        var ps = GuaParticleSystem.new(this.game, x, y)
        this.addElements(ps)
    }

    killEnemy() {
        var p = this.player
        var bs = p.buttets
        for (var i = 0; i < bs.length; i++) {
            var bullet = bs[i]
            if (bullet.y <= 0) {
                bs.splice(i, 1)
            }
            var es = this.enemies
            for (var j = 0; j < es.length; j++) {
                var enemy = es[j]
                if (enemy.collide(bullet)) {
                    this.boom(enemy)
                    enemy.killed(bullet)
                    bs.splice(i, 1)
                }
            }
        }
    }

    killPlayer() {
        if (this.player.alive == false) {
            return
        }
        var p = this.player
        var bs = this.elements
        // for (var i of bs) {
        for (var i = 0; i < bs.length; i++) {
            var b = bs[i]
            if (b.type == 'enemy') {
                if (p.collide(b)) {
                    this.boom(p)
                    p.killed()
                    bs.splice(i, 1)
                }
            }
        }
    }

    update() {
        super.update()
        this.killEnemy()
        this.killPlayer()
        for (var i of this.enemies) {
            i.fire()
        }
    }
}
