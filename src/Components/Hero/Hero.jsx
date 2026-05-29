import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";
import "./Hero.css";
import video from "../../assets/logo.mp4";
import {
  FiArrowRight,
  FiAward,
  FiBox,
  FiCamera,
  FiCpu,
  FiFilm,
  FiLayers,
  FiMail,
  FiMonitor,
  FiPlayCircle,
  FiSend,
} from "react-icons/fi";

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);

const createMountain = ({ side = 1, width = 15, depth = 13, color = 0x081326 }) => {
  const geometry = new THREE.PlaneGeometry(width, depth, 120, 82);
  geometry.rotateX(-Math.PI / 2);

  const positions = geometry.attributes.position;
  const colors = [];
  const dark = new THREE.Color(0x020818);
  const blue = new THREE.Color(0x0b55aa);
  const ice = new THREE.Color(0x48a9ff);

  for (let i = 0; i < positions.count; i += 1) {
    const x = positions.getX(i);
    const z = positions.getZ(i);
    const slopeSide = side < 0 ? -1 : 1;
    const valleyFalloff = Math.max(0, 1 - Math.abs(x - slopeSide * width * 0.1) / (width * 0.62));
    const backLift = Math.max(0, (-z + depth * 0.4) / depth);
    const mainRidge = Math.exp(-Math.abs(x - slopeSide * width * 0.22) * 0.34);
    const secondaryRidge = Math.exp(-Math.abs(x + slopeSide * width * 0.28) * 0.5) * 0.55;
    const grain = Math.sin(x * 1.8 + z * 0.7) * 0.2 + Math.sin(x * 4.2 - z * 1.2) * 0.08;
    const height = -1.95 + (mainRidge + secondaryRidge) * 3.2 + backLift * 3.5 + valleyFalloff * 1.1 + grain;
    positions.setY(i, height);

    const lightPath = Math.max(0, 1 - Math.abs(x + slopeSide * width * 0.06) / (width * 0.34));
    const heightGlow = clamp((height + 0.5) / 4.6);
    const edgeShadow = clamp(Math.abs(x) / (width * 0.5));
    const tone = dark.clone().lerp(blue, lightPath * 0.72 + heightGlow * 0.18).lerp(ice, lightPath * heightGlow * 0.28);
    tone.multiplyScalar(1 - edgeShadow * 0.45);
    colors.push(tone.r, tone.g, tone.b);
  }

  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geometry.computeVertexNormals();

  const material = new THREE.MeshStandardMaterial({
    color,
    vertexColors: true,
    roughness: 0.92,
    metalness: 0.05,
    emissive: new THREE.Color(0x071a3d),
    emissiveIntensity: 0.46,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.receiveShadow = true;
  return mesh;
};

const createMountainSilhouette = ({ side = 1 }) => {
  const geometry = new THREE.BufferGeometry();
  const width = 14;
  const baseY = -1.28;
  const top = side < 0
    ? [
        [-7.4, 1.1], [-6.2, 0.94], [-5.1, 0.74], [-4.1, 0.44], [-3.2, 0.0],
        [-2.2, -0.35], [-1.2, -0.78], [0.2, -1.0],
      ]
    : [
        [-0.2, -1.02], [1.4, -0.72], [2.7, -0.28], [3.6, 0.18], [4.8, 0.78],
        [5.9, 1.18], [6.9, 1.34], [7.4, 1.52],
      ];

  const points = [[-width / 2, baseY], ...top, [width / 2, baseY]];
  const vertices = [];
  for (let i = 1; i < points.length - 1; i += 1) {
    vertices.push(points[0][0], points[0][1], 0, points[i][0], points[i][1], 0, points[i + 1][0], points[i + 1][1], 0);
  }
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

  const material = new THREE.MeshBasicMaterial({
    color: 0x020714,
    transparent: true,
    opacity: 0.88,
    depthWrite: false,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(side * 5.3, 1.18, -8.8);
  mesh.scale.set(1.25, 1.65, 1);
  return mesh;
};

const createWaterMaterial = () => new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  uniforms: {
    uTime: { value: 0 },
    uOpacity: { value: 0.88 },
  },
  vertexShader: `
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vWorld;

    void main() {
      vUv = uv;
      vec3 pos = position;
      float longWave = sin(pos.z * 1.6 + uTime * 0.75) * 0.045;
      float tightWave = sin(pos.z * 6.2 + pos.x * 0.55 + uTime * 1.9) * 0.018;
      pos.y += longWave + tightWave;
      vec4 world = modelMatrix * vec4(pos, 1.0);
      vWorld = world.xyz;
      gl_Position = projectionMatrix * viewMatrix * world;
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uOpacity;
    varying vec2 vUv;
    varying vec3 vWorld;

    float lineMask(float value, float width) {
      return smoothstep(1.0 - width, 1.0, value);
    }

    void main() {
      float depthFade = smoothstep(0.02, 0.82, vUv.y);
      float centerGlow = 1.0 - smoothstep(0.0, 7.2, abs(vWorld.x));
      float stream = 1.0 - smoothstep(0.0, 2.8, abs(vWorld.x + sin(vWorld.z * 0.34) * 0.55));
      float perspectiveBands = mix(21.0, 7.0, vUv.y);
      float ripplesA = lineMask(sin(vWorld.z * perspectiveBands + uTime * 1.25 + sin(vWorld.x * 1.15) * 1.1) * 0.5 + 0.5, 0.07);
      float ripplesB = lineMask(sin(vWorld.z * 34.0 - uTime * 2.1 + vWorld.x * 0.36) * 0.5 + 0.5, 0.03);
      float darkCuts = lineMask(sin(vWorld.z * 13.0 + vWorld.x * 0.22 - uTime * 0.7) * 0.5 + 0.5, 0.08);
      float horizon = smoothstep(0.55, 1.0, vUv.y);
      float foreground = 1.0 - smoothstep(0.0, 0.35, vUv.y);
      vec3 deep = vec3(0.005, 0.018, 0.052);
      vec3 blue = vec3(0.018, 0.19, 0.36);
      vec3 cyan = vec3(0.08, 0.62, 0.92);
      vec3 color = mix(deep, blue, depthFade * 0.62 + centerGlow * 0.14);
      color += cyan * (stream * 0.5 + horizon * 0.24);
      color += vec3(0.4, 0.76, 1.0) * (ripplesA * 0.26 + ripplesB * 0.1) * (0.42 + horizon);
      color = mix(color, deep, darkCuts * foreground * 0.38);
      float alpha = uOpacity * (0.78 + horizon * 0.18);
      gl_FragColor = vec4(color, alpha);
    }
  `,
});

const createMountainBackdrop = () => {
  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      varying vec2 vUv;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      float leftRidge(float x) {
        float base = 0.48 - x * 0.58;
        base += sin(x * 28.0) * 0.018 + sin(x * 53.0) * 0.012;
        return base;
      }

      float rightRidge(float x) {
        float t = (x - 0.54) / 0.46;
        float peak = 0.34 + smoothstep(0.02, 0.72, t) * 0.48;
        peak -= smoothstep(0.76, 1.0, t) * 0.12;
        peak += sin(t * 18.0) * 0.018 + sin(t * 41.0) * 0.01;
        return peak;
      }

      void main() {
        vec2 uv = vUv;
        float y = uv.y;
        float leftTop = leftRidge(uv.x);
        float rightTop = rightRidge(uv.x);
        float leftMask = (1.0 - smoothstep(0.48, 0.55, uv.x)) * step(y, leftTop);
        float rightMask = smoothstep(0.52, 0.6, uv.x) * step(y, rightTop);
        float mountainMask = max(leftMask, rightMask);

        float leftSnow = leftMask * smoothstep(leftTop - 0.28, leftTop - 0.08, y) * (1.0 - smoothstep(leftTop - 0.05, leftTop, y));
        float rightSnow = rightMask * smoothstep(rightTop - 0.34, rightTop - 0.08, y) * (1.0 - smoothstep(rightTop - 0.035, rightTop, y));
        float faceLight = max(leftSnow * 0.72, rightSnow);

        float grain = noise(uv * vec2(110.0, 58.0) + uTime * 0.02);
        float verticalCuts = smoothstep(0.72, 1.0, sin((uv.x + uv.y * 0.38) * 62.0) * 0.5 + 0.5);
        float ridgeLine = max(
          (1.0 - smoothstep(0.0, 0.018, abs(y - leftTop))) * (1.0 - smoothstep(0.48, 0.56, uv.x)),
          (1.0 - smoothstep(0.0, 0.018, abs(y - rightTop))) * smoothstep(0.5, 0.58, uv.x)
        );

        vec3 shadow = vec3(0.005, 0.009, 0.022);
        vec3 coldBlue = vec3(0.02, 0.18, 0.42);
        vec3 brightBlue = vec3(0.18, 0.62, 1.0);
        vec3 color = mix(shadow, coldBlue, faceLight * 0.8);
        color = mix(color, brightBlue, faceLight * (0.32 + grain * 0.3));
        color += vec3(0.2, 0.62, 1.0) * verticalCuts * faceLight * 0.16;
        color += vec3(0.72, 0.88, 1.0) * ridgeLine * 0.18;
        color *= 0.62 + grain * 0.2;

        float fadeBottom = smoothstep(0.02, 0.18, y);
        float alpha = mountainMask * fadeBottom * 0.96;
        gl_FragColor = vec4(color, alpha);
      }
    `,
  });

  const backdrop = new THREE.Mesh(new THREE.PlaneGeometry(29, 8), material);
  backdrop.position.set(0, 1.15, -9.2);
  backdrop.renderOrder = -2;
  return backdrop;
};

const createWaterStreaks = () => {
  const group = new THREE.Group();
  const material = new THREE.MeshBasicMaterial({
    color: 0x72c8ff,
    transparent: true,
    opacity: 0.2,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  for (let i = 0; i < 56; i += 1) {
    const geometry = new THREE.PlaneGeometry(THREE.MathUtils.lerp(1.1, 9.2, (i % 10) / 9), 0.014);
    const streak = new THREE.Mesh(geometry, material.clone());
    streak.rotation.x = -Math.PI / 2;
    streak.position.set((Math.random() - 0.5) * 21, -1.43 + i * 0.0008, -9.4 + i * 0.28);
    streak.material.opacity = 0.05 + (i % 7) * 0.019;
    group.add(streak);
  }

  return group;
};

const Hero = () => {
  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const cursorRef = useRef(null);
  const videoRef = useRef(null);
  const progressRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const showreel = [
    { label: "01", title: "CGI Films", text: "Cinematic 2D/3D animation, trailers and polished story visuals." },
    { label: "02", title: "AR / VR", text: "Realtime walkthroughs, interactive worlds and immersive brand spaces." },
    { label: "03", title: "Ads & Reels", text: "Product CGI, motion graphics and social-first visual campaigns." },
  ];

  const works = [
    { icon: <FiPlayCircle />, title: "2D / 3D Cinematics", type: "Film & Trailer" },
    { icon: <FiMonitor />, title: "Virtual Home Experience", type: "Unreal Engine VR" },
    { icon: <FiCamera />, title: "CGI Ads & Reels", type: "Digital Campaigns" },
  ];

  const studioStats = [
    { value: "6+", label: "Years CGI / AR-VR" },
    { value: "12+", label: "Artists Led" },
    { value: "30+", label: "Major Projects" },
  ];

  const services = [
    { icon: <FiCpu />, title: "Game & AR/VR" },
    { icon: <FiBox />, title: "Design & Production" },
    { icon: <FiFilm />, title: "CGI & Animation" },
    { icon: <FiLayers />, title: "3D Printing Assets" },
  ];

  const scenes = useMemo(
    () => [
      { id: "cube", nav: "Maryada Films" },
      { id: "showreel", nav: "Showreel" },
      { id: "works", nav: "Works" },
      { id: "studio", nav: "Studio" },
      { id: "services", nav: "Services" },
      { id: "start-project", nav: "Start Project" },
    ],
    []
  );

  const scenePosition = scrollProgress * (scenes.length - 1);
  const activeScene = Math.round(scenePosition);
  const cubeProgress = clamp(scenePosition);

  useEffect(() => {
    progressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const stage = stageRef.current;
    const cursor = cursorRef.current;
    if (!stage || !cursor) return undefined;

    let frameId = 0;
    let targetX = stage.clientWidth * 0.52;
    let targetY = stage.clientHeight * 0.42;
    let currentX = targetX;
    let currentY = targetY;

    const moveCursor = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      frameId = requestAnimationFrame(moveCursor);
    };

    const handlePointerMove = (event) => {
      const rect = stage.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;
      cursor.classList.add("is-active");
    };

    const handlePointerLeave = () => {
      cursor.classList.remove("is-active");
    };

    moveCursor();
    stage.addEventListener("pointermove", handlePointerMove);
    stage.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      cancelAnimationFrame(frameId);
      stage.removeEventListener("pointermove", handlePointerMove);
      stage.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020715, 0.045);

    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 90);
    const target = new THREE.Vector3(0, 0.1, -4);

    const ambient = new THREE.AmbientLight(0x9fcaff, 0.38);
    const moon = new THREE.DirectionalLight(0x9fcaff, 2.2);
    moon.position.set(-6, 7, 4);
    const cubeLight = new THREE.PointLight(0x16d7ff, 8, 18);
    cubeLight.position.set(0, 1.5, -2.6);
    scene.add(ambient, moon, cubeLight);

    const world = new THREE.Group();
    scene.add(world);

    const mountainBackdrop = createMountainBackdrop();
    world.add(mountainBackdrop);

    const leftSilhouette = createMountainSilhouette({ side: -1 });
    const rightSilhouette = createMountainSilhouette({ side: 1 });
    world.add(leftSilhouette, rightSilhouette);

    const leftMountain = createMountain({ side: -1, width: 15.5, depth: 14.5, color: 0x061225 });
    leftMountain.position.set(-8.35, -0.42, -5.8);
    leftMountain.rotation.z = 0.04;
    leftMountain.rotation.y = -0.1;
    leftMountain.scale.set(1.05, 0.82, 1.08);
    const rightMountain = createMountain({ side: 1, width: 16, depth: 14, color: 0x07152b });
    rightMountain.position.set(8.35, -0.42, -5.9);
    rightMountain.rotation.z = -0.05;
    rightMountain.rotation.y = 0.12;
    rightMountain.scale.set(1.08, 0.88, 1.08);
    world.add(leftMountain, rightMountain);

    const waterGeometry = new THREE.PlaneGeometry(42, 30, 240, 170);
    waterGeometry.rotateX(-Math.PI / 2);
    const waterMaterial = createWaterMaterial();
    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.position.set(0, -1.74, 1.0);
    const waterStreaks = createWaterStreaks();
    world.add(water, waterStreaks);

    const horizonGlow = new THREE.PointLight(0x24c7ff, 14, 24);
    horizonGlow.position.set(0, -0.6, -5.4);
    world.add(horizonGlow);

    const valleyGlow = new THREE.SpotLight(0x229dff, 8.5, 18, Math.PI / 5, 0.8, 1.2);
    valleyGlow.position.set(0, 2.8, -1.8);
    valleyGlow.target.position.set(0, -1.1, -7.2);
    world.add(valleyGlow, valleyGlow.target);

    const cubeGroup = new THREE.Group();
    const cubeGeometry = new THREE.BoxGeometry(1.62, 1.62, 1.62, 8, 8, 8);
    const cubeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x13d8ff,
      emissive: 0x10b7ff,
      emissiveIntensity: 0.85,
      roughness: 0.28,
      metalness: 0.18,
      transparent: true,
      opacity: 0.72,
      transmission: 0.18,
      thickness: 0.8,
    });
    const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
    const cubeEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(cubeGeometry, 16),
      new THREE.LineBasicMaterial({ color: 0xbaf6ff, transparent: true, opacity: 0.78 })
    );
    const cubeHalo = new THREE.Mesh(
      new THREE.BoxGeometry(1.78, 1.78, 1.78),
      new THREE.MeshBasicMaterial({
        color: 0x1fcfff,
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
      })
    );
    cubeGroup.add(cubeHalo, cubeMesh, cubeEdges);
    cubeGroup.position.set(0, 1.35, -2.4);
    world.add(cubeGroup);

    const particleGeometry = new THREE.BufferGeometry();
    const particleCount3d = 420;
    const particlePositions = new Float32Array(particleCount3d * 3);
    for (let i = 0; i < particleCount3d; i += 1) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 24;
      particlePositions[i * 3 + 1] = -1.35 + Math.random() * 3.2;
      particlePositions[i * 3 + 2] = -8 + Math.random() * 13;
    }
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: 0x75aaff,
        size: 0.035,
        transparent: true,
        opacity: 0.82,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    world.add(particles);

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / Math.max(clientHeight, 1);
      camera.updateProjectionMatrix();
    };

    let frameId = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const progress = progressRef.current;
      const localScene = progress * 5;
      const cubeFade = clamp(1 - Math.max(0, localScene - 1) * 0.42);

      waterMaterial.uniforms.uTime.value = elapsed;
      mountainBackdrop.material.uniforms.uTime.value = elapsed;
      waterStreaks.children.forEach((streak, index) => {
        streak.position.z += 0.01 + (index % 5) * 0.0012;
        streak.position.x += Math.sin(elapsed * 0.35 + index) * 0.0018;
        if (streak.position.z > 5.8) {
          streak.position.z = -9.4;
        }
      });

      cubeGroup.rotation.x = elapsed * 0.22 + progress * Math.PI * 2.4;
      cubeGroup.rotation.y = elapsed * 0.36 + progress * Math.PI * 3.2;
      cubeGroup.position.x = -progress * 4.2;
      cubeGroup.position.y = 1.32 - progress * 0.38;
      cubeGroup.position.z = -2.45 - progress * 1.8;
      cubeGroup.scale.setScalar(1 - progress * 0.22);
      cubeMaterial.opacity = 0.72 * cubeFade;
      cubeEdges.material.opacity = 0.78 * cubeFade;
      cubeHalo.material.opacity = 0.08 * cubeFade;
      cubeLight.position.copy(cubeGroup.position);
      cubeLight.intensity = 7.5 * cubeFade;

      particles.rotation.y = elapsed * 0.015;
      particles.position.y = Math.sin(elapsed * 0.55) * 0.1;
      leftMountain.position.x = -8.35 - progress * 0.75;
      rightMountain.position.x = 8.35 + progress * 0.85;
      leftSilhouette.position.x = -6.6 - progress * 0.38;
      rightSilhouette.position.x = 6.6 + progress * 0.45;
      mountainBackdrop.position.x = progress * -0.42;
      world.position.z = progress * 1.1;

      camera.position.x = THREE.MathUtils.lerp(0, 1.05, progress);
      camera.position.y = THREE.MathUtils.lerp(1.1, 1.9, progress);
      camera.position.z = THREE.MathUtils.lerp(8.05, 6.1, progress);
      target.set(THREE.MathUtils.lerp(0, -1.15, progress), -0.08, THREE.MathUtils.lerp(-4.1, -5.7, progress));
      camera.lookAt(target);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const hero = document.querySelector(".hero");
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      const scrollable = Math.max(hero.offsetHeight - window.innerHeight, 1);
      const nextProgress = clamp(-rect.top / scrollable);
      setScrollProgress(nextProgress);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const panelStyle = (index) => {
    const offset = index - scenePosition;
    const visibility = clamp(1 - Math.abs(offset) * 1.45);

    return {
      opacity: visibility,
      pointerEvents: visibility > 0.68 ? "auto" : "none",
      transform: `translate3d(0, ${offset * 84}px, 0) scale(${0.96 + visibility * 0.04})`,
    };
  };

  return (
    <main className="home-page" style={{ "--scroll-progress": scrollProgress, "--cube-progress": cubeProgress }}>
      <section className="hero" aria-label="Maryada Films scroll story">
        <video className="bg-video" ref={videoRef} autoPlay muted={isMuted} loop playsInline>
          <source src={video} type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-grid" />

        <div className="hero-frame">
          <div className="hero-stage" ref={stageRef}>
            <canvas className="three-world" ref={canvasRef} aria-hidden="true" />
            <div className="hero-cursor" ref={cursorRef} aria-hidden="true">
              <span />
            </div>

            <div className="scene-nav" aria-hidden="true">
              {scenes.map((scene, index) => (
                <span className={index === activeScene ? "active" : ""} key={scene.id}>
                  {scene.nav}
                </span>
              ))}
            </div>

            <div className="brand-cube" aria-hidden="true">
              <div className="cube">
                <span className="face face-front">MF</span>
                <span className="face face-back">CGI</span>
                <span className="face face-right">VR</span>
                <span className="face face-left">3D</span>
                <span className="face face-top">FILM</span>
                <span className="face face-bottom">ART</span>
              </div>
            </div>

            <section className="scene-panel cube-panel" style={panelStyle(0)}>
              <h1>
                <span>Maryada</span>
                <span>Films</span>
              </h1>
              <p className="hero-copy">
                CGI, AR/VR, animation and cinematic brand worlds built with a sharp production eye.
              </p>
              <Link className="explore-action" to="/projects">
                <FiArrowRight /> Explore Our Projects
              </Link>
            </section>

            <section className="scene-panel showreel-panel" id="showreel" style={panelStyle(1)}>
              <div className="scene-copy">
                <p className="eyebrow bordered">Showreel</p>
                <h2>Moving images for films, products and virtual spaces.</h2>
              </div>
              <div className="content-window">
                {showreel.map((item) => (
                  <article className="showcase-row" key={item.label}>
                    <span>{item.label}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                    <FiArrowRight />
                  </article>
                ))}
              </div>
            </section>

            <section className="scene-panel works-panel" id="works" style={panelStyle(2)}>
              <div className="scene-copy">
                <p className="eyebrow bordered">Works</p>
                <h2>Selected work across CGI, VR, ads and real-time worlds.</h2>
              </div>
              <div className="work-grid">
                {works.map((work, index) => (
                  <article className="work-card" key={work.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {work.icon}
                    <p>{work.type}</p>
                    <h3>{work.title}</h3>
                  </article>
                ))}
              </div>
            </section>

            <section className="scene-panel studio-panel" id="studio" style={panelStyle(3)}>
              <div className="scene-copy wide">
                <p className="eyebrow bordered">Studio</p>
                <h2>Immersive 2D and 3D visuals with strong technical craft.</h2>
                <p>
                  Led by a senior 3D artist and visualizer, Maryada Films builds cinematic storytelling for films,
                  games, architecture and digital media.
                </p>
              </div>
              <div className="studio-stat-grid">
                {studioStats.map((stat) => (
                  <article className="studio-stat" key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </article>
                ))}
              </div>
            </section>

            <section className="scene-panel services-panel" id="services" style={panelStyle(4)}>
              <div className="scene-copy">
                <p className="eyebrow bordered">Services</p>
                <h2>CGI, animation, AR/VR, design and production.</h2>
              </div>
              <div className="service-grid">
                {services.map((service) => (
                  <article className="service-tile" key={service.title}>
                    {service.icon}
                    <h3>{service.title}</h3>
                  </article>
                ))}
              </div>
            </section>

            <section className="scene-panel start-panel" id="start-project" style={panelStyle(5)}>
              <div className="scene-copy wide">
                <p className="eyebrow bordered">Start a Project</p>
                <h2>Let's design visuals that represent your vision and values.</h2>
              </div>
              <div className="start-actions">
                <a className="contact-method" href="tel:+918302736672">
                  <FiAward />
                  <span><strong>Call Us</strong>8302736672</span>
                </a>
                <a className="contact-method" href="mailto:maryadafilms@gmail.com">
                  <FiMail />
                  <span><strong>Email Us</strong>maryadafilms@gmail.com</span>
                </a>
                <Link className="submit-btn-inline" to="/start-project">
                  Start Brief <FiSend />
                </Link>
              </div>
            </section>

            <div className="hero-bottom-bar">
              <span className="sound-pill" onClick={toggleMute} style={{cursor: 'pointer'}}>
                {isMuted ? 'Sound Off' : 'Sound On'}
              </span>
              <span className="scroll-pill">{String(activeScene + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")} Scroll To Explore</span>
              <Link to="/start-project">Chat With Us</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Hero;
