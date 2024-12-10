import {
  AfterContentInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { registry } from '../../../services/routes/registry.utils';

interface RouteData {
  elementName: string;
  importName: keyof typeof registry; // Use keyof typeof to get keys of registry
}

@Component({
  template: '<div #vc></div>',
})
export class WrapperComponent implements AfterContentInit {
  @ViewChild('vc', { read: ElementRef, static: true })
  vc!: ElementRef;

  constructor(private route: ActivatedRoute) {}

  ngAfterContentInit(): void {
    const routeData: RouteData = this.route.snapshot.data as RouteData;

    const { elementName, importName } = routeData;

    const importFn = registry[importName as keyof typeof registry]; // Cast importName to keyof typeof registry
    if (importFn) {
      importFn()
        .then(() => console.debug(`Element ${elementName} loaded!`))
        .catch((err: unknown) => {
          if (err instanceof Error) {
            console.error(`Error loading ${elementName}:`, err.message);
          } else {
            console.error(`Error loading ${elementName}:`, err);
          }
        });

      const element = document.createElement(elementName);
      this.vc.nativeElement.appendChild(element);
    } else {
      console.error(
        `Import function for '${importName}' not found in registry.`
      );
    }
  }
}
