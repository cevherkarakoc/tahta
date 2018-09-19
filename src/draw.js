const draw = (gl, mesh, attributesLocations, uniformList) => {
  gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer);

  gl.vertexAttribPointer(
    attributesLocations.position,
    3,
    gl.FLOAT,
    false,
    0,
    0
  );

  gl.enableVertexAttribArray(attributesLocations.position);

  gl.bindBuffer(gl.ARRAY_BUFFER, mesh.texCoordBuffer);

  gl.vertexAttribPointer(
    attributesLocations.texCoord,
    2,
    gl.FLOAT,
    false,
    0,
    0
  );

  gl.enableVertexAttribArray(attributesLocations.texCoord);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);

  uniformList.forEach(uniform => uniform.fn(uniform.value, uniform.location));

  gl.drawElements(gl.TRIANGLES, mesh.vertexCount, gl.UNSIGNED_SHORT, 0);
};

module.exports = draw;
