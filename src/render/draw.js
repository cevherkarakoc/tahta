const uniformAll = require('./uniformAll');

const draw = (gl, mesh, uniformList) => {
  gl.bindVertexArray(mesh.vao);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);

  uniformAll(uniformList);

  gl.drawElements(mesh.drawMode, mesh.vertexCount, gl.UNSIGNED_SHORT, 0);
};

module.exports = draw;
