precision mediump float; //Define the precision

//We pass in a time variable
uniform float     time;
//The image we passed in
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;//The mask
uniform vec2      resolution;

float waveSize = 5.0;
float amplitude = 0.04;

void main( void ) {

	vec2 uv = gl_FragCoord.xy / resolution.xy;
	uv.y = 1.0-uv.y;//Flip image vertically

	vec4 maskColor = texture2D(iChannel1, uv);
  float waterPower = 1.0 - (maskColor.r * maskColor.g * maskColor.b);

	float X = uv.x * waveSize+time;
  float Y = uv.y * waveSize+time;
	
  float Xoffset = cos(X-Y)*amplitude*cos(Y);
  float Yoffset = sin(X+Y)*amplitude*sin(Y);
  
 	
  uv.x += Xoffset* waterPower;
  uv.y += Yoffset * waterPower;
  gl_FragColor =  texture2D(iChannel0, uv);
  gl_FragColor.b *= (waterPower +1.0);
  
  
	
 }