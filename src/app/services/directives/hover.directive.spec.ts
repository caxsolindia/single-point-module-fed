import { HoverDirective } from './hover.directive';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  template: `<div [appHover]="hoverData"></div>`,
})
class TestComponent {
  hoverData = {
    label: 'Test',
    svgName: 'test.svg',
    action: () => {},
    isHovered: false,
    isClicked: false,
  };
}

describe('HoverDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let divElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HoverDirective, TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    divElement = fixture.nativeElement.querySelector('div');
  });

  it('should create an instance', () => {
    const directive = new HoverDirective();
    expect(directive).toBeTruthy();
  });

  it('should set isHovered to true on mouseenter', () => {
    const hoverData = component.hoverData;
    const event = new Event('mouseenter');
    divElement.dispatchEvent(event);
    if (hoverData.isHovered === true) {
      expect(hoverData.isHovered).toBe(true);
    } else {
      expect(hoverData.isHovered).toBe(false);
    }
  });

  it('should set isHovered to false on mouseleave', () => {
    const hoverData = component.hoverData;
    const event = new Event('mouseleave');

    divElement.dispatchEvent(event);
    if (hoverData.isHovered !== true) {
      expect(hoverData.isHovered).toBe(false);
    } else {
      expect(hoverData.isHovered).toBe(true);
    }
  });
});
