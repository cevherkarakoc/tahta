const assert = require('assert').strict;

const createRenderTarget = require('../../src/render/createRenderTarget');

const test = () => {
  const canvas = document.querySelector('#webgl-canvas');
  const gl = canvas.getContext('webgl');

  describe('createRenderTarget Function', function() {
    const width = 400;
    const height = 600;

    const renderTarget = createRenderTarget(gl)(width, height);

    it('should return the same width', function() {
      assert.equal(renderTarget.width, width);
    });

    it('should return the same height', function() {
      assert.equal(renderTarget.height, height);
    });

    it('should return a texture', function() {
      assert.equal(gl.isTexture(renderTarget.texture), true);
    });

    it('should return a completed frame buffer', function() {
      assert.equal(gl.isFramebuffer(renderTarget.frameBuffer), true);
      assert.equal(
        gl.checkFramebufferStatus(gl.FRAMEBUFFER),
        gl.FRAMEBUFFER_COMPLETE
      );
    });
  });
};

export default test;
