import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectChipListComponent } from './multiselect-chip-list.component';

describe('MultiselectChipListComponent', () => {
  let component: MultiselectChipListComponent;
  let fixture: ComponentFixture<MultiselectChipListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultiselectChipListComponent],
    });
    fixture = TestBed.createComponent(MultiselectChipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
