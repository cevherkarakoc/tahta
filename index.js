exports.createShader = require('./src/createShader');
exports.createShaderProgram = require('./src/createShaderProgram');
exports.createMesh = require('./src/createMesh');

/* Render */
exports.render = require('./src/render/render');
exports.createRenderTarget = require('./src/render/createRenderTarget');
exports.target = require('./src/render/target');

exports.uniformAll = require('./src/render/uniformAll');
exports.bindTextures = require('./src/render/bindTextures');
exports.drawAll = require('./src/render/drawAll');
/* Render END*/

/* Texture */
exports.loadImage = require('./src/texture/loadImage');
exports.createTexture = require('./src/texture/createTexture');
/* Texture END*/

exports.initTahta = gl => ({
  render: exports.render(gl),
  createRenderTarget: exports.createRenderTarget(gl),
  target: exports.target(gl),
  bindTextures: exports.bindTextures(gl),
  drawAll: exports.drawAll(gl),

  createShader: exports.createShader(gl),
  createShaderProgram: exports.createShaderProgram(gl),
  createMesh: exports.createMesh(gl),

  createTexture: exports.createTexture(gl),
});
