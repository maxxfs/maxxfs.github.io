const WALL_TOP = 0
const WALL_RIGHT = 1
const WALL_BOTTOM = 2
const WALL_LEFT = 3

function Cell(i, j, grid, indexFn) {
    this.i = i
    this.j = j
    this.walls = [true, true, true, true]
    this.visited = false
    this.grid = grid
    this.indexFn = indexFn
    this.colorIndex = 0

    this.checkNeighbors = function () {
        const idx = this.indexFn;
        const places = [
            idx(i, j - 1),
            idx(i + 1, j),
            idx(i, j + 1),
            idx(i -1 , j)
        ];

        let neighbors = [];
        for (const place of places) {
            let neighbor = this.grid[place]
            if (neighbor && !neighbor.visited) {
                neighbors.push(neighbor);
            }
        }

        if (neighbors.length > 0) {
            const r = floor(random(0, neighbors.length))
            return neighbors[r]
        } else {
            return undefined
        }
    }

    this.removeWalls = function (neighbor) {
        const x = this.i - neighbor.i;
        if (x === 1) {
            this.walls[WALL_LEFT] = false
            neighbor.walls[WALL_RIGHT] = false
        } else if (x === -1) {
            this.walls[WALL_RIGHT] = false
            neighbor.walls[WALL_LEFT] = false
        }
        const y = this.j - neighbor.j
        if (y === 1) {
            this.walls[WALL_TOP] = false
            neighbor.walls[WALL_BOTTOM] = false
        } else if (y === -1) {
            this.walls[WALL_BOTTOM] = false
            neighbor.walls[WALL_TOP] = false
        }
    }
}