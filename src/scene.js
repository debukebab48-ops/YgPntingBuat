import * as THREE from '../vendor/three.min.js';
import { CONFIG } from './config.js';

export function createScene(canvas, config = CONFIG) {
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error('createScene: canvas must be an HTMLCanvasElement');
  }

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(config.colors.background);

  const aspect = window.innerWidth / window.innerHeight;
  const camera = new THREE.PerspectiveCamera(config.cameraFov, aspect, 0.1, 100);
  const tiltRad = (config.cameraTilt * Math.PI) / 180;
  const d = config.cameraDistance;
  camera.position.set(0, Math.sin(tiltRad) * d, Math.cos(tiltRad) * d);
  camera.lookAt(0, 0, 0);

  // Main light: top-front.
  const mainLight = new THREE.DirectionalLight(
    config.colors.mainLight,
    config.lighting.mainIntensity
  );
  mainLight.position.set(0, 5, 3);
  scene.add(mainLight);

  // Soft bottom light.
  const bottomLight = new THREE.DirectionalLight(
    config.colors.bottomLight,
    config.lighting.bottomIntensity
  );
  bottomLight.position.set(0, -3, 2);
  scene.add(bottomLight);

  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.MeshStandardMaterial({
    color: config.colors.plane,
    roughness: 1,
    metalness: 0
  });
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  let frameHandle = null;

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function startLoop(onFrame) {
    stopLoop();
    const tick = (time) => {
      if (typeof onFrame === 'function') onFrame(time);
      renderer.render(scene, camera);
      frameHandle = requestAnimationFrame(tick);
    };
    frameHandle = requestAnimationFrame(tick);
  }

  function stopLoop() {
    if (frameHandle !== null) {
      cancelAnimationFrame(frameHandle);
      frameHandle = null;
    }
  }

  resize();
  window.addEventListener('resize', resize);

  // `plane` is returned in addition to the contract fields so callers that
  // depended on Task 1's bootstrap return shape keep working.
  return { scene, camera, renderer, startLoop, stopLoop, resize, plane };
}
