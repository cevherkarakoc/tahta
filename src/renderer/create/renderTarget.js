const createRenderTarget = gl => (width, height, ...attachments) => {
  const frameBuffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);

  const textures = attachments.map(attachment => {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    attachment.format = attachment.format || gl.RGBA;
    attachment.internalformat = attachment.internalformat || attachment.format;
    attachment.type = attachment.type || gl.UNSIGNED_BYTE;

    gl.texImage2D(gl.TEXTURE_2D, 0, attachment.internalformat, width, height, 0, attachment.format, attachment.type, null);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.framebufferTexture2D(gl.FRAMEBUFFER, attachment.point, gl.TEXTURE_2D, texture, 0);

    return texture;
  })

  return {
    frameBuffer,
    attachments,
    textures,
    height,
    width,
  };
};

module.exports = createRenderTarget;
