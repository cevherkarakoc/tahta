const assert = require('assert').strict;

const createShaderProgram = require('../src/createShaderProgram');

const test = () => {
  const canvas = document.querySelector('#webgl-canvas');
  const gl = canvas.getContext('webgl2');

  const vsSource = `
    void main() {
      gl_Position = vec4(1.0);
    }
  `;

  const fsSource = `
    void main() {
      gl_FragColor = vec4(1.0);
    }
  `;

  const vertexShader = gl.createShader(gl.VERTEX_SHADER);

  gl.shaderSource(vertexShader, vsSource);
  gl.compileShader(vertexShader);

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(fragmentShader, fsSource);
  gl.compileShader(fragmentShader);

  const program = createShaderProgram(gl)(vertexShader, fragmentShader);

  describe('createShaderProgram Function', function() {
    it('should return a linked program', function() {
      assert.equal(gl.getProgramParameter(program, gl.LINK_STATUS), true);
    });

    it('should return a program with 2 attached shader', function() {
      assert.equal(gl.getProgramParameter(program, gl.ATTACHED_SHADERS), 2);
    });
  });
};

export default test;
