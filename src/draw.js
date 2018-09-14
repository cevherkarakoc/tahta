const draw = (gl, mesh, attributesLocations, uniformList) => {
  gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer);

  gl.vertexAttribPointer(
    attributesLocations.position,
    2,
    gl.FLOAT,
    false,
    0,
    0
  );

  gl.enableVertexAttribArray(attributesLocations.position);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);

  uniformList.forEach(uniform => uniform.fn(uniform.value));

  gl.drawElements(gl.TRIANGLES, mesh.vertexCount, gl.UNSIGNED_SHORT, 0);

};

module.exports = draw;
