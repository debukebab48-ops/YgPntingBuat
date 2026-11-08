// tests/cloth.test.js
import { createCloth } from '../src/cloth.js';

export function runClothTests() {
  const log = [];
  const assert = (cond, msg) => {
    if (!cond) throw new Error(msg);
  };

  try {
    const cloth = createCloth({ clothSpacing: 24 });
    cloth.build({ width: 400, height: 800 });

    const { points, segments, cols, rows } = cloth.mesh;

    // 1. Grid dimensions for 400×800 viewport
    assert(cols >= 16 && cols <= 18, `cols=${cols}, expected 16-18`);
    assert(rows >= 33 && rows <= 35, `rows=${rows}, expected 33-35`);
    log.push(`grid: ${cols} cols × ${rows} rows`);

    // 2. Edge vertices exactly on viewport boundaries
    const EPS = 1e-9;
    for (let c = 0; c < cols; c++) {
      assert(Math.abs(points[c].y) < EPS,
        `top edge c=${c} y=${points[c].y}, expected 0`);
      const bottom = points[(rows - 1) * cols + c];
      assert(Math.abs(bottom.y - 800) < EPS,
        `bottom edge c=${c} y=${bottom.y}, expected 800`);
    }
    for (let r = 0; r < rows; r++) {
      assert(Math.abs(points[r * cols].x) < EPS,
        `left edge r=${r} x=${points[r * cols].x}, expected 0`);
      const right = points[r * cols + (cols - 1)];
      assert(Math.abs(right.x - 400) < EPS,
        `right edge r=${r} x=${right.x}, expected 400`);
    }
    log.push('edges pinned at x=0, x=400, y=0, y=800');

    // 3. Every segment connects adjacent grid vertices; no duplicates
    const seen = new Set();
    for (const [a, b] of segments) {
      const ra = Math.floor(a / cols), ca = a % cols;
      const rb = Math.floor(b / cols), cb = b % cols;
      const dr = Math.abs(ra - rb), dc = Math.abs(ca - cb);
      assert(dr + dc === 1,
        `segment ${a}-${b} not adjacent (dr=${dr}, dc=${dc})`);
      const key = a < b ? `${a}:${b}` : `${b}:${a}`;
      assert(!seen.has(key), `duplicate segment ${key}`);
      seen.add(key);
    }
    log.push(`${segments.length} unique adjacent segments`);

    // 4. Every horizontal and vertical neighbour is present
    const expected = (cols - 1) * rows + cols * (rows - 1);
    assert(segments.length === expected,
      `segments=${segments.length}, expected=${expected}`);
    log.push('segment count matches full grid');

    return { pass: true, log };
  } catch (e) {
    return { pass: false, error: e.message, log };
  }
}
