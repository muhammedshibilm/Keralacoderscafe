"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Loader2 } from 'lucide-react';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const CONFIG = {
  loaderTimeout: 6000,
  minLoadTime: 2000,
};

const DEV_TIPS = [
  "> Initializing dev environment...",
  "> Fetching coffee from /dev/null...",
  "> Resolving dependencies...",
  "Tip: Use Ctrl+R to reverse search terminal history",
  "Tip: Commit early, push often",
  "Tip: Reading docs saves hours of debugging",
  "Tip: console.log('here') is the best debugger",
  "> Bypassing the mainframe...",
  "> Compiling next-generation web...",
  "> rm -rf node_modules && npm i",
];

const PageLoader: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    setTipIndex(Math.floor(Math.random() * DEV_TIPS.length));
    const interval = setInterval(() => {
      setTipIndex(prev => (prev + 1) % DEV_TIPS.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || window.location.hash) return;
    const lastSeen = localStorage.getItem('kcc_loader_seen');
    if (lastSeen && Date.now() - parseInt(lastSeen, 10) < 3600000) return; // 1 hour

    setIsVisible(true);
    const startTime = Date.now();
    let animId: number;
    let composer: EffectComposer;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setClearColor(0x11151c);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current?.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 10);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enabled = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;

    // Limit the angle that the camera can move
    const angleLimit = Math.PI / 7;
    controls.minPolarAngle = Math.PI / 2 - angleLimit;
    controls.maxPolarAngle = Math.PI / 2 + angleLimit;

    // Loading Manager
    const manager = new THREE.LoadingManager();
    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      setProgress(Math.round((itemsLoaded / itemsTotal) * 100));
    };
    manager.onLoad = () => {
      setProgress(100);
    };
    manager.onError = (url) => {
      console.error("Failed to load", url);
      setErrorMsg("Failed to load 3D asset: " + url.split('/').pop());
    };

    // Load assets using manager
    const hdrLoader = new RGBELoader(manager);
    const textureLoader = new THREE.TextureLoader(manager);
    const fbxloader = new FBXLoader(manager);

    // Add a gradient HDR background
    const hdrEquirect = hdrLoader
      .setPath("https://miroleon.github.io/daily-assets/")
      .load("GRADIENT_01_01_comp.hdr", function () {
        hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
      });

    scene.environment = hdrEquirect;

    // Add some fog to the scene for moodyness
    scene.fog = new THREE.FogExp2(0x11151c, 0.4);

    // Load a texture for the 3d model
    const surfaceImperfection = textureLoader.load(
      "https://miroleon.github.io/daily-assets/surf_imp_02.jpg"
    );
    surfaceImperfection.wrapT = THREE.RepeatWrapping;
    surfaceImperfection.wrapS = THREE.RepeatWrapping;

    // Create a new MeshPhysicalMaterial for the 3d model
    const hands_mat = new THREE.MeshPhysicalMaterial({
      color: 0x606060,
      roughness: 0.2,
      metalness: 1,
      roughnessMap: surfaceImperfection,
      envMap: hdrEquirect,
      envMapIntensity: 1.5
    });

    // Load the 3d model as FBX
    fbxloader.load(
      "https://miroleon.github.io/daily-assets/two_hands_01.fbx",
      function (object) {
        object.traverse(function (child) {
          if ((child as THREE.Mesh).isMesh) {
            (child as THREE.Mesh).material = hands_mat;
          }
        });
        object.position.set(0, 0, 0);
        object.scale.setScalar(0.05);
        scene.add(object);
      }
    );

    // POST PROCESSING
    const renderScene = new RenderPass(scene, camera);
    const afterimagePass = new AfterimagePass();
    afterimagePass.uniforms["damp"].value = 0.9;

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.75, // strength
      1.0,  // radius
      0.1   // threshold
    );

    // Create the displacement shader
    const displacementShader = {
      uniforms: {
        tDiffuse: { value: null },
        displacement: { value: null },
        scale: { value: 0.025 },
        tileFactor: { value: 2.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform sampler2D displacement;
        uniform float scale;
        uniform float tileFactor;
        varying vec2 vUv;
        void main() {
            if (vUv.x < 0.75 && vUv.x > 0.25 && vUv.y < 0.75 && vUv.y > 0.25) {
                vec2 tiledUv = mod(vUv * tileFactor, 1.0);
                vec2 disp = texture2D(displacement, tiledUv).rg * scale;
                vec2 distUv = vUv + disp;
                gl_FragColor = texture2D(tDiffuse, distUv);
            } else {
                gl_FragColor = texture2D(tDiffuse, vUv);
            }
        }
      `
    };

    // Load the displacement texture
    const displacementTexture = textureLoader.load(
      "https://raw.githubusercontent.com/miroleon/displacement_texture_freebie/main/assets/1K/jpeg/normal/ml-dpt-21-1K_normal.jpeg",
      function (texture) {
        texture.minFilter = THREE.NearestFilter;
      }
    );

    const displacementPass = new ShaderPass(displacementShader);
    displacementPass.uniforms["displacement"].value = displacementTexture;

    composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(afterimagePass);
    composer.addPass(bloomPass);
    composer.addPass(displacementPass);

    // Camera script path transition controls
    let isUserInteracting = false;
    let transitionProgress = 0;
    const transitionTime = 2; // Transition should complete over 2 seconds
    const transitionIncrement = 1 / (60 * transitionTime); // Assuming 60 FPS
    const transitionStartCameraPosition = new THREE.Vector3();
    const transitionStartCameraQuaternion = new THREE.Quaternion();

    function easeInOutCubic(x: number) {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    let theta = 0;
    const updateCamera = () => {
      theta += 0.005;

      const targetPosition = new THREE.Vector3(
        Math.sin(theta) * 3,
        Math.sin(theta),
        Math.cos(theta) * 3
      );

      const targetQuaternion = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(0, -theta, 0)
      );

      if (isUserInteracting) {
        if (transitionProgress > 0) {
          transitionProgress = 0;
        }
        transitionStartCameraPosition.copy(camera.position);
        transitionStartCameraQuaternion.copy(camera.quaternion);
      } else {
        if (transitionProgress < 1) {
          transitionProgress += transitionIncrement;
          const easedProgress = easeInOutCubic(transitionProgress);

          camera.position.lerpVectors(
            transitionStartCameraPosition,
            targetPosition,
            easedProgress
          );
          camera.quaternion.slerp(
            transitionStartCameraQuaternion,
            targetQuaternion,
            easedProgress
          );
        } else {
          camera.position.copy(targetPosition);
          camera.quaternion.copy(targetQuaternion);
        }
      }

      camera.lookAt(scene.position);
    };

    // OrbitControls Event Listeners
    const onStartInteract = () => {
      isUserInteracting = true;
    };
    const onEndInteract = () => {
      isUserInteracting = false;
      transitionStartCameraPosition.copy(camera.position);
      transitionStartCameraQuaternion.copy(camera.quaternion);
      transitionProgress = 0;
    };

    controls.addEventListener("start", onStartInteract);
    controls.addEventListener("end", onEndInteract);

    // Resize handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Dismissal Logic
    const handleDismiss = () => {
      setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem('kcc_loader_seen', Date.now().toString());
        window.dispatchEvent(new CustomEvent('kcc_loader_finished'));
        setTimeout(() => setIsVisible(false), 800);
      }, Math.max(0, CONFIG.minLoadTime - (Date.now() - startTime)));
    };

    // Drag-aware click detection for desktop
    let dragStartX = 0;
    let dragStartY = 0;
    const onMouseDown = (e: MouseEvent) => {
      dragStartX = e.clientX;
      dragStartY = e.clientY;
    };
    const onMouseUp = (e: MouseEvent) => {
      const dist = Math.hypot(e.clientX - dragStartX, e.clientY - dragStartY);
      if (dist < 5) {
        handleDismiss();
      }
    };

    // Touch support for drag-aware click detection on mobile
    let touchStartX = 0;
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches.length > 0) {
        const dist = Math.hypot(e.changedTouches[0].clientX - touchStartX, e.changedTouches[0].clientY - touchStartY);
        if (dist < 5) {
          handleDismiss();
        }
      }
    };

    // Keyboard controls
    const onKey = (e: KeyboardEvent) => ['Escape', 'Enter', ' '].includes(e.key) && handleDismiss();

    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Auto-dismiss timeout
    const timer = setTimeout(handleDismiss, CONFIG.loaderTimeout);

    // Animation Loop
    const animate = () => {
      controls.update();
      updateCamera();
      composer.render();
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      controls.removeEventListener("start", onStartInteract);
      controls.removeEventListener("end", onEndInteract);
      controls.dispose();

      scene.traverse((obj: any) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m: any) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      displacementTexture.dispose();
      surfaceImperfection.dispose();
      hdrEquirect.dispose();
      renderer.dispose();
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#11151c] transition-opacity duration-800 ease-out cursor-pointer ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <style>{`
        @keyframes badge-appear {
          0%   { opacity: 0; transform: scale(0.4); }
          60%  { opacity: 1; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        .svg-badge {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          border: 1.5px solid rgba(255,255,255,0.18);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 18px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.15);
          overflow: hidden;
          padding: 5px;
          opacity: 0;
          animation: badge-appear 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .svg-badge img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .badge-wrap:nth-child(1) .svg-badge { animation-delay: 0.3s; }
        .badge-wrap:nth-child(3) .svg-badge { animation-delay: 0.5s; }
        .badge-wrap:nth-child(5) .svg-badge { animation-delay: 0.7s; }
        .badge-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 10px;
        }
        .badge-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
          margin-top: 4px;
          text-align: center;
        }
        .badge-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .badge-divider {
          width: 1px;
          height: 28px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent);
        }
      `}</style>

      <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden z-0" />

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 sm:px-6 pointer-events-none">
        <div className="w-full max-w-[90vw] sm:max-w-[70vw] lg:max-w-[50vw]">
          <svg viewBox="0 0 720 250" className="w-full h-auto drop-shadow-[0_12px_30px_rgba(0,0,0,0.9)]">
            <defs>
              <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Playwrite+IE:wght@400&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Chilanka&display=swap');
                .text-kerala { font: 900 110px 'Montserrat', sans-serif; letter-spacing: 16px; fill: #FFF; }
                .text-coders { font: 900 92px 'Montserrat', sans-serif; letter-spacing: 6px; fill: #FFF; opacity: 0.95; }
                .text-cafe { 
                  font: 400 85px 'Playwrite IE', cursive; 
                  fill: #d95715; 
                  animation: writeCafeLoader 3s ease-in-out forwards;
                }
                .text-chilanka {
                  font-family: 'Chilanka', cursive;
                  font-weight: 400;
                  font-size: 32px;
                  fill: #FFF;
                  opacity: 0.9;
                  letter-spacing: 2px;
                  animation: writeCafeLoader 3s ease-in-out forwards;
                  animation-delay: 0.5s;
                  opacity: 0;
                }
                @keyframes writeCafeLoader {
                  0%, 10% { clip-path: inset(-20% 120% -20% -20%); opacity: 0; }
                  15% { opacity: 1; }
                  100% { clip-path: inset(-20% -20% -20% -20%); opacity: 1; }
                }
                .shadow-group { filter: drop-shadow(0px 8px 12px rgba(0,0,0,0.5)); }
              `}</style>
            </defs>
            <g className="shadow-group">
              <text x="10" y="100" className="text-kerala">KERALA</text>
              <text x="15" y="195" className="text-coders">CODERS</text>
              <text x="450" y="195" className="text-cafe" transform="rotate(-8, 450, 195)">Cafe</text>
              <text x="15" y="240" className="text-chilanka">ഞാൻ അല്ലാതെ ആര്</text>
            </g>
            <g transform="translate(680, 20)">
              {['#FCCC12', '#FF7112', '#EF1541', '#6E55DC', '#069DE0', '#05AC3F'].map((c, i) => (
                <circle key={i} cy={i * 32} r={12} fill={c} className="animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </g>
          </svg>
        </div>

        {/* Spinning SVG Badges */}
        <div className="badge-row" style={{ marginTop: '-4px', marginBottom: '8px' }}>
          <div className="badge-wrap">
            <div className="svg-badge">
              <img src="/proch.svg" alt="Porsche" draggable={false} />
            </div>
            <span className="badge-label">Porsche</span>
          </div>
          <div className="badge-divider" />
          <div className="badge-wrap">
            <div className="svg-badge">
              <img src="/brazil.svg" alt="Brazil" draggable={false} />
            </div>
            <span className="badge-label">Brazil</span>
          </div>
          <div className="badge-divider" />
          <div className="badge-wrap">
            <div className="svg-badge">
              <img src="/argie.svg" alt="Argentina" draggable={false} />
            </div>
            <span className="badge-label">Argentina</span>
          </div>
        </div>

        <div className="mt-4 w-full max-w-xs sm:max-w-sm">
          <div className="relative h-3 sm:h-4 bg-white/10 rounded-full overflow-hidden border border-white/30 shadow-lg">
            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 transition-all duration-300" style={{ width: `${progress}%` }}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)' }} />
          </div>
          <div className="mt-3 flex items-center justify-between text-xs sm:text-sm">
            <span className="flex items-center gap-2 font-mono text-[10px] sm:text-xs text-white/90 tracking-tight">
              {!errorMsg && <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin opacity-50 shrink-0" />}
              <span className="truncate max-w-[200px] sm:max-w-xs">{errorMsg ? '⚠️ ' + errorMsg : DEV_TIPS[tipIndex]}</span>
            </span>
            <span className="text-white/70 font-mono ml-2 shrink-0">{progress}%</span>
          </div>
          <p className="mt-2 text-center text-[10px] text-white/50 animate-pulse">
            <span className="hidden sm:inline font-mono">Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded border border-white/20">ESC</kbd> or <kbd className="px-1.5 py-0.5 bg-white/10 rounded border border-white/20">Space</kbd> to skip</span>
            <span className="sm:hidden">Tap anywhere to skip</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;