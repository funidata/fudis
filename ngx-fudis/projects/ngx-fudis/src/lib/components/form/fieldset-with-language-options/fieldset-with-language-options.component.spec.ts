import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsetWithLanguageOptionsComponent } from './fieldset-with-language-options.component';

describe('FieldsetWithLanguageOptionsComponent', () => {
  let component: FieldsetWithLanguageOptionsComponent;
  let fixture: ComponentFixture<FieldsetWithLanguageOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldsetWithLanguageOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldsetWithLanguageOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
