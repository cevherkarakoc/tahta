const target = gl => renderTarget => {
  gl.bindFramebuffer(gl.FRAMEBUFFER, renderTarget.frameBuffer);
  gl.viewport(0, 0, renderTarget.width, renderTarget.height);
};

module.exports = target;
