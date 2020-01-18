const assert = require('assert').strict;

const createMesh = require('../src/createMesh');

const test = () => {
  const canvas = document.querySelector('#webgl-canvas');
  const gl = canvas.getContext('webgl2');

  describe('createMesh Function', function() {
    const vertices = new Float32Array([-1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0]);
    const indices = new Uint16Array([0, 1, 3, 0, 3, 2]);

    const texCoord = new Float32Array([0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0]);

    const attributes = [
      {
        name: 'aPosition',
        location: 0,
        size: 3,
        type: gl.FLOAT,
        normalized: false,
        stride: 0,
        offset: 0,
      },
      {
        name: 'aTexCoord',
        location: 1,
        size: 2,
        type: gl.FLOAT,
        normalized: false,
        stride: 0,
        offset: 0,
      },
    ];

    const the_mesh = createMesh(gl)(attributes, { aPosition : vertices, aTexCoord : texCoord }, indices, gl.TRIANGLES);

    it('should return index buffer', function() {
      assert.equal(gl.isBuffer(the_mesh.indexBuffer), true);
    });

    it('should return Vertex Array Object', function() {
      assert.equal(gl.isVertexArray(the_mesh.vao), true);
    });

    it('should return vertex count', function() {
      assert.equal(the_mesh.vertexCount, 6);
    });
  });
};

export default test;
