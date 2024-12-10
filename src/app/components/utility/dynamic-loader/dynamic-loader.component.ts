import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { registry } from '../../../services/routes/registry.utils';

@Component({
  selector: 'app-dynamic-loader',
  template: `<div #vc></div>`,
  styleUrl: './dynamic-loader.component.scss',
})
export class DynamicLoaderComponent implements AfterViewInit {
  @ViewChild('vc', { read: ElementRef, static: true })
  vc!: ElementRef;

  @Input() elementName: string = '';
  @Input() importName!: keyof typeof registry;

  ngAfterViewInit(): void {
    const importFn = registry[this.importName];
    if (importFn) {
      importFn()
        .then(() => {
          console.debug(`Element ${this.elementName} loaded!`);
          const element = document.createElement(this.elementName);
          this.vc.nativeElement.appendChild(element);
        })
        .catch((err: unknown) =>
          console.error(`Error loading ${this.elementName}:`, err)
        );
    } else {
      console.error(
        `Import function for '${this.importName}' not found in registry.`
      );
    }
  }
}
