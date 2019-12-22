const createMesh = gl => (attributes, indices, drawMode) => {
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  const attributeBuffers = {};
  for (const [name, data] of Object.entries(attributes)) {
    const attribBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, attribBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    attributeBuffers[name] = attribBuffer;
  }

  return {
    attributeBuffers: attributeBuffers,
    indexBuffer: indexBuffer,
    vertexCount: indices.length,
    drawMode,
  };
};

module.exports = createMesh;
