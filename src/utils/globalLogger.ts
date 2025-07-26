import consola from 'consola';

// Expose globally
declare global {
  var $log: typeof consola;
}

globalThis.$log = consola;