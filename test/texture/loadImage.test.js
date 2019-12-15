const assert = require('assert');

const loadImage = require('../../src/texture/loadImage');

const test = () => {
  describe('loadImage Function', function() {
    let imageSrc = 'textureA.png';
    let image;

    before(function() {
      return loadImage('./' + imageSrc).then(function(img) {
        image = img;
      });
    });

    it('should return a HTML image element', function() {
      assert.equal(image.nodeName, 'IMG');
    });

    it('should return the image with sended src', function() {
      assert.equal(image.src.split('/').pop(), imageSrc);
    });

    it('should return a loaded image', function() {
      assert.equal(image.complete, true);
    });
  });
};

export default test;
