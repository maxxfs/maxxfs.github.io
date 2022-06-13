const colorResolution = 360

// https://www.3dchem.com/3dmodels/Dimethyltryptamine.txt
const atomsConfig = [
[-1.5236,    2.8497,   -0.0257, "C",],
[-1.2604,    1.5496,    0.3597, "C",],
[0.0358,    1.2303,    0.7780, "C",],
[1.0341,    2.2389,    0.8096, "C",],
[0.7621,    3.5557,    0.4180, "C",],
[-0.5237,    3.8394,    0.0005, "C",],
[0.6490,    0.0014,    1.2294, "C",],
[1.9685,    0.2717,    1.5186, "C",],
[2.2100,    1.6590,    1.3472, "N",],
[-0.0351,   -1.3018,    1.3632, "C",],
[-0.2748,   -1.9341,   -0.0085, "C",],
[-1.1520,   -3.1377,    0.1111, "N",],
[-1.1329,   -3.9677,   -1.1127, "C",],
[-2.5288,   -2.7879,    0.5289, "C",],
[-2.5295,    3.1244,   -0.3596, "H",],
[-2.0353,    0.7756,    0.3433, "H",],
[1.5384,    4.3264,    0.4415, "H",],
[-0.7772,    4.8561,   -0.3174, "H",],
[2.7368,   -0.4123,    1.8816, "H",],
[3.1102,    2.0209,    1.1594, "H",],
[-1.0087,   -1.1573,    1.8871, "H",],
[0.5604,   -1.9791,    2.0062, "H",],
[0.6887,   -2.2504,   -0.4540, "H",],
[-0.7118,   -1.1829,   -0.7033, "H",],
[-1.7575,   -4.8561,   -0.9538, "H",],
[-0.1062,   -4.3023,   -1.3100, "H",],
[-1.5030,   -3.4415,   -2.0062, "H",],
[-3.0600,   -3.7028,    0.8182, "H",],
[-3.1100,   -2.2791,   -0.2552, "H",],
[-2.4717,   -2.1203,    1.4047, "H",],
]

const bindings = [
    [1, 2, 2, 0],
    [1, 6, 1, 0],
    [1, 15, 1, 0],
    [2, 3, 1, 0],
    [2, 16, 1, 0],
    [3, 4, 2, 0],
    [3, 7, 1, 0],
    [4, 5, 1, 0],
    [4, 9, 1, 0],
    [5, 6, 2, 0],
    [5, 17, 1, 0],
    [6, 18, 1, 0],
    [7, 8, 2, 0],
    [7, 10, 1, 0],
    [8, 9, 1, 0],
    [8, 19, 1, 0],
    [9, 20, 1, 0],
    [10, 11, 1, 6],
    [10, 21, 1, 1],
    [10, 22, 1, 1],
    [11, 12, 1, 0],
    [11, 23, 1, 0],
    [11, 24, 1, 6],
    [12, 13, 1, 6],
    [12, 14, 1, 0],
    [13, 25, 1, 0],
    [13, 26, 1, 0],
    [13, 27, 1, 6],
    [14, 28, 1, 0],
    [14, 29, 1, 6],
    [14, 30, 1, 1],
]

let atoms = [];
let scaleRatio;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL)
    colorMode(HSB, colorResolution, 100, 100, 1)
    for(let i=0; i<atomsConfig.length; i++) {
        let [x, y, z, type] = atomsConfig[i]
        atoms.push(new Atom(x, y, z, type))
    }
    scaleRatio = min(windowWidth, windowHeight) / 12
 }

function getAtomColor(index)
{
    let clr = map(index, 0, atomsConfig.length, 0, colorResolution / 4)

    let rotationShift = (colorResolution + colorResolution * sin(frameCount * .004))/2
    clr += rotationShift
    return clr % colorResolution
}

function draw() {
    background(0)
    lights()
    noStroke()
    orbitControl()
    scale(scaleRatio)

    rotateZ(HALF_PI)
    rotateX(frameCount * .003)

    for(let i=0; i<atoms.length; i++) {
        drawAtom(atoms[i], i)
    }

    for (let i=0; i<bindings.length; i++) {
        let [fromIndex, toIndex, weight, param4] = bindings[i]
        drawConnection(atoms[fromIndex - 1], atoms[toIndex - 1], weight)
    }
}

function drawAtom(atom, index)
{
    push()
    let radius
    let saturation = 100
    let brightness = 100
    switch(atom.type) {
        case 'H':
            radius = .35
            saturation = 50
            brightness = 50
            break;
        case 'C':
            radius = .55
            brightness = 50
            break;
        case 'N':
            radius = .4
            brightness = 20
    }
    let currentColor = getAtomColor(index)
    fill(currentColor, saturation, brightness)
    translate(atom.x, atom.y, atom.z)
    sphere(radius)
    pop()
}

function drawConnection(fromAtom, toAtom, weight)
{
    stroke(255)
    strokeWeight((weight - 1) * 4 + 2)
    line(fromAtom.x, fromAtom.y, fromAtom.z, toAtom.x, toAtom.y, toAtom.z)
}