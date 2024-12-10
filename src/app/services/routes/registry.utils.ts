import { loadRemoteModule } from '@angular-architects/module-federation';

export const registry = {
  // external mfe
  mfe1: () =>
    loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:8081/remoteEntry.js',
      exposedModule: './web-components',
    }),
};
