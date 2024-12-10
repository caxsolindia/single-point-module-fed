import React from "react";
import { createRoot, Root } from "react-dom/client";
import App from "./App.tsx";
import ErrorBoundary from "./ErrorBoundry.tsx";

let root: Root | null = null;

export function bootstrap(container: HTMLElement | null) {
  if (!container) throw new Error("Cannot find root element with that id");

  if (root) {
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>,
    );
  } else {
    root = createRoot(container);
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>,
    );
  }
}

export function unmount(container: HTMLElement | null) {
  if (root && container) {
    root.unmount();
    root = null;
  }
}

// Direct initialization with type assertion
const rootEl = document.querySelector("#root");
if (!rootEl) throw new Error("Cannot find root element with that id");

// Ensure rootEl is an HTMLElement before calling bootstrap
bootstrap(rootEl as HTMLElement);
