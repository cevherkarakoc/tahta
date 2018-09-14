const assert = require('assert');

const createMesh = require('../src/createMesh');

const test = () => {
  const canvas = document.querySelector("#webgl-canvas");
  const gl = canvas.getContext("webgl");

  describe('createMesh Function', function () {
    const vertices = new Float32Array([
      -1.0, 1.0,
      1.0, 1.0,
      -1.0, -1.0,
      1.0, -1.0,
    ]);
    const indices = new Uint16Array([0, 1, 3, 0, 3, 2]);

    const the_mesh = createMesh(gl, vertices, indices)

    it('should return vertex buffer', function () {
      assert.equal(gl.isBuffer(the_mesh.vertexBuffer), true);
    });

    it('should return index buffer', function () {
      assert.equal(gl.isBuffer(the_mesh.indexBuffer), true);
    });

    it('should return vertex count', function () {
      assert.equal(the_mesh.vertexCount, 6);
    });
  });
}

export default test;