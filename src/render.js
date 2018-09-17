import draw from "./draw"

const render = (gl, shaderProgram, meshList, programUniformList, meshUniformList) => {
  gl.useProgram(shaderProgram)

  const attributesLocations = {
    position: gl.getAttribLocation(shaderProgram, 'aPosition')
  };

  programUniformList.forEach(uniform => uniform.fn(uniform.value, uniform.location))

  meshList.forEach((mesh, index) => {
    draw(gl, mesh, attributesLocations, meshUniformList[index]);
  });

};

module.exports = render;
