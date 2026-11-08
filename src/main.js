import * as THREE from '../vendor/three.min.js';

if (typeof window !== 'undefined') {
  window.THREE = THREE;
}

export function bootstrap(canvas = document.getElementById('scene-canvas')) {
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error('bootstrap: #scene-canvas not found');
  }

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  camera.position.z = 1;

  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.MeshBasicMaterial({ color: 0x101820 });
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    camera.updateProjectionMatrix();
  }

  resize();
  window.addEventListener('resize', resize);
  renderer.setAnimationLoop(() => renderer.render(scene, camera));

  return { renderer, scene, camera, plane, resize };
}
