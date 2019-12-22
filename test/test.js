import { mocha } from 'mocha';
import test_createMesh from './createMesh.test.js';
import test_createShader from './createShader.test.js';
import test_createShaderProgram from './createShaderProgram.test.js';

import test_loadImage from './texture/loadImage.test.js';
import test_createTexture from './texture/createTexture.test.js';

import test_createRenderTarget from './render/createRenderTarget.test.js';

mocha.setup({
  ui: 'bdd',
  ignoreLeaks: true,
});

test_createMesh();
test_createShader();
test_createShaderProgram();

describe('Texture Related Functions', function() {
  test_loadImage();
  test_createTexture();
});

describe('Rendering Related Functions', function() {
  test_createRenderTarget();
});

mocha.run();
