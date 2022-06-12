const resolution = 50
const globe = new Array(resolution + 1)
let cam

let n1 = .2
let n2 = 1.7
let n3 = 1.7
let m = 7.
let a = 1.
let b = 1.

function setup() {
    createCanvas(600, 400, WEBGL)
    colorMode(HSB)
    for (let i = 0; i < resolution + 1; i++) {
        globe[i] = new Array(resolution)
    }
    cam = createCamera();
}

function superShape(theta, n1, n2, n3, a, b, m)
{
    const part1 = pow(abs(cos(m * theta / 4) / a), n2)
    const part2 = pow(abs(sin(m * theta / 4) / b), n3)
    return pow(part1 + part2, -1 / n1)
}

function draw() {
    background(0)
    // fill(255)
    noFill()
    lights()
    noStroke()

    orbitControl()

    const r = 200;
    rotateX(sin(frameCount * .01))
    rotateY(cos(frameCount * .01))

    for (let lon = 0; lon < resolution + 1; lon++) {
        let theta = map(lon, 0, resolution, -PI, PI)
        for (let lat = 0; lat < resolution + 1; lat++) {
            let fi = map(lat, 0, resolution, -HALF_PI, HALF_PI)

            let r1 = superShape(theta, n1, n2, n3, a, b, m)
            let r2 = superShape(fi, n1, n2, n3, a, b, m)

            let x = r * r1 * cos(theta) * r2 * cos(fi)
            let y = r * r1 * sin(theta) * r2 * cos(fi)
            let z = r * r2 * sin(fi)
            globe[lon][lat] = new p5.Vector(x, y, z)
        }
    }

    for (let i = 0; i < resolution; i++) {
        // let hu = map(i, 0, resolution, 0, 255)
        // fill(hu % 255, 255, 255)
        beginShape(TRIANGLE_STRIP)
        // beginShape(POINTS)
        for (let j = 0; j < resolution + 1; j++) {
            let v1 = globe[i][j]
            let v2 = globe[i+1][j]
            stroke(255)
            strokeWeight(.5)

            vertex(v1.x, v1.y, v1.z)
            vertex(v2.x, v2.y, v2.z)
        }
        endShape()
    }
}