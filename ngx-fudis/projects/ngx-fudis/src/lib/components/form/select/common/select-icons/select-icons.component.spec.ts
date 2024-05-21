import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectIconsComponent } from './select-icons.component';

// TODO write tests

describe('SelectIconsComponent', () => {
  let component: SelectIconsComponent;
  let fixture: ComponentFixture<SelectIconsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectIconsComponent],
    });
    fixture = TestBed.createComponent(SelectIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
