// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { By } from '@angular/platform-browser';
// import { MockComponents } from 'ng-mocks';
// import { BreadcrumbsComponent } from './breadcrumbs.component';
// import { LinkComponent } from '../link/link.component';
// import { IconComponent } from '../icon/icon.component';
// import { BodyTextComponent } from '../typography/body-text/body-text.component';

// describe('BreadcrumbsComponent', () => {
// 	let component: BreadcrumbsComponent;
// 	let fixture: ComponentFixture<BreadcrumbsComponent>;

// 	beforeEach(() => {
// 		TestBed.configureTestingModule({
// 			declarations: [BreadcrumbsComponent, LinkComponent, MockComponents(IconComponent, BodyTextComponent)],
// 			imports: [RouterTestingModule],
// 		});
// 		fixture = TestBed.createComponent(BreadcrumbsComponent);
// 		component = fixture.componentInstance;
// 	});

// 	it('should render the correct number of breadcrumb items', () => {
// 		// component.links = [
// 		// 	{ label: 'Components', url: '/components' },
// 		// 	{ label: 'Breadcrumbs', url: '/breadcrumbs' },
// 		// 	{ label: 'Breadcrumb', url: '/breadcrumbs/breadcrumb' },
// 		// ];
// 		fixture.detectChanges();
// 		const breadcrumbAnchors = fixture.debugElement.queryAll(By.css('a'));

// 		// Finds two link elements since the last one is always body-text element
// 		expect(breadcrumbAnchors.length).toBe(2);
// 	});

// 	it('should display the correct breadcrumb labels', () => {
// 		// component.links = [
// 		// 	{ label: 'Components', url: '/components' },
// 		// 	{ label: 'Breadcrumbs', url: '/breadcrumbs' },
// 		// ];
// 		fixture.detectChanges();
// 		const breadcrumbAnchorItems = fixture.debugElement.queryAll(By.css('a'));
// 		const breadcrumbTextItems = fixture.debugElement.queryAll(By.css('fudis-body-text'));

// 		expect(breadcrumbAnchorItems[0].nativeElement.textContent).toContain('Components');

// 		expect(breadcrumbTextItems[0].nativeElement.textContent).toContain('Breadcrumbs');
// 	});
// });
