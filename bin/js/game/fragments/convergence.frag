precision mediump float;
uniform float rand;
uniform vec4 dimensions;
uniform sampler2D uSampler;
varying vec2 vTextureCoord;
void main (void)
{
   vec4 col = texture2D(uSampler, vTextureCoord);
   vec4 col_r = texture2D(uSampler, vTextureCoord + vec2((+25.5 / dimensions.x) * rand, 0));
   vec4 col_l = texture2D(uSampler, vTextureCoord + vec2((.0 / dimensions.x) * rand, 0));
   vec4 col_g = texture2D(uSampler, vTextureCoord + vec2((-25.5 / dimensions.x) * rand, 0));
   col.g = col.g + col_l.g * max(1.0, sin(vTextureCoord.y * dimensions.y * 1.2) * 2.5) * rand;
   col.g = col.g + col_r.g * max(1.0, sin(vTextureCoord.y * dimensions.y * 1.2) * 2.5) * rand;
   col.g = col.g + col_g.g * max(1.0, sin(vTextureCoord.y * dimensions.y * 1.2) * 2.5) * rand;
   gl_FragColor.rgba = col.rgba;
}