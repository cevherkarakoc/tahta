import draw from "./draw"

const render = (gl, shaderProgram, meshList, programUniformList, meshUniformList, textureList = []) => {
  gl.useProgram(shaderProgram)

  const attributesLocations = {
    position: gl.getAttribLocation(shaderProgram, 'aPosition'),
    texCoord: gl.getAttribLocation(shaderProgram, 'aTexCoord'),
  };

  programUniformList.forEach(uniform => uniform.fn(uniform.value, uniform.location))

  textureList.forEach((texture, index) => {
    gl.activeTexture(gl.TEXTURE0 + index );
    gl.bindTexture(gl.TEXTURE_2D, texture);
  })

  meshList.forEach((mesh, index) => {
    draw(gl, mesh, attributesLocations, meshUniformList[index]);
  });

};

module.exports = render;
