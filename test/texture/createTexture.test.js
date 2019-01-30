const assert = require('assert');

const createTexture = require('../../src/texture/createTexture');

const test = () => {
  const canvas = document.querySelector("#webgl-canvas");
  const gl = canvas.getContext("webgl");
  let image;

  describe('createTexture Function', function () {
    before( function() {
      return new Promise((resolve, reject) => {
        image = new Image();
    
        image.onload = () => {
          resolve(image);
        };
    
        image.src = 'textureA.png';
      })
    });

    it('should return a Texture', function () {
      const texture = createTexture(gl, image, true);

      assert.equal(gl.isTexture(texture), true);
    });
  });
}

export default test;