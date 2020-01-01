const assert = require('assert').strict;

const loadImage = require('../../src/texture/loadImage');

const test = () => {
  describe('loadImage Function', function() {
    let rootPath = 'manual/textures/';
    let imageSrc = 'textureA.png';
    let image;

    before(function() {
      return loadImage(rootPath + imageSrc).then(function(img) {
        image = img;
      });
    });

    it('should return a HTML image element', function() {
      assert.equal(image.nodeName, 'IMG');
    });

    it('should return the image with passed src', function() {
      assert.equal(image.src.split('/').pop(), imageSrc);
    });

    it('should return a loaded image', function() {
      assert.equal(image.complete, true);
    });
  });
};

export default test;
