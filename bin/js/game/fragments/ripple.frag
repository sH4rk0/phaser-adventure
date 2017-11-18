precision mediump float;
uniform vec4 resolution;
uniform float     time;                 // shader playback time (in seconds)
uniform vec4      mouse;                // mouse pixel coords. xy: current (if MLB down), zw: click
uniform sampler2D  uSampler;


void main(void) {

    vec2 uv = gl_FragCoord.xy / resolution.xy;
	
	float w = (0.5 - (uv.x)) * (resolution.x / resolution.y);
    float h = 0.5 - uv.y;
	float distanceFromCenter = sqrt(w * w + h * h);
	
	float sinArg = distanceFromCenter * 5.0 - time * 5.0;
	float slope = cos(sinArg) ;
	vec4 color = texture2D(uSampler, uv + normalize(vec2(w, h)) * slope * 0.05);
	
	gl_FragColor = color;

}