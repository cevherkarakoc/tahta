precision mediump float;

attribute vec2 aPosition;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;

void main() {
  gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aPosition, 0.0, 1.0);
}