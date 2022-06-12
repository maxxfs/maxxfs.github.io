const resolution = 20
const colorResolution = 100
const globe = new Array(resolution + 1)
let myCamera

let shape1Params = {
    n1: .2,
    n2: 1.7,
    n3: 1.7,
    a: 1.,
    b: 1.,
    m: 7.
}

let shape2Params = {
    n1: .2,
    n2: 1.7,
    n3: 1.7,
    a: 1.,
    b: 1.,
    m: 7.
}


let saturation = 50
let brightness = 90

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL)
    colorMode(HSB, colorResolution, 100, 100, 1)
    for (let i = 0; i < resolution + 1; i++) {
        globe[i] = new Array(resolution)
    }
    myCamera = createCamera(0, 0, 0);
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

    const radius = windowHeight / 2;
    rotateX(sin(frameCount * .002))
    rotateY(cos(frameCount * .003))

    for (let lon = 0; lon < resolution + 1; lon++) {
        let theta = map(lon, 0, resolution, -PI, PI)
        for (let lat = 0; lat < resolution + 1; lat++) {
            let fi = map(lat, 0, resolution, -HALF_PI, HALF_PI)

            let r1 = superShape(theta, ...Object.values(shape1Params))
            let r2 = superShape(fi,    ...Object.values(shape2Params))

            let x = radius * r1 * cos(theta) * r2 * cos(fi)
            let y = radius * r1 * sin(theta) * r2 * cos(fi)
            let z = radius * r2 * sin(fi)
            globe[lon][lat] = new p5.Vector(x, y, z)
        }
    }

    for (let i = 0; i < resolution; i++) {
        let hu = map(i, 0, resolution, 0, colorResolution)
        beginShape(TRIANGLE_STRIP)
        // beginShape(POINTS)
        for (let j = 0; j < resolution + 1; j++) {
            let v1 = globe[i][j]
            let v2 = globe[i+1][j]
            stroke(hu, saturation, brightness)
            vertex(v1.x, v1.y, v1.z)
            vertex(v2.x, v2.y, v2.z)
        }
        endShape()
    }
}