const createTexture = gl => (image, mipmap = false) => {
  const texture = gl.createTexture();

  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  if (mipmap) gl.generateMipmap(gl.TEXTURE_2D);

  // Texture Parameters ???

  return texture;
};

module.exports = createTexture;
