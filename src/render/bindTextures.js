const bindTextures = gl => (textureList, offset = 0) => {
  textureList.forEach((texture, index) => {
    gl.activeTexture(gl.TEXTURE0 + index + offset);
    gl.bindTexture(gl.TEXTURE_2D, texture);
  });
};

module.exports = bindTextures;
