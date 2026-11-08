export function assertTrue(value, message) {
  if (!value) {
    throw new Error(message || 'Expected value to be truthy');
  }
}

export function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(
      `${message || 'assertEqual failed'}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`
    );
  }
}

export function assertClose(actual, expected, tolerance, message) {
  if (Math.abs(actual - expected) > tolerance) {
    throw new Error(
      `${message || 'assertClose failed'}: expected ${expected} ± ${tolerance}, got ${actual}`
    );
  }
}
