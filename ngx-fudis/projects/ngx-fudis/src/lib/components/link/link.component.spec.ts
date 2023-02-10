import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';
import { IconComponent } from '../icon/icon.component';
import { LinkComponent } from './link.component';

describe('LinkComponent', () => {
	let component: LinkComponent;
	let fixture: ComponentFixture<LinkComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LinkComponent, MockComponent(IconComponent)],
		})
			.overrideComponent(LinkComponent, {
				set: { changeDetection: ChangeDetectionStrategy.Default },
			})
			.compileComponents();

		fixture = TestBed.createComponent(LinkComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	describe('Regular link component', () => {
		it('should render linkTitle if it is given', () => {
			component.href = 'www.example.com';
			component.linkTitle = 'My link';
			fixture.detectChanges();
			const anchorElement = fixture.debugElement.query(By.css('.fudis-link__anchor'));
			expect(anchorElement.nativeNode.innerHTML).toEqual(' My link ');
		});

		it('should always have href', () => {
			component.href = '';
			fixture.detectChanges();
			expect(component).not.toBeTrue();
		});
	});

	describe('External link component', () => {
		it('should have external icon', () => {
			component.isExternalLink = true;
			fixture.detectChanges();
			const externalLinkComponent = fixture.debugElement.query(By.css('.fudis-link__anchor__external'));
			const iconExist = externalLinkComponent.query(By.css('fudis-icon'));
			expect(iconExist).toBeTruthy();
		});

		it('should have assistive aria-label for screen readers', () => {
			component.href = 'www.example.com';
			component.isExternalLink = true;
			component.externalLinkAriaLabel = 'Open into a new tab';
			fixture.detectChanges();
			const externalLinkComponent = fixture.debugElement.query(By.css('.fudis-link__anchor__external'));
			expect(externalLinkComponent.nativeElement.getAttribute('aria-label'))
				.withContext(component.externalLinkAriaLabel)
				.toEqual('www.example.com, Open into a new tab');
		});
	});
});
