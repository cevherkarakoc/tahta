const draw = (gl, mesh, attributes, uniformList) => {
  attributes.forEach(attribute => {
    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.attributeBuffers[attribute.name]);
    gl.enableVertexAttribArray(attribute.location);
    gl.vertexAttribPointer(
      attribute.location,
      attribute.size,
      attribute.type,
      attribute.normalized,
      attribute.stride,
      attribute.offset
    );
  });

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);

  uniformList.forEach(uniform => uniform.fn(uniform.value, uniform.location));

  gl.drawElements(mesh.drawMode, mesh.vertexCount, gl.UNSIGNED_SHORT, 0);
};

module.exports = draw;
