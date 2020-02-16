const assert = require('assert').strict;

const createRenderTarget = require('../../../src/renderer/create/renderTarget');

const test = () => {
  const canvas = document.querySelector('#webgl-canvas');
  const gl = canvas.getContext('webgl2');

  describe('createRenderTarget Function', function () {
    const width = 400;
    const height = 600;

    const renderTarget = createRenderTarget(gl)(
      width,
      height,
      { point: gl.COLOR_ATTACHMENT0, internalformat: gl.RGBA, format: gl.RGBA, type: gl.UNSIGNED_BYTE },
      { point: gl.COLOR_ATTACHMENT1 }
    );

    it('should return the same width', function () {
      assert.equal(renderTarget.width, width);
    });

    it('should return the same height', function () {
      assert.equal(renderTarget.height, height);
    });

    it('should return textures', function () {
      assert.equal(gl.isTexture(renderTarget.textures[0]), true);
      assert.equal(gl.isTexture(renderTarget.textures[1]), true);
    });

    it('should return a completed frame buffer', function () {
      assert.equal(gl.isFramebuffer(renderTarget.frameBuffer), true);
      assert.equal(
        gl.checkFramebufferStatus(gl.FRAMEBUFFER),
        gl.FRAMEBUFFER_COMPLETE
      );
    });
  });
};

export default test;
