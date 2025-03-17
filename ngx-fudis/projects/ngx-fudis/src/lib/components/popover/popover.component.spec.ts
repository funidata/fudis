import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverComponent } from './popover.component';
import { By } from '@angular/platform-browser';

describe('PopoverComponent', () => {
  let component: PopoverComponent;
  let fixture: ComponentFixture<PopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopoverComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', 'popover-id');
    fixture.componentRef.setInput('popoverText', 'Additional information');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component successfully', () => {
    const popoverElement = fixture.debugElement.query(By.css('#popover-id'));
    expect(popoverElement?.nativeElement?.textContent).toEqual('Additional information');
    expect(popoverElement?.nativeElement?.id).toEqual('popover-id');
  });
});
