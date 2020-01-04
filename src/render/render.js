const uniformAll = require('./uniformAll');
const bindTextures = require('./bindTextures');
const drawAll = require('./drawAll');

const render = gl => {
  const _bindTextures = bindTextures(gl);
  const _drawAll = drawAll(gl);

  return ({
    shaderProgram,
    programUniforms,
    meshes,
    meshUniforms,
    attributes = [],
    textures = [],
    textureOffset = 0,
  }) => {
    gl.useProgram(shaderProgram);

    uniformAll(programUniforms);

    _bindTextures(textures, textureOffset);

    _drawAll(meshes, meshUniforms, attributes);
  };
};

module.exports = render;
