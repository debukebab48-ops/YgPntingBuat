import { bootstrap } from '../src/main.js';

export default async function scaffold({ assertEqual, assertClose, assertTrue }) {
  const canvas = document.getElementById('scene-canvas');

  assertTrue(canvas instanceof HTMLCanvasElement, 'document has #scene-canvas');
  assertEqual(window.THREE?.REVISION, '160', 'Three.js revision is 160');
  assertEqual(typeof bootstrap, 'function', 'bootstrap is a function');

  bootstrap(canvas);
  window.dispatchEvent(new Event('resize'));
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

  assertClose(canvas.clientWidth, window.innerWidth, 1, 'canvas width fills viewport');
  assertClose(canvas.clientHeight, window.innerHeight, 1, 'canvas height fills viewport');
}
