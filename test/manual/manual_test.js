import { Matrix } from "webgl-math";

import { render, createShader, createShaderProgram, createMesh, loadImage, createTexture } from "../../index.js"

import vsSource from "./shaders/basic.vert"
import fsSource from "./shaders/basic.frag"

const canvas = document.querySelector("#webgl-canvas");
const gl = canvas.getContext("webgl");
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
gl.enable(gl.BLEND);

const vertex = createShader(gl, gl.VERTEX_SHADER, vsSource);
const fragment = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
const sp = createShaderProgram(gl, vertex, fragment);

const vertices = new Float32Array([
  -1.0, -1.0, 0.0,
  1.0, -1.0, 0.0,
  1.0, 1.0, 0.0,
  -1.0, 1.0, 0.0
]);
const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);

const texCoord = new Float32Array([
  0.0, 1.0,
  1.0, 1.0,
  1.0, 0.0,
  0.0, 0.0,
]);

const square = createMesh(gl, vertices, indices, texCoord);

const meshList = [
  square
];


const textureList = [];
loadImage("./textureA.png")
  .then(image => {
    textureList.push(createTexture(gl, image, true));
    return loadImage("./textureB.png");
  })
  .then( image => {
    textureList.push(createTexture(gl, image, true));
  })
  ;

const { Transform, Camera } = Matrix;

let projectionMatrix = Camera.perspective(Math.PI / 4, 1, 0.1, 100);
//let projectionMatrix = Camera.ortho(-10,10, -10, 10, 1, 100);

let viewMatrix = Camera.lookAt([0, 0, 20], [0, 0, -1], [0, 1, 0]);

let modelMatrix = Matrix.idendity(4);

const programUniformList = [
  {
    fn: (v, l) => gl.uniformMatrix4fv(l, false, v),
    value: Matrix.out(projectionMatrix),
    location: gl.getUniformLocation(sp, 'uProjectionMatrix')
  },
  {
    fn: (v, l) => gl.uniformMatrix4fv(l, false, v),
    value: Matrix.out(viewMatrix),
    location: gl.getUniformLocation(sp, 'uViewMatrix')
  },
  {
    fn: (v, l) => gl.uniform1i(l, v),
    value: 0,
    location: gl.getUniformLocation(sp, 'uTexture0')
  },
  {
    fn: (v, l) => gl.uniform1i(l, v),
    value: 1,
    location: gl.getUniformLocation(sp, 'uTexture1')
  }
]

const meshUniformList = [
  [
    {
      fn: (v, l) => gl.uniformMatrix4fv(l, false, v),
      value: Matrix.out(modelMatrix),
      location: gl.getUniformLocation(sp, 'uModelMatrix')
    }
  ]
];

let angle = 0;

let scale = [4, 2, 1];
let pos = [0, 0, 0];
let rot = [0, Math.PI / 4, Math.PI / 8];

const loop = (timestamp) => {
  gl.clear(gl.COLOR_BUFFER_BIT);
  angle += 0.05;

  rot[0] = angle;
  rot[1] = 0;
  rot[2] = angle* 0.2;

  let scaleMatrix = Transform.scale(Matrix.idendity(4), scale);

  let rotationXMatrix = Transform.rotate(Matrix.idendity(4), rot[0], [1, 0, 0]);
  let rotationXYMatrix = Transform.rotate(rotationXMatrix, rot[1], [0, 1, 0]);
  let rotationMatrix = Transform.rotate(rotationXYMatrix, rot[2], [0, 0, 1]);

  let translateMatrix = Transform.translate(Matrix.idendity(4), pos);

  modelMatrix = Matrix.multiply(Matrix.multiply(translateMatrix, rotationMatrix), scaleMatrix);

  meshUniformList[0][0].value = Matrix.out(modelMatrix);

  render(gl, sp, meshList, programUniformList, meshUniformList, textureList);

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);