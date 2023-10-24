import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { LinkComponent } from '../link/link.component';

describe('BreadcrumbsComponent', () => {
	let component: BreadcrumbsComponent;
	let fixture: ComponentFixture<BreadcrumbsComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [BreadcrumbsComponent, LinkComponent],
			imports: [RouterTestingModule],
		});
		fixture = TestBed.createComponent(BreadcrumbsComponent);
		component = fixture.componentInstance;
	});

	it('should render the correct number of breadcrumb items', () => {
		component.links = [
			{ label: 'Components', url: '/components' },
			{ label: 'Breadcrumbs', url: '/breadcrumbs' },
			{ label: 'Breadcrumb', url: '/breadcrumbs/breadcrumb' },
		];
		fixture.detectChanges();
		const breadcrumbAnchors = fixture.debugElement.queryAll(By.css('a'));

		expect(breadcrumbAnchors.length).toBe(3);
	});

	it('should display the correct breadcrumb labels', () => {
		component.links = [
			{ label: 'Components', url: '/components' },
			{ label: 'Breadcrumbs', url: '/breadcrumbs' },
		];
		fixture.detectChanges();
		const breadcrumbItems = fixture.debugElement.queryAll(By.css('a'));

		expect(breadcrumbItems[0].nativeElement.textContent).toContain('Components');

		expect(breadcrumbItems[1].nativeElement.textContent).toContain('Breadcrumbs');
	});

	it('should disable the last breadcrumb item', () => {
		component.links = [
			{ label: 'Components', url: '/components' },
			{ label: 'Breadcrumbs', url: '/breadcrumbs' },
		];
		fixture.detectChanges();

		const breadcrumbAnchors = fixture.debugElement.queryAll(By.css('a'));

		expect(
			breadcrumbAnchors[breadcrumbAnchors.length - 1].nativeElement.classList.contains('fudis-link__anchor--disabled')
		).toBeTruthy();
	});
});
