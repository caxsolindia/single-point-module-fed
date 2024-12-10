export interface ReactModule {
  bootstrap: (container: HTMLElement) => void;
  unmount?: (container: HTMLElement) => void;
}
