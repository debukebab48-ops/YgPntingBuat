import { createScene } from './scene.js';
import { CONFIG } from './config.js';

export function bootstrap(canvas = document.getElementById('scene-canvas')) {
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error('bootstrap: #scene-canvas not found');
  }
  const ctx = createScene(canvas, CONFIG);
  ctx.startLoop();
  return ctx;
}
