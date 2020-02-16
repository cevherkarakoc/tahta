const assert = require('assert').strict;

const createTexture = require('../../../src/renderer/create/texture');

const test = () => {
  const canvas = document.querySelector('#webgl-canvas');
  const gl = canvas.getContext('webgl2');
  let image;

  describe('createTexture Function', function() {
    before(function() {
      return new Promise((resolve, reject) => {
        image = new Image();

        image.onload = () => {
          resolve(image);
        };

        image.src = 'manual/textures/textureA.png';
      });
    });

    it('should return a Texture', function() {
      const texture = createTexture(gl)(image, true);

      assert.equal(gl.isTexture(texture), true);
    });
  });
};

export default test;
