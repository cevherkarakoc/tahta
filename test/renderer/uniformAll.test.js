const assert = require('assert').strict;

const uniformAll = require('../../src/renderer/uniformAll');

const test = () => {
  const canvas = document.querySelector('#webgl-canvas');
  const gl = canvas.getContext('webgl2');

  describe('uniformAll Function', function() {
    const UNIFORM_VECTOR = 'uVector';
    const UNIFORM_MATRIX = 'uMatrix';

    const vsSource = `
      uniform vec3 ${UNIFORM_VECTOR};
      uniform mat2 ${UNIFORM_MATRIX};
      void main() {
        float a = ${UNIFORM_MATRIX}[0].x;
        gl_Position = vec4(${UNIFORM_VECTOR}, a);
      } 
    `;

    const fsSource = `
      void main() {
        gl_FragColor = vec4(1, 0, 0, 1);
      }
    `;

    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vsSource);
    gl.compileShader(vs);

    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fsSource);
    gl.compileShader(fs);

    const program = gl.createProgram();

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    gl.useProgram(program);

    const uniformVector = {
      value: Float32Array.of(3, 5, 7),
      location: gl.getUniformLocation(program, UNIFORM_VECTOR),
    };

    const uniformMatrix = {
      value: Float32Array.of(9, 7, 3, 5),
      location: gl.getUniformLocation(program, UNIFORM_MATRIX),
    };

    const uniformList = [
      {
        fn: (v, l) => gl.uniform3fv(l, v),
        value: uniformVector.value,
        location: uniformVector.location,
      },

      {
        fn: (v, l) => gl.uniformMatrix2fv(l, false, v),
        value: uniformMatrix.value,
        location: uniformMatrix.location,
      },
    ];

    uniformAll(uniformList);

    it('should set "uVector" to "vec3(3, 5, 7)" ', function() {
      const uniformValue = gl.getUniform(program, uniformVector.location);

      assert.deepEqual(uniformValue, uniformVector.value);
    });

    it('should set "uMatrix" to "mat2(9, 7, 3, 5)" ', function() {
      const uniformValue = gl.getUniform(program, uniformMatrix.location);

      assert.deepEqual(uniformValue, uniformMatrix.value);
    });
  });
};

export default test;
