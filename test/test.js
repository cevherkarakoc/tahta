import { mocha } from 'mocha';

import test_createMesh from './renderer/create/mesh.test.js';
import test_createShader from './renderer/create/shader.test.js';
import test_createShaderProgram from './renderer/create/shaderProgram.test.js';
import test_createTexture from './renderer/create/texture.test.js';
import test_createRenderTarget from './renderer/create/renderTarget.test.js';

import test_uniformAll from './renderer/uniformAll.test.js';

mocha.setup({
  ui: 'bdd',
  ignoreLeaks: true,
});

describe('Creating Functions', function () {
  test_createShader();
  test_createShaderProgram();
  test_createMesh();
  test_createTexture();
  test_createRenderTarget();

});

describe('Rendering Functions', function () {
  test_uniformAll();
});

mocha.run();
