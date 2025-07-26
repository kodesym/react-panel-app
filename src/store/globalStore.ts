import { getDefaultStore } from 'jotai';

const globalStore = getDefaultStore();

// Mount devtool once (dev only!)
if (import.meta.env.DEV) {
  // mountStoreDevtool('Global Store', globalStore);
}

export { globalStore };