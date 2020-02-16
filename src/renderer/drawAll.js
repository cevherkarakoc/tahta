const draw = require('./draw');

const drawAll = gl => (meshList, meshUniformList) => {
  meshList.forEach((mesh, index) => {
    draw(gl, mesh, meshUniformList[index]);
  });
};

module.exports = drawAll;
