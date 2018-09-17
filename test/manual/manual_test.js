import { Matrix } from "webgl-math";

import { render, createShader, createShaderProgram, createMesh } from "../../index.js"

const glMatrix = require('./gl-matrix-min.js');

import vsSource from "./shaders/basic.vert"
import fsSource from "./shaders/basic.frag"
import { determinant } from "gl-matrix/src/gl-matrix/mat4";

const canvas = document.querySelector("#webgl-canvas");
const gl = canvas.getContext("webgl");
gl.clearColor(0.0, 0.0, 0.0, 1.0);

const vertex = createShader(gl, gl.VERTEX_SHADER, vsSource);
const fragment = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
const sp = createShaderProgram(gl, vertex, fragment);

const vertices = new Float32Array([
  -1.0, 1.0,
  1.0, 1.0,
  -1.0, -1.0,
  1.0, -1.0,
]);
const indices = new Uint16Array([0, 1, 3, 0, 3, 2]);

const square = createMesh(gl, vertices, indices);

const meshList = [
  square
]

const { Transform, Camera } = Matrix;

let projectionMatrix = Camera.perspective(Math.PI / 4, 1, 0.1, 100);
//let projectionMatrix = Camera.ortho(-10,10, -10, 10, 1, 100);
let viewMatrix = Transform.translate(Matrix.idendity(4), [0, 0, 0]);

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
]

let angle = 0;

let scale = [4, 2, 1];
let pos = [0, 0, -16];
let rot = [0, Math.PI / 4, Math.PI / 8];

const loop = (timestamp) => {
  gl.clear(gl.COLOR_BUFFER_BIT);
  angle += 0.01;

  rot[0] = angle;
  rot[1] = angle * 2;
  rot[2] = angle * 3;

  let scaleMatrix = Transform.scale(Matrix.idendity(4), scale);

  let rotationXMatrix = Transform.rotate(Matrix.idendity(4), rot[0], [1, 0, 0]);
  let rotationXYMatrix = Transform.rotate(rotationXMatrix, rot[1], [0, 1, 0]);
  let rotationMatrix = Transform.rotate(rotationXYMatrix, rot[2], [0, 0, 1]);

  let translateMatrix = Transform.translate(Matrix.idendity(4), pos);

  modelMatrix = Matrix.multiply(Matrix.multiply(translateMatrix, rotationMatrix), scaleMatrix);

  meshUniformList[0][0].value = Matrix.out(modelMatrix);

  render(gl, sp, meshList, programUniformList, meshUniformList);

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);