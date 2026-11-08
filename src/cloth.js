// src/cloth.js
export function createCloth(config) {
  const clothSpacing = (config && config.clothSpacing) || 24;

  let mesh = null;

  function build(viewport) {
    const width = viewport.width;
    const height = viewport.height;

    // Ruling: intervals = round(dimension / clothSpacing), points = intervals + 1.
    // For 400×800 at 24 dp: cols = round(16.67)+1 = 18, rows = round(33.33)+1 = 34.
    // Spacing is 400/17 ≈ 23.53 dp × 800/33 ≈ 24.24 dp — both "around 24 dp".
    const cols = Math.max(2, Math.round(width / clothSpacing) + 1);
    const rows = Math.max(2, Math.round(height / clothSpacing) + 1);

    const points = new Array(cols * rows);
    for (let r = 0; r < rows; r++) {
      const y = (r / (rows - 1)) * height;
      for (let c = 0; c < cols; c++) {
        const x = (c / (cols - 1)) * width;
        points[r * cols + c] = { x, y };
      }
    }

    const segments = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i = r * cols + c;
        if (c + 1 < cols) segments.push([i, i + 1]);       // horizontal
        if (r + 1 < rows) segments.push([i, i + cols]);    // vertical
      }
    }

    const pinned = new Uint8Array(cols * rows);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (r === 0 || r === rows - 1 || c === 0 || c === cols - 1) {
          pinned[r * cols + c] = 1;
        }
      }
    }

    mesh = { points, segments, cols, rows, pinned };
    return mesh;
  }

  // Stubs for later tasks; Task 3 only owns geometry + lines.
  function setDensityLevel(_level) {}
  function sampleDeformedPoint(restPoint) { return restPoint; }
  function worldToRestPoint(worldPoint) { return worldPoint; }
  function isAtRest() { return true; }

  return {
    get mesh() { return mesh; },
    build,
    setDensityLevel,
    sampleDeformedPoint,
    worldToRestPoint,
    isAtRest,
  };
}
