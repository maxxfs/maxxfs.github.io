let cols
let rows
const w = 50
let grid = []
let current
let stack = []

function setup() {
    createCanvas(600, 400)
    cols = floor(width / w)
    rows = floor(height / w)

    const indexFn = function (i, j) {
        if (i < 0 || j < 0 || i > cols -1 || j > rows - 1) {
            return -1
        }
        return i + j * cols
    }

    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            const cell = new Cell(i, j, grid, indexFn)
            grid.push(cell)
        }
    }
    current = grid[0]
}

function draw() {
    background(51)
    for (let i = 0; i < grid.length; i++) {
        showCell(grid[i], current === grid[i])
    }


    current.visited = true
    const next = current.checkNeighbors()
    if (next) {
        next.colorIndex = current.colorIndex + 1
        stack.push(current)
        current.removeWalls(next)
        current = next
    } else if (stack.length > 0) {
        current = stack.pop()
    } else {
        noLoop()
    }


}

function showCell(cell, isCurrent) {
    const x = cell.i * w
    const y = cell.j * w
    stroke(255)
    if (cell.walls[WALL_TOP]) {
        line(x,     y    , x + w, y)
    }
    if (cell.walls[WALL_RIGHT]) {
        line(x + w, y    , x + w, y + w)
    }
    if (cell.walls[WALL_BOTTOM]) {
        line(x + w, y + w, x    , y + w)
    }
    if (cell.walls[WALL_LEFT]) {
        line(x    , y + w, x    , y)
    }

    if (isCurrent) {
        noStroke()
        fill(0, 0, 255, 100)
        rect(x, y, w, w)
    } else if (cell.visited) {
        noStroke()
        fill(cell.colorIndex, 0, cell.colorIndex, 100)
        rect(x, y, w, w)
    }
}
