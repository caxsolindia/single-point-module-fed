import { trigger, transition, style, animate } from '@angular/animations';

export const slideInFromRightAnimation = trigger('slideInFromRight', [
  transition(':enter', [
    style({ transform: 'translateX(100%)' }),
    animate('500ms ease-out', style({ transform: 'translateX(0%)' })),
  ]),
  transition(':leave', [
    style({ transform: 'translateX(0%)' }),
    animate('200ms ease-in', style({ transform: 'translateX(100%)' })),
  ]),
]);
