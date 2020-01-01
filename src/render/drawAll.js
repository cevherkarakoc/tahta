const draw = require('./draw');

const drawAll = gl => (meshList, meshUniformList, attributes = []) => {
  meshList.forEach((mesh, index) => {
    draw(gl, mesh, attributes, meshUniformList[index]);
  });
};

module.exports = drawAll;
