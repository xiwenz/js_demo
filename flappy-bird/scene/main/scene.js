class Bullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }

    setup() {
        this.speed = 3
        this.alive = true
    }

    update() {
        this.y -= this.speed
    }
}

class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }

    setup() {
        this.speed = 10
        this.cooldown = 0
        this.buttets = []
    }

    update() {
        this.speed = config.player_speed
        if(this.cooldown > 0) {
            this.cooldown--
        }
    }

    fire() {
        if (this.cooldown != 0) {
            return
        }
        this.cooldown = 3
        var x = this.x + this.w / 2
        var y = this.y
        var b = Bullet.new(this.game)
        b.x = x
        b.y = y
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
}


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
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 275)
        this.y = -randomBetween(0, 200)
    }

    update() {
        this.y += this.speed
        if (this.y > 320) {
            this.setup()
        }
    }

    collide(b) {
        return(rectIntersects(this, b) || rectIntersects(b, this))
    }

    killed(b) {
        this.setup()
        log('whats b', b)
        b.alive = false
    }
}


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

    killEnemy() {
        var p = this.player
        var bs = p.buttets
        for (var i = 0; i < bs.length; i++) {
            var bullet = bs[i]
            if (bullet.y <= 0) {
                bs.pop(bullet)
            }
            var es = this.enemies
            for (var j = 0; j < es.length; j++) {
                var enemy = es[j]
                if (enemy.collide(bullet)) {
                    enemy.killed(bullet)
                    bs.pop(bullet)
                    log('kill', enemy, bullet)
                }
            }
        }
    }

    update() {
        super.update()
        this.killEnemy()
    }

}


// var Scene = function(game) {
//     var s = {
//         game: game,
//     }
//     // 初始化
//     var paddle = Paddle(game)
//     var ball = Ball(game)
//
//     var score = 0
//
//     var blocks = loadLevel(game, 1)
//
//     game.registerAction('a', function(){
//         paddle.moveLeft()
//     })
//     game.registerAction('d', function(){
//         paddle.moveRight()
//     })
//     game.registerAction('f', function(){
//         ball.fire()
//     })
//
//     s.draw = function() {
//         // draw 背景
//         game.context.fillStyle = "#554"
//         game.context.fillRect(0, 0, 400, 300)
//         // draw
//         game.drawImage(paddle)
//         game.drawImage(ball)
//         // draw blocks
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.alive) {
//                 game.drawImage(block)
//             }
//         }
//         // draw labels
//         game.context.fillText('分数: ' + score, 10, 290)
//     }
//     s.update = function() {
//         if (window.paused) {
//             return
//         }
//
//         ball.move()
//         // 判断游戏结束
//         if (ball.y > paddle.y) {
//             // 跳转到 游戏结束 的场景
//             var end = SceneEnd.new(game)
//             game.replaceScene(end)
//         }
//         // 判断相撞
//         if (paddle.collide(ball)) {
//             // 这里应该调用一个 ball.反弹() 来实现
//             ball.反弹()
//         }
//         // 判断 ball 和 blocks 相撞
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.collide(ball)) {
//                 // log('block 相撞')
//                 block.kill()
//                 ball.反弹()
//                 // 更新分数
//                 score += 100
//             }
//         }
//     }
//
//     // mouse event
//     var enableDrag = false
//     game.canvas.addEventListener('mousedown', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         log(x, y, event)
//         // 检查是否点中了 ball
//         if (ball.hasPoint(x, y)) {
//             // 设置拖拽状态
//             enableDrag = true
//         }
//     })
//     game.canvas.addEventListener('mousemove', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         // log(x, y, 'move')
//         if (enableDrag) {
//             log(x, y, 'drag')
//             ball.x = x
//             ball.y = y
//         }
//     })
//     game.canvas.addEventListener('mouseup', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         log(x, y, 'up')
//         enableDrag = false
//     })
//
//     return s
// }
