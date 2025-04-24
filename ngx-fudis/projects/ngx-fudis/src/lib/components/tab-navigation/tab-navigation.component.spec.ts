import { Component, Input } from '@angular/core';
import { TabNavigationBarComponent } from './tab-navigation-bar.component';
import { TabNavigationTabComponent } from './tab-navigation-tab.component';
import { TabNavigationPanelComponent } from './tab-navigation-panel.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  imports: [TabNavigationBarComponent, TabNavigationTabComponent, TabNavigationPanelComponent],
  selector: 'mock-tab-navigation-component',
  template: `<ng-container>
    <fudis-tab-navigation-bar [id]="'tab-bar-1'" [variant]="variant" [panel]="panel">
      <button fudis-tab-navigation-tab [active]="activeTabId === 'tab-1'" id="tab-1"></button>
      <button fudis-tab-navigation-tab [active]="activeTabId === 'tab-2'" id="tab-2"></button>
      <a fudis-tab-navigation-tab [active]="activeTabId === 'tab-3'" id="tab-3"></a>
    </fudis-tab-navigation-bar>
    <fudis-tab-navigation-panel id="panel-1" #panel> Something here </fudis-tab-navigation-panel>
  </ng-container>`,
})
class MockTabNavigationComponent {
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() activeTabId: string;
}

describe('TabNavigationComponent', () => {
  let fixture: ComponentFixture<MockTabNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockTabNavigationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MockTabNavigationComponent);
  });

  it('should set the required attributes', () => {
    fixture.componentRef.setInput('variant', 'secondary');
    fixture.componentRef.setInput('activeTabId', 'tab-3');
    fixture.detectChanges();

    const tabNavigationBarElement = getTabNavigationBarElement(fixture);
    const tabNavigationPanel = getTabNavigationPanelElement(fixture);

    expect(tabNavigationBarElement.nativeElement.id).toEqual('tab-bar-1');
    expect(tabNavigationBarElement.nativeElement.getAttribute('role')).toEqual('tablist');

    expect(tabNavigationPanel.nativeElement.id).toEqual('panel-1');
    expect(tabNavigationPanel.nativeElement.getAttribute('aria-labelledby')).toEqual('tab-3');
    expect(tabNavigationPanel.nativeElement.getAttribute('role')).toEqual('tabpanel');

    const tabNavigationTab1 = getTabNavigationTabElement(fixture, 'tab-1');
    const tabNavigationTab2 = getTabNavigationTabElement(fixture, 'tab-2');
    const tabNavigationTab3 = getTabNavigationTabElement(fixture, 'tab-3');

    expect(tabNavigationTab1.nativeElement.getAttribute('role')).toEqual('tab');
    expect(tabNavigationTab1.nativeElement.getAttribute('tabIndex')).toEqual('-1');
    expect(tabNavigationTab1.nativeElement.getAttribute('aria-selected')).toEqual('false');
    expect(tabNavigationTab1.nativeElement.getAttribute('aria-controls')).toEqual('panel-1');

    expect(tabNavigationTab2.nativeElement.getAttribute('role')).toEqual('tab');
    expect(tabNavigationTab2.nativeElement.getAttribute('tabIndex')).toEqual('-1');
    expect(tabNavigationTab2.nativeElement.getAttribute('aria-selected')).toEqual('false');
    expect(tabNavigationTab2.nativeElement.getAttribute('aria-controls')).toEqual('panel-1');

    expect(tabNavigationTab3.nativeElement.getAttribute('role')).toEqual('tab');
    expect(tabNavigationTab3.nativeElement.getAttribute('tabIndex')).toEqual('0');
    expect(tabNavigationTab3.nativeElement.getAttribute('aria-selected')).toEqual('true');
    expect(tabNavigationTab3.nativeElement.getAttribute('aria-controls')).toEqual('panel-1');
  });

  it('should update the required aria-attributes', () => {
    fixture.componentRef.setInput('variant', 'secondary');
    fixture.componentRef.setInput('activeTabId', 'tab-1');
    fixture.detectChanges();

    expect(
      getTabNavigationTabElement(fixture, 'tab-1').nativeElement.getAttribute('aria-selected'),
    ).toEqual('true');
    expect(
      getTabNavigationPanelElement(fixture).nativeElement.getAttribute('aria-labelledby'),
    ).toEqual('tab-1');

    fixture.componentRef.setInput('activeTabId', 'tab-2');
    fixture.detectChanges();

    expect(
      getTabNavigationTabElement(fixture, 'tab-1').nativeElement.getAttribute('aria-selected'),
    ).toEqual('false');
    expect(
      getTabNavigationTabElement(fixture, 'tab-2').nativeElement.getAttribute('aria-selected'),
    ).toEqual('true');
    expect(
      getTabNavigationPanelElement(fixture).nativeElement.getAttribute('aria-labelledby'),
    ).toEqual('tab-2');
  });
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getTabNavigationBarElement = (fixture: ComponentFixture<any>) =>
  fixture.debugElement.query(By.css('fudis-tab-navigation-bar'));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getTabNavigationTabElement = (fixture: ComponentFixture<any>, id: string) =>
  fixture.debugElement.query(By.css(`#${id}`));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getTabNavigationPanelElement = (fixture: ComponentFixture<any>) =>
  fixture.debugElement.query(By.css('fudis-tab-navigation-panel'));
