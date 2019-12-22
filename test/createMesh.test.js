const assert = require('assert');

const createMesh = require('../src/createMesh');

const test = () => {
  const canvas = document.querySelector('#webgl-canvas');
  const gl = canvas.getContext('webgl');

  describe('createMesh Function', function() {
    const vertices = new Float32Array([-1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0]);
    const indices = new Uint16Array([0, 1, 3, 0, 3, 2]);

    const texCoord = new Float32Array([0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0]);

    const the_mesh = createMesh(gl)({ vertices, texCoord }, indices, gl.TRIANGLES);

    it('should return index buffer', function() {
      assert.equal(gl.isBuffer(the_mesh.indexBuffer), true);
    });

    it('should return vertex buffer', function() {
      assert.equal(gl.isBuffer(the_mesh.attributeBuffers.vertices), true);
    });

    it('should return texture coordinates buffer', function() {
      assert.equal(gl.isBuffer(the_mesh.attributeBuffers.texCoord), true);
    });

    it('should return vertex count', function() {
      assert.equal(the_mesh.vertexCount, 6);
    });
  });
};

export default test;
