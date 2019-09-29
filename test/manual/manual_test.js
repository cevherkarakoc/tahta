import GLMath, { Vector, Matrix } from 'webgl-math';

import {
  render,
  createShader,
  createShaderProgram,
  createMesh,
  loadImage,
  createTexture,
} from '../../index.js';

import vsSource from './shaders/basic.vert';
import fsSource from './shaders/basic.frag';

const canvas = document.querySelector('#webgl-canvas');
const gl = canvas.getContext('webgl2');
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.frontFace(gl.CCW)
gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
gl.enable(gl.BLEND);

// Create a shader program
const vertex = createShader(gl, gl.VERTEX_SHADER, vsSource);
const fragment = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
const sp = createShaderProgram(gl, vertex, fragment);

// Create a mesh
const vertices = new Float32Array([
  -1.0,
  -1.0,
  0.0,
  1.0,
  -1.0,
  0.0,
  1.0,
  1.0,
  0.0,
  -1.0,
  1.0,
  0.0,
]);
const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);

const texCoord = new Float32Array([0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0]);

const square = createMesh(gl)({ vertices, texCoord }, indices, gl.TRIANGLES);

const meshList = [square];

// Vertex Attributes

const attributes = [
  {
    name: 'vertices',
    location: gl.getAttribLocation(sp, 'aPosition'),
    size: 3,
    type: gl.FLOAT,
    normalized: false,
    stride: 0,
    offset: 0
  },
  {
    name: 'texCoord',
    location: gl.getAttribLocation(sp, 'aTexCoord'),
    size: 2,
    type: gl.FLOAT,
    normalized: false,
    stride: 0,
    offset: 0
  },
]

// Load textures
const textureList = [];
loadImage('./textureA.png')
  .then(image => {
    textureList.push(createTexture(gl, image, true));
    return loadImage('./textureB.png');
  })
  .then(image => {
    textureList.push(createTexture(gl, image, true));
  });

const { Transform, Camera } = Matrix;

const X = 0,
  Y = 1,
  Z = 2,
  W = 3;
const xAxis = Float32Array.of(1, 0, 0);
const yAxis = Float32Array.of(0, 1, 0);
const zAxis = Float32Array.of(0, 0, 1);

const loop = state => timestamp => {
  gl.clear(gl.COLOR_BUFFER_BIT);

  //calcMeshUniformList(state)
  render(
    gl,
    sp,
    attributes,
    meshList,
    calcProgramUniformList(state),
    calcMeshUniformList(state),
    textureList
  );

  window.requestAnimationFrame(loop(nextState(state)(timestamp)));
};

const nextState = state => timestamp => {
  const { pos, scale } = state;

  const angle = state.angle + 0.05;
  const rot = new Float32Array([angle, 0, angle * 0.2]);

  const eyePosition = Float32Array.of(
    20 * Math.sin(timestamp * 0.001),
    0,
    10
  );

  return { scale, rot, pos, angle, eyePosition };
};

const calcProgramUniformList = ({ eyePosition }) => {
  const projectionMatrix = Camera.perspective(Math.PI / 4, 1, 0.01, 1000);
  //let projectionMatrix = Camera.ortho(-10,10, -10, 10, 1, 100);
  let viewMatrix = Camera.lookAt(
    eyePosition,
    Float32Array.of(0, 0, -1),
    Float32Array.of(0, 1, 0)
  );

  return [
    {
      fn: (v, l) => gl.uniformMatrix4fv(l, false, v),
      value: projectionMatrix,
      location: gl.getUniformLocation(sp, 'uProjectionMatrix'),
    },
    {
      fn: (v, l) => gl.uniformMatrix4fv(l, false, v),
      value: viewMatrix,
      location: gl.getUniformLocation(sp, 'uViewMatrix'),
    },
    {
      fn: (v, l) => gl.uniform1i(l, v),
      value: 0,
      location: gl.getUniformLocation(sp, 'uTexture0'),
    },
    {
      fn: (v, l) => gl.uniform1i(l, v),
      value: 1,
      location: gl.getUniformLocation(sp, 'uTexture1'),
    },
  ];
};

const calcMeshUniformList = ({ scale, rot, pos }) => {
  const scaleMatrix = Transform.scale(Matrix.idendity(4), scale);

  const rotationXMatrix = Transform.rotate(Matrix.idendity(4), rot[X], xAxis);
  const rotationXYMatrix = Transform.rotate(rotationXMatrix, rot[Y], yAxis);
  const rotationMatrix = Transform.rotate(rotationXYMatrix, rot[Z], zAxis);

  const translateMatrix = Transform.translate(Matrix.idendity(4), pos);

  const modelMatrix = Matrix.multiply(
    Matrix.multiply(translateMatrix, rotationMatrix),
    scaleMatrix
  );

  return [
    [
      {
        fn: (v, l) => gl.uniformMatrix4fv(l, false, v),
        value: modelMatrix,
        location: gl.getUniformLocation(sp, 'uModelMatrix'),
      },
    ],
  ];
};

const initialState = {
  scale: new Float32Array([1, 1, 1]),
  pos: new Float32Array([0, 0, 0]),
  rot: new Float32Array([0, 0, 0]),
  angle: Math.PI / 6,
  eyePosition: new Float32Array([0, 0, 10]),
};

console.log('GLMath Version : ', GLMath.VERSION);
console.log('WEBGL Version : ', gl.getParameter(gl.VERSION));
window.requestAnimationFrame(loop(initialState));
