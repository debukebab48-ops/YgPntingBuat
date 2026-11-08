export const CONFIG = Object.freeze({
  // PRD §19 — camera
  cameraTilt: 25,      // degrees, downward from horizontal
  cameraFov: 45,       // degrees
  cameraDistance: 4,   // units; frames the 2×2 plane

  // PRD §19 — timing
  introDuration: 450,  // ms

  // PRD §19 — gestures
  maxPinches: 2,

  // PRD §19 — performance
  fpsTarget: 60,
  fpsFloor: 30,

  // Colors (carried over from Task 1; PRD §19 palette to be filled in)
  colors: Object.freeze({
    background: 0x101820,
    plane: 0x101820,
    mainLight: 0xffffff,
    bottomLight: 0x8090a0
  }),

  lighting: Object.freeze({
    mainIntensity: 1.0,
    bottomIntensity: 0.25
  })
});
