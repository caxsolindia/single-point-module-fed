import { Directive, HostListener, Input } from '@angular/core';
import { MenuArray } from '../shared/shared.service';

@Directive({
  selector: '[appHover]',
})
export class HoverDirective {
  @Input() appHover:
    | {
        label: string;
        svgName: string;
        action: () => void;
        isHovered: boolean;
        isClicked: boolean;
      }
    | MenuArray
    | undefined;

  @HostListener('mouseenter') onMouseEnter() {
    this.setHover(true);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setHover(false);
  }

  private setHover(isHovered: boolean) {
    if (this.appHover) {
      this.appHover.isHovered = isHovered;
    }
  }
}
