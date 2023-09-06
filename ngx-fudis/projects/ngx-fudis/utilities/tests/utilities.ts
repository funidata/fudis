import { ComponentFixture } from '@angular/core/testing';

export function checkClasses(element: Element | HTMLElement | null, classes: string): boolean {
	if (element) {
		const sortedElementClasses = JSON.stringify(element.className.split(' ').sort());

		const sortedTestClasses = JSON.stringify(classes.split(' ').sort());

		if (sortedElementClasses !== sortedTestClasses) {
			// eslint-disable-next-line no-console
			console.log(`Given element's classes are: ${element.className.split(' ').sort()}`);

			// eslint-disable-next-line no-console
			console.log(`Classes to match are: ${classes.split(' ').sort()}`);
		}

		return sortedElementClasses === sortedTestClasses;
	}
	return false;
}

export function sortClasses(classes: string): string[] {
	return classes.split(' ').sort();
}

export function getElement(fixture: ComponentFixture<unknown>, query: string): HTMLElement {
	return fixture.nativeElement.querySelector(query) as HTMLElement;
}
