import { createConsola } from 'consola';
const consola = createConsola({ level: 4 });

// Expose globally
declare global {
  var $log: typeof consola;
}

globalThis.$log = consola;