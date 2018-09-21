const assert = require('assert');

const createShader = require('../src/createShader');

const test = () => {
  const canvas = document.querySelector("#webgl-canvas");
  const gl = canvas.getContext("webgl");

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


  describe('createShader Function', function () {
    describe('for Vertex Shader', function () {
      const shader = createShader(gl, gl.VERTEX_SHADER, vsSource);

      it('should return a compiled shader', function () {
        assert.equal(gl.getShaderParameter(shader, gl.COMPILE_STATUS), true);
      });

      it('should return a vertex shader', function () {
        assert.equal(gl.getShaderParameter(shader, gl.SHADER_TYPE), gl.VERTEX_SHADER);
      });
    });

    describe('for Fragment Shader', function () {
      const shader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

      it('should return a compiled shader', function () {
        assert.equal(gl.getShaderParameter(shader, gl.COMPILE_STATUS), true);
      });

      it('should return a fragment shader', function () {
        assert.equal(gl.getShaderParameter(shader, gl.SHADER_TYPE), gl.FRAGMENT_SHADER);
      });
    });
  });
}

export default test;