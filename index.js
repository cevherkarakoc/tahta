exports.render = require('./src/render');
exports.createShader = require('./src/createShader');
exports.createShaderProgram = require('./src/createShaderProgram');
exports.createMesh = require('./src/createMesh');

exports.loadImage = require('./src/texture/loadImage');
exports.createTexture = require('./src/texture/createTexture');

exports.initTahta = gl => ({
  render: exports.render(gl),
  createShader: exports.createShader(gl),
  createShaderProgram: exports.createShaderProgram(gl),
  createMesh: exports.createMesh(gl),
  createTexture: exports.createTexture(gl),
});
