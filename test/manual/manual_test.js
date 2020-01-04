import GLMath, { Vector, Matrix } from 'webgl-math';

import { initTahta } from '../../index';

import vsSource from './shaders/basic.vert';
import fsSource from './shaders/basic.frag';

const canvas = document.querySelector('#webgl-canvas-manual');
const gl = canvas.getContext('webgl2', { premultipliedAlpha: false });

const canvas2d = document.querySelector('#webgl-canvas2d');
const ctx2d = canvas2d.getContext('2d');
const imgElm = document.querySelector('#the-image');

const {
  render,
  createRenderTarget,
  target,
  createShader,
  createShaderProgram,
  createMesh,
  createTexture,
  drawAll,
} = initTahta(gl);

gl.clearColor(0.1, 0.1, 0.1, 0.0);
gl.frontFace(gl.CCW);

// Create a shader program
const vertex = createShader(gl.VERTEX_SHADER, vsSource);
const fragment = createShader(gl.FRAGMENT_SHADER, fsSource);
const sp = createShaderProgram(vertex, fragment);

// Create a mesh
const vertices = new Float32Array([-1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, 1.0, 0.0]);
const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);

const texCoord = new Float32Array([0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0]);

const square = createMesh({ vertices, texCoord }, indices, gl.TRIANGLES);

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
    offset: 0,
  },
  {
    name: 'texCoord',
    location: gl.getAttribLocation(sp, 'aTexCoord'),
    size: 2,
    type: gl.FLOAT,
    normalized: false,
    stride: 0,
    offset: 0,
  },
];

// Load textures
const textureList = [
  createTexture(document.getElementById('texA'), true),
  createTexture(document.getElementById('texB'), true),
];

const { Transform, Camera } = Matrix;

const X = 0,
  Y = 1,
  Z = 2,
  W = 3;
const xAxis = Float32Array.of(1, 0, 0);
const yAxis = Float32Array.of(0, 1, 0);
const zAxis = Float32Array.of(0, 0, 1);

const renderTargets = {
  main: {
    width: canvas.width,
    height: canvas.height,
  },
  other: createRenderTarget(256, 256),
};

const loop = state => timestamp => {
  target(renderTargets.main);

  gl.clear(gl.COLOR_BUFFER_BIT);
  render({
    shaderProgram: sp,
    programUniforms: calcProgramUniformList(state),
    meshes: meshList,
    meshUniforms: calcMeshUniformList(state),
    attributes: attributes,
    textures: textureList,
  });

  target(renderTargets.other);

  gl.clear(gl.COLOR_BUFFER_BIT);
  drawAll(meshList, calcMeshUniformList(state), attributes);

  var bfdt = new Uint8Array(256 * 256 * 4);
  gl.readPixels(0, 0, 256, 256, gl.RGBA, gl.UNSIGNED_BYTE, bfdt);

  var imageData = ctx2d.createImageData(256, 256);
  imageData.data.set(bfdt);
  ctx2d.putImageData(imageData, 0, 0);

  imgElm.src = canvas2d.toDataURL();

  window.requestAnimationFrame(loop(nextState(state)(timestamp)));
};

const nextState = state => timestamp => {
  const { step } = state;

  const angle = state.angle + 0.05;
  const rot = new Float32Array([angle, 0, angle * 0.2]);

  const eyePosition = Float32Array.of(20 * Math.sin(timestamp * 0.001), 0, 10);

  return { ...state, rot, angle, eyePosition, step: step + 1 };
};

const calcProgramUniformList = ({ eyePosition }) => {
  const projectionMatrix = Camera.perspective(Math.PI / 4, 1, 0.01, 1000);
  //let projectionMatrix = Camera.ortho(-10,10, -10, 10, 1, 100);
  let viewMatrix = Camera.lookAt(eyePosition, Float32Array.of(0, 0, -1), Float32Array.of(0, 1, 0));

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

  const modelMatrix = Matrix.multiply(Matrix.multiply(translateMatrix, rotationMatrix), scaleMatrix);

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
  step: 0,
};

console.log('GLMath Version : ', GLMath.VERSION);
console.log('WEBGL Version : ', gl.getParameter(gl.VERSION));
window.requestAnimationFrame(loop(initialState));
