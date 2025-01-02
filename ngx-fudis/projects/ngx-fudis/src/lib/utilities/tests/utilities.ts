import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// Splits given string from spaces, pushes individual items to array and sorts them alphabetically. Used to parse CSS class string to check if it matches with classlist where classes might be in different order.
export function sortClasses(classes: string): string[] {
  return classes.split(' ').sort();
}

// Searches and returns HTMLElement from the fixture with query. E. g. `getElement(myFixture, '.fudis-button')` or E. g. `getElement(myFixture, '#fudis-button-1')`
export function getElement(fixture: ComponentFixture<unknown>, query: string): HTMLElement {
  return fixture.nativeElement.querySelector(query) as HTMLElement;
}

// Searches and returns all HTMLElements from the fixture with query. E. g. `getAllElements(myFixture, '.fudis-button')`
export function getAllElements(fixture: ComponentFixture<unknown>, query: string): NodeList {
  return fixture.nativeElement.querySelectorAll(query);
}

// Searches and returns Directive element from the fixture with query. E. g. `getDirective(myFixture, GridItemDirective)`
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getDirective(fixture: ComponentFixture<unknown>, directive: any) {
  return fixture.debugElement.queryAll(By.directive(directive));
}
