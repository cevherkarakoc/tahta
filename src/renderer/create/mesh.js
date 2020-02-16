const createMesh = gl => (attributes, buffersData, indices, drawMode) => {
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  attributes.forEach(attribute => {
    const attribBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, attribBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, buffersData[attribute.name], gl.STATIC_DRAW);


    gl.enableVertexAttribArray(attribute.location);
    gl.bindBuffer(gl.ARRAY_BUFFER, attribBuffer);
    gl.vertexAttribPointer(
      attribute.location,
      attribute.size,
      attribute.type,
      attribute.normalized,
      attribute.stride,
      attribute.offset
    );
  });

  return {
    vao: vao,
    indexBuffer: indexBuffer,
    vertexCount: indices.length,
    drawMode,
  };
};

module.exports = createMesh;
