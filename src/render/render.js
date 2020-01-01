const uniformAll = require('./uniformAll');
const bindTextures = require('./bindTextures');
const drawAll = require('./drawAll');

const render = gl => (
  shaderProgram,
  attributes,
  meshList,
  programUniformList,
  meshUniformList,
  textureList = []
) => {
  gl.useProgram(shaderProgram);

  uniformAll(programUniformList);

  bindTextures(gl, { textureList });

  drawAll(gl, { meshList, meshUniformList, attributes });
};

module.exports = render;
