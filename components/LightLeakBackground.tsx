"use client";

// LightLeakBackground.jsx
// Self-contained animated light-leak background (raw WebGL, no dependencies).
// Drop into any React / Next / Vite project. Renders a fixed full-screen canvas
// behind your content. Three palettes: "clay" | "sun" | "dark".
//
//   <LightLeakBackground palette="clay" showToggle />
//
// Put your page content in normal elements after it; this sits at z-index -1.

import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeContext";

type PaletteKey = "clay" | "sun" | "dark" | "aurora" | "neon" | "matcha";

interface PaletteData {
  base: number[];
  sun: number[];
  text: string;
}

const PALETTES: Record<PaletteKey, PaletteData> = {
  clay: { base: [0.780, 0.455, 0.388], sun: [0.870, 0.640, 0.650], text: "#2a1a14" },
  sun:  { base: [0.870, 0.720, 0.500], sun: [0.990, 0.945, 0.840], text: "#3a2c12" },
  dark: { base: [0.020, 0.028, 0.058], sun: [0.620, 0.670, 0.850], text: "#e8ecf5" },
  aurora: { base: [0.015, 0.070, 0.060], sun: [0.950, 0.350, 0.650], text: "#e8f5f1" },
  neon:   { base: [0.070, 0.020, 0.100], sun: [0.980, 0.520, 0.180], text: "#f7e8f5" },
  matcha: { base: [0.720, 0.820, 0.750], sun: [0.850, 0.750, 0.920], text: "#202c25" },
};

const FRAG = `
precision highp float;
uniform vec2 u_res; uniform float u_time; uniform vec2 u_mouse;
uniform vec2 u_mouse2; uniform float u_energy; uniform vec3 u_base; uniform vec3 u_sun;

const float ANGLE=-0.72, FREQ=6.0, DENSITY=0.12, ELONG=2.0, BAND=1.15, BANDOFF=0.15,
            GAIN=1.15, SWAY=0.34, AMBIENT=0.40, TWINKLE=0.12, BREATHE=0.05;

float h21(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(h21(i),h21(i+vec2(1,0)),u.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),u.x),u.y); }
float fbm(vec2 p){ float v=0.0,a=0.5; for(int i=0;i<4;i++){v+=a*noise(p);p*=2.0;a*=0.5;} return v; }

void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  float aspect = u_res.x/u_res.y;
  vec2 p = vec2(uv.x*aspect, uv.y);
  vec2 c = vec2(uv.x*aspect - aspect*0.5, uv.y-0.5);

  float t = u_time*AMBIENT;
  float tw = u_time;

  vec2 w = vec2(fbm(p*1.3 + vec2(3.0,0.0)), fbm(p*1.3 + vec2(0.0,7.0)));
  vec2 g = (p + (w-0.5)*0.35)*FREQ;
  vec2 ic = floor(g);

  float light = 0.0;
  for(int ox=-2; ox<=2; ox++){
    for(int oy=-2; oy<=2; oy++){
      vec2 cc = ic + vec2(float(ox), float(oy));
      vec2 j = cc + 0.12 + 0.76*vec2(h21(cc*1.3+vec2(0.7,1.3)), h21(cc*5.7+vec2(4.1,2.3)));
      float ph = h21(cc+1.0)*6.2831;
      j += SWAY*vec2(
        sin(t + ph) + 0.5*sin(t*0.37 + ph*2.1),
        cos(t*0.8 + ph*1.3) + 0.5*cos(t*0.31 + ph*1.7)
      );
      float inten = clamp((h21(cc*2.1+9.0)-DENSITY)/(1.0-DENSITY), 0.0, 1.0);
      inten *= 1.0 - TWINKLE*(0.5+0.5*sin(tw*0.6 + ph));
      float rad = (0.18 + 0.26*h21(cc*8.1+vec2(2.2,2.2))) * (1.0 + 0.18*sin(t*0.9 + ph));
      float elong = ELONG + 1.4*h21(cc*3.3+vec2(6.6,6.6));
      float aj = ANGLE + (h21(cc*4.7+vec2(1.9,1.9))-0.5)*0.45;
      vec2 dv = g - j; float ce=cos(aj), se=sin(aj);
      float da = ce*dv.x - se*dv.y; float dc = se*dv.x + ce*dv.y;
      float d2 = (da/(rad*elong))*(da/(rad*elong)) + (dc/rad)*(dc/rad);
      light += inten*exp(-d2*2.8);
    }
  }
  light = clamp(light, 0.0, 1.0);
  light *= 0.85 + 0.25*fbm(p*5.0 + 11.0);

  mat2 R = mat2(cos(ANGLE),-sin(ANGLE), sin(ANGLE),cos(ANGLE));
  vec2 rc = R*c;
  float band = exp(-pow((rc.y+BANDOFF)*BAND, 2.0));
  light *= (0.35 + 0.95*band);

  light = clamp((light-0.06)/0.78, 0.0, 1.0);
  light = light*light*(3.0-2.0*light);
  light *= 1.0 + BREATHE*sin(u_time*0.35);
  light = clamp(light*GAIN, 0.0, 1.0);

  // premium cursor light: bloom + specular + trailing wake
  vec2 P = vec2(uv.x*aspect, uv.y);
  float CR = 0.34;
  float d1 = distance(P, u_mouse *vec2(aspect,1.0));
  float dW = distance(P, u_mouse2*vec2(aspect,1.0));
  float core = smoothstep(CR, 0.0, d1);
  float wake = smoothstep(CR*1.45, 0.0, dW);
  float field = core*0.7 + wake*0.45;
  float present = field * (0.30 + 0.70*u_energy);
  float leak = clamp(light, 0.0, 1.0);
  light = clamp(light*(1.0 + 0.16*present), 0.0, 1.0);

  vec3 col = mix(u_base, u_sun, clamp(light,0.0,1.0));
  col = mix(col, u_sun, present*leak*0.22);
  col += leak*present*0.06;

  // soft iridescent sheen on the leaks under the cursor
  float edge = light*(1.0-light)*4.0;
  float sheen = clamp(mix(leak, edge, 0.35), 0.0, 1.0);
  float phase = light*0.85 + u_time*0.05;
  vec3 irid = 0.5 + 0.5*cos(6.28318*(phase + vec3(0.0,0.33,0.67)));
  col += (irid-0.5) * sheen * present * 0.06;

  // fine grain
  col += (h21(gl_FragCoord.xy)-0.5)*0.035;
  col += (h21(uv + fract(u_time))-0.5)*0.008;
  gl_FragColor = vec4(col,1.0);
}`;

const VERT = "attribute vec2 a; void main(){ gl_Position = vec4(a,0.0,1.0); }";

const getResolvedTheme = (themeName: string): string => {
  if (themeName !== "auto") return themeName;
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      hour12: false,
    });
    const hour = parseInt(formatter.format(new Date()), 10);
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 17) return "day";
    if (hour >= 17 && hour < 22) return "evening";
    return "night";
  } catch {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 17) return "day";
    if (hour >= 17 && hour < 22) return "evening";
    return "night";
  }
};

const getPaletteFromTheme = (themeName: string): PaletteKey => {
  if (themeName === "aurora" || themeName === "neon" || themeName === "matcha") {
    return themeName;
  }
  const resolved = getResolvedTheme(themeName);
  switch (resolved) {
    case "morning":
    case "day":
      return "sun";
    case "evening":
      return "clay";
    case "night":
    default:
      return "dark";
  }
};

interface LightLeakBackgroundProps {
  palette?: string;
  showToggle?: boolean;
  height?: string;
  mask?: boolean;
}

export default function LightLeakBackground({
  palette = "clay",
  showToggle = false,
  height = "105vh",
  mask = true
}: LightLeakBackgroundProps) {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Resolve palette dynamically based on global app theme
  const resolvedPalette = getPaletteFromTheme(theme);
  const [pal, setPal] = useState<PaletteKey>(resolvedPalette);
  
  // Sync local palette state if prop or global theme changes
  useEffect(() => {
    setPal(resolvedPalette);
  }, [resolvedPalette]);

  const palRef = useRef(PALETTES[pal] || PALETTES.clay);

  useEffect(() => { 
    palRef.current = PALETTES[pal] || PALETTES.clay; 
  }, [pal]);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const gl = cv.getContext("webgl");
    if (!gl) return;

    const sh = (type: number, src: string): WebGLShader | null => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram();
    if (!prog) return;
    const vs = sh(gl.VERTEX_SHADER, VERT);
    const fs = sh(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog); gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U: Record<string, WebGLUniformLocation | null> = {};
    ["u_res","u_time","u_mouse","u_mouse2","u_energy","u_base","u_sun"]
      .forEach(n => U[n] = gl.getUniformLocation(prog, n));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.0);
      cv.width = window.innerWidth * dpr; cv.height = window.innerHeight * dpr;
      gl.viewport(0, 0, cv.width, cv.height);
    };
    resize(); window.addEventListener("resize", resize);

    const start = performance.now();
    let mx = 0.5, my = 0.5, mx2 = 0.5, my2 = 0.5, energy = 0.0;
    const onMove = (e: MouseEvent) => {
      const r = cv.getBoundingClientRect();
      const nx = (e.clientX - r.left)/r.width, ny = 1.0 - (e.clientY - r.top)/r.height;
      energy = Math.min(1.0, energy + Math.hypot(nx-mx, ny-my)*3.2);
      mx = nx; my = ny;
    };
    window.addEventListener("mousemove", onMove);

    let isVisible = false;
    let pageVisible = document.visibilityState === "visible";
    let reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    let raf: number | null = null;
    let lastFrame = 0;
    const cur = { base: [...palRef.current.base], sun: [...palRef.current.sun] };
    const lerp = (a: number, b: number, t: number) => a + (b-a)*t;

    const frame = (now: number) => {
      if (!isVisible || !pageVisible) return;
      if (mobileQuery.matches && !reduceMotion && now - lastFrame < 1000 / 30) {
        raf = requestAnimationFrame(frame);
        return;
      }
      lastFrame = now;
      const tgt = palRef.current;
      energy *= 0.96;
      mx2 = lerp(mx2, mx, 0.12); my2 = lerp(my2, my, 0.12);
      for (let i=0;i<3;i++){ cur.base[i]=lerp(cur.base[i],tgt.base[i],.08); cur.sun[i]=lerp(cur.sun[i],tgt.sun[i],.08); }
      gl.uniform2f(U.u_res, cv.width, cv.height);
      gl.uniform1f(U.u_time, (now-start)/1000);
      gl.uniform2f(U.u_mouse, mx, my);
      gl.uniform2f(U.u_mouse2, mx2, my2);
      gl.uniform1f(U.u_energy, energy);
      gl.uniform3fv(U.u_base, new Float32Array(cur.base));
      gl.uniform3fv(U.u_sun, new Float32Array(cur.sun));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = reduceMotion ? null : requestAnimationFrame(frame);
    };

    const stopLoop = () => {
      if (raf !== null) cancelAnimationFrame(raf);
      raf = null;
    };

    const startLoop = () => {
      stopLoop();
      if (isVisible && pageVisible) raf = requestAnimationFrame(frame);
    };

    const onVisibilityChange = () => {
      pageVisible = document.visibilityState === "visible";
      if (pageVisible) startLoop();
      else stopLoop();
    };

    const onMotionPreferenceChange = (event: MediaQueryListEvent) => {
      reduceMotion = event.matches;
      startLoop();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotionQuery.addEventListener("change", onMotionPreferenceChange);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const nextVisible = entry.isIntersecting;
        if (nextVisible && !isVisible) {
          isVisible = true;
          startLoop();
        } else if (!nextVisible && isVisible) {
          isVisible = false;
          stopLoop();
        }
      });
    }, { threshold: 0.01 });

    observer.observe(cv);

    return () => {
      stopLoop();
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotionQuery.removeEventListener("change", onMotionPreferenceChange);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef}
        style={{ 
          position: "absolute", 
          top: 0, 
          left: 0, 
          width: "100%", 
          height: height, 
          zIndex: -1, 
          display: "block",
          maskImage: mask ? "linear-gradient(to bottom, black 75%, transparent 100%)" : "none",
          WebkitMaskImage: mask ? "linear-gradient(to bottom, black 75%, transparent 100%)" : "none"
        }} />
      
      {/* Subtle but noticeable paper noise texture overlay */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: height,
          zIndex: -1,
          pointerEvents: "none",
          mixBlendMode: "overlay",
          opacity: 0.055,
          maskImage: mask ? "linear-gradient(to bottom, black 75%, transparent 100%)" : "none",
          WebkitMaskImage: mask ? "linear-gradient(to bottom, black 75%, transparent 100%)" : "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperNoise)'/%3E%3C/svg%3E")`
        }}
      />

      {showToggle && (
        <div style={{ position: "fixed", top: 22, left: "50%", transform: "translateX(-50%)", zIndex: 50,
                      display: "flex", gap: 4, padding: 5, borderRadius: 999,
                      background: "rgba(127,127,127,.16)", backdropFilter: "blur(10px)", pointerEvents: "auto" }}>
          {(Object.keys(PALETTES) as PaletteKey[]).map(k => (
            <button key={k} onClick={() => setPal(k)}
              style={{ border: 0, cursor: "pointer", fontWeight: 600, fontSize: 13,
                       padding: "7px 16px", borderRadius: 999,
                       color: PALETTES[pal]?.text || "#000",
                       background: pal === k ? "rgba(255,255,255,.26)" : "transparent",
                       opacity: pal === k ? 1 : .62 }}>
              {k[0].toUpperCase() + k.slice(1)}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
