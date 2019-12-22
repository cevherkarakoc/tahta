const draw = require('./draw');

const render = gl => (shaderProgram, attributes, meshList, programUniformList, meshUniformList, textureList = []) => {
  gl.useProgram(shaderProgram);

  programUniformList.forEach(uniform => uniform.fn(uniform.value, uniform.location));

  textureList.forEach((texture, index) => {
    gl.activeTexture(gl.TEXTURE0 + index);
    gl.bindTexture(gl.TEXTURE_2D, texture);
  });

  meshList.forEach((mesh, index) => {
    draw(gl, mesh, attributes, meshUniformList[index]);
  });
};

module.exports = render;
