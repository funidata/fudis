import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FudisFocusService } from './focus.service';
import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { IconComponent } from '../../components/icon/icon.component';
import { LinkDirective } from '../../directives/link/link.directive';
import { FudisIdService } from '../id/id.service';
import { FudisTranslationService } from '../translation/translation.service';

@Component({
  selector: 'fudis-mock-component',
  template: `<div class="mock-container">
    <a
      fudisLink
      (focus)="handleFocus('fudis-link-1')"
      [title]="'First link'"
      [initialFocus]="true"
      [href]="'/'"
    ></a>
    <a
      fudisLink
      *ngIf="secondLinkVisible"
      (focus)="handleFocus('fudis-link-2')"
      [initialFocus]="true"
      [title]="'Second link'"
      [href]="'/'"
    ></a>
  </div>`,
})
class MockFocusComponent {
  secondLinkVisible = false;

  focusedId: string;

  handleFocus(id: string) {
    this.focusedId = id;
  }
}

describe('FudisFocusService', () => {
  let component: MockFocusComponent;
  let service: FudisFocusService;
  let fixture: ComponentFixture<MockFocusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockFocusComponent, ButtonComponent, IconComponent, LinkDirective],
      providers: [FudisFocusService, FudisIdService, FudisTranslationService],
    });

    fixture = TestBed.createComponent(MockFocusComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(FudisFocusService);
    service.addToIgnoreList('fudis-link-2');
    fixture.detectChanges();
  });

  describe('Basic functionality', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('getFocusTarget and setFocusTarget', () => {
      expect(service.getFocusTarget()).toEqual(undefined);

      const newButton: HTMLButtonElement = document.createElement('button');
      newButton.textContent = 'Click me!';
      newButton.setAttribute('id', 'target-button-id');

      service.setFocusTarget(newButton);

      expect(service.getFocusTarget()).toEqual(newButton);
    });

    it('ignoreList functionality', () => {
      expect(service.getIgnoreList()).toEqual(['fudis-link-2']);

      service.addToIgnoreList('ignore-1');
      service.addToIgnoreList('ignore-1');
      service.addToIgnoreList('ignore-1');
      service.addToIgnoreList('ignore-2');
      service.addToIgnoreList('ignore-3');
      service.removeFromIgnoreList('ignore-2');
      service.removeFromIgnoreList('mistyped-ingore-1');

      expect(service.isIgnored('ignore-1')).toEqual(true);
      expect(service.isIgnored('ignore-2')).toEqual(false);

      expect(service.getIgnoreList()).toEqual(['fudis-link-2', 'ignore-1', 'ignore-3']);
    });
  });

  describe('Service with components', () => {
    it('should focus to non-ignored link on init', () => {
      expect(component.focusedId).toEqual('fudis-link-1');
    });

    it('should not focus to ignored link when link is set visible', () => {
      component.secondLinkVisible = true;
      fixture.detectChanges();

      expect(component.focusedId).toEqual('fudis-link-1');
    });

    it('should focus to second link when it is removed from ignored list and set visible', () => {
      service.removeFromIgnoreList('fudis-link-2');
      component.secondLinkVisible = true;
      fixture.detectChanges();

      expect(component.focusedId).toEqual('fudis-link-2');
    });
  });
});
