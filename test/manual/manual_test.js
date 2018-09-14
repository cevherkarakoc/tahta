import { render, createShader, createShaderProgram, createMesh } from "../../index.js"

const glMatrix = require('./gl-matrix-min.js');

import vsSource from "./shaders/basic.vert"
import fsSource from "./shaders/basic.frag"

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

let projectionMatrix = glMatrix.mat4.create();
let viewMatrix = glMatrix.mat4.create();
let modelMatrix = glMatrix.mat4.create();
let translate = glMatrix.vec3.create();
glMatrix.vec3.set(translate, 0.0, 0.0, -6.0)

glMatrix.mat4.perspective(projectionMatrix, Math.PI / 4.0, 1, 0.1, 100)
glMatrix.mat4.translate(modelMatrix, modelMatrix, translate)

const programUniformList = [
  {
    fn: d => gl.uniformMatrix4fv(gl.getUniformLocation(sp, 'uProjectionMatrix'), false, d),
    value: projectionMatrix
  },
  {
    fn: d => gl.uniformMatrix4fv(gl.getUniformLocation(sp, 'uViewMatrix'), false, d),
    value: viewMatrix
  }
]

const meshUniformList = [
  [
    {
      fn: d => gl.uniformMatrix4fv(gl.getUniformLocation(sp, 'uModelMatrix'), false, d),
      value: modelMatrix
    }
  ]
]

let angle = 0;
const loop = (timestamp) => {
  gl.clear(gl.COLOR_BUFFER_BIT);

  glMatrix.mat4.rotateX(modelMatrix, modelMatrix, 0.03);
  glMatrix.mat4.rotateY(modelMatrix, modelMatrix, 0.02);
  glMatrix.mat4.rotateZ(modelMatrix, modelMatrix, 0.01);

  render(gl, sp, meshList, programUniformList, meshUniformList);

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);