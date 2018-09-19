precision mediump float;

uniform sampler2D uTexture0;
uniform sampler2D uTexture1;

varying vec2 vTexCoord;
void main() {
  //gl_FragColor = vec4(vTexCoord.x, vTexCoord.y,0.0,1.0);
  vec4 A = texture2D(uTexture0, vTexCoord);
  vec4 B = texture2D(uTexture1, vTexCoord);

  vec4 col = mix(A, B, B.a);
  col = mix(vec4(1.0, 1.0, 0.0, 1.0), col, col.a);

  gl_FragColor = col;
}