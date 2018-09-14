import {mocha} from "mocha";
import test_createMesh   from "./createMesh.test.js";
import test_createShader from "./createShader.test.js";
import test_createShaderProgram from "./createShaderProgram.test.js";

mocha.setup({
  ui: 'bdd',
  ignoreLeaks: true
});

test_createMesh();
test_createShader();
test_createShaderProgram();

mocha.run();