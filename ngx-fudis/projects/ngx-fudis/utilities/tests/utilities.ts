import { ComponentFixture } from '@angular/core/testing';

export function sortClasses(classes: string): string[] {
	return classes.split(' ').sort();
}

export function getElement(fixture: ComponentFixture<unknown>, query: string): HTMLElement {
	return fixture.nativeElement.querySelector(query) as HTMLElement;
}
