import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl } from '@angular/forms';
import { LocalizedTextGroupComponent } from './localized-text-group.component';
import { FudisLocalizedTextGroupOptions } from '../../../types/forms';
import { GuidanceComponent } from '../guidance/guidance.component';
import { FudisValidators } from '../../../utilities/form/validators';
import { SelectComponent } from '../select/select/select.component';
import { getElement } from '../../../utilities/tests/utilities';
import { LabelComponent } from '../label/label.component';
import { ChangeDetectionStrategy, SimpleChange } from '@angular/core';

const formGroupFirst: FormGroup = new FormGroup({
  finnish: new FormControl('', FudisValidators.required('Required in Finnish')),
  swedish: new FormControl(''),
  english: new FormControl('', FudisValidators.required('Required in English')),
});

const formGroupSecond = new FormGroup({
  klingon: new FormControl<string | null>(null),
  elvish: new FormControl<string | null>(null),
  dothraki: new FormControl<string | null>(null),
});

const optionsSecond: FudisLocalizedTextGroupOptions[] = [
  { controlName: 'klingon', label: 'KLI' },
  { controlName: 'elvish', label: 'ELV' },
  { controlName: 'dothraki', label: 'DOT' },
];

describe('LocalizedTextGroupComponent', () => {
  let component: LocalizedTextGroupComponent;
  let fixture: ComponentFixture<LocalizedTextGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LocalizedTextGroupComponent,
        LabelComponent,
        SelectComponent,
        GuidanceComponent,
      ],
    })
      .overrideComponent(LocalizedTextGroupComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
    fixture = TestBed.createComponent(LocalizedTextGroupComponent);
    component = fixture.componentInstance;
    component.formGroup = formGroupFirst;

    component.label = 'Label for testing purposes';
    component.ngOnChanges({
      label: new SimpleChange(undefined, 'Label for testing purposes', true),
      formGroup: new SimpleChange(undefined, formGroupFirst, true),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it.only('should have correct label', () => {
    const labelText = getElement(fixture, '.fudis-label__content__text').textContent;

    expect(labelText).toEqual('Label for testing purposes');
  });
});
