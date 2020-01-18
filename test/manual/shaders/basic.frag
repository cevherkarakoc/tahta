#version 300 es
precision mediump float;

uniform sampler2D uTexture0;
uniform sampler2D uTexture1;

in vec2 vTexCoord;

layout(location = 0) out vec4 outColor;
void main() {
  vec4 A = texture(uTexture0, vTexCoord);
  vec4 B = texture(uTexture1, vTexCoord);

  vec4 col = mix(A, B, B.a);
  col = mix(vec4(1.0, 1.0, 0.0, 1.0), col, col.a);

  outColor = col;
}