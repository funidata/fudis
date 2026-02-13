/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconComponent } from '../icon/icon.component';
import { TabNavigationBarComponent } from './tab-navigation-bar.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('TabNavigationBarComponent', () => {
  let component: TabNavigationBarComponent;
  let fixture: ComponentFixture<TabNavigationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabNavigationBarComponent, IconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', 'tab-bar-1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.variant).toEqual('primary');
    expect(component.id).toEqual('tab-bar-1');
    expect((component as any)._resizeObserver.observe).toHaveBeenCalledTimes(1);
    expect((component as any)._scrollSubscription.closed).toEqual(false);
  });

  it('should destroy', () => {
    fixture.destroy();
    expect((component as any)._resizeObserver.disconnect).toHaveBeenCalledTimes(1);
    expect((component as any)._scrollSubscription.closed).toEqual(true);
  });
});
