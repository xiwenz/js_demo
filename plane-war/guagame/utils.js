var e = sel => document.querySelector(sel)

var log = console.log.bind(console)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var rectIntersects = function(a, b) {
    // if (b.y > o.y && b.y < o.y + o.h) {
    //     if (b.x > o.x && b.x < o.x + o.w) {
    //         return true
    //     }
    // }
    if (b.x > a.x && b.x < a.x + a.w) {
        if (b.type == 'player') {
            if (b.y < a.y) {
                return true
            }
        } else {
            if (b.y > a.y && b.y < a.y + a.h) {
                return true
            }
        }
    }
    return false
}
