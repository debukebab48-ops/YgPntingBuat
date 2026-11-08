import { CONFIG } from '../src/config.js';
import { createScene } from '../src/scene.js';

export default async function scene({ assertEqual, assertTrue }) {
  assertEqual(CONFIG.cameraTilt, 25, 'CONFIG.cameraTilt === 25');
  assertTrue(
    CONFIG.cameraTilt >= 20 && CONFIG.cameraTilt <= 30,
    'CONFIG.cameraTilt in [20, 30]'
  );
  assertEqual(CONFIG.cameraFov, 45, 'CONFIG.cameraFov === 45');
  assertEqual(CONFIG.introDuration, 450, 'CONFIG.introDuration === 450');
  assertEqual(CONFIG.maxPinches, 2, 'CONFIG.maxPinches === 2');
  assertEqual(CONFIG.fpsTarget, 60, 'CONFIG.fpsTarget === 60');
  assertEqual(CONFIG.fpsFloor, 30, 'CONFIG.fpsFloor === 30');

  const canvas = document.getElementById('scene-canvas');
  const ctx = createScene(canvas, CONFIG);

  for (const key of ['camera', 'renderer', 'startLoop', 'stopLoop', 'resize']) {
    assertTrue(key in ctx, `createScene returns ${key}`);
  }
  assertEqual(typeof ctx.startLoop, 'function', 'startLoop is a function');
  assertEqual(typeof ctx.stopLoop, 'function', 'stopLoop is a function');
  assertEqual(typeof ctx.resize, 'function', 'resize is a function');
}
