export const drawFrag = `
precision mediump float;

uniform sampler2D u_wind;
uniform vec2 u_wind_min;
uniform vec2 u_wind_max;
uniform sampler2D u_color_ramp;

varying vec2 v_particle_pos;

void main() {
    vec2 velocity = mix(u_wind_min, u_wind_max, texture2D(u_wind, v_particle_pos).rg);
    float speed_t = length(velocity) / length(u_wind_max);

    // color ramp is encoded in a 16x16 texture
    vec2 ramp_pos = vec2(
        fract(16.0 * speed_t),
        floor(16.0 * speed_t) / 16.0);

    vec4 color = texture2D(u_color_ramp, ramp_pos);
    float factor = clamp(speed_t * 42.0, 0.0, 1.0);

    // lookup value to mask in b channel
    float b = texture2D(u_wind, v_particle_pos).b;
    bool mask = b < 1.0;

    color = color * float(!mask);
    // color = color * factor * float(!mask); // factor dims low-speed particles
    gl_FragColor = color;
}
`;
