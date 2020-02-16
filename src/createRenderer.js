const createShader = require('./renderer/create/shader');
const createShaderProgram = require('./renderer/create/shaderProgram');
const createMesh = require('./renderer/create/mesh');
const createTexture = require('./renderer/create/texture');
const createRenderTarget = require('./renderer/create/renderTarget');

const target = require('./renderer/target');
const drawAll = require('./renderer/drawAll');
const bindTextures = require('./renderer/bindTextures');
const render = require('./renderer/render');

const createRenderer = (canvas, contextAttributes = {}) => {
    const gl = canvas.getContext('webgl2', contextAttributes);

    return {
        canvas,
        gl,
        target: target(gl),
        bindTextures: bindTextures(gl),
        drawAll: drawAll(gl),
        render: render(gl),
        Create: {
            shader : createShader(gl),
            shaderProgram : createShaderProgram(gl),
            mesh : createMesh(gl),
            texture : createTexture(gl),
            renderTarget: createRenderTarget(gl),
        }
    };
  };
  
  module.exports = createRenderer;
  