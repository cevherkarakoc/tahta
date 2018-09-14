const createShaderProgram = (gl, vertexShader, fragmentShader) => {
  const program = gl.createProgram();

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if ( !gl.getProgramParameter( program, gl.LINK_STATUS) ) {
    const info = gl.getProgramInfoLog(program);
    throw 'Could not compile WebGL program. \n\n' + info;
  }

  return program;
};

module.exports = createShaderProgram;