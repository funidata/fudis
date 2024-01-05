import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export function sortClasses(classes: string): string[] {
  return classes.split(' ').sort();
}

export function getElement(fixture: ComponentFixture<unknown>, query: string): HTMLElement {
  return fixture.nativeElement.querySelector(query) as HTMLElement;
}

// TODO: Directive typing
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getDirective(fixture: ComponentFixture<unknown>, directive: any) {
  return fixture.debugElement.queryAll(By.directive(directive));
}
