import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { RadioButtonGroupComponent } from './radio-button-group.component';
import { FudisRadioButtonOption } from '../../../types/forms';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { FieldSetComponent } from '../fieldset/fieldset.component';
import { GuidanceComponent } from '../guidance/guidance.component';
import { FudisIdService } from '../../../services/id/id.service';

const testFormControl: FormControl = new FormControl('capybara');

const petOptions: FudisRadioButtonOption[] = [
  { value: 'platypus', label: 'Platypus', id: 'test-1', name: 'animal' },
  { value: 'otter', label: 'Otter', id: 'test-2', name: 'animal' },
  { value: 'capybara', label: 'Capybara', id: 'test-3', name: 'animal' },
];

const truthOption: FudisRadioButtonOption[] = [
  { value: true, label: 'true', id: 'test-truth', name: 'truth' },
];

describe('RadioButtonGroupComponent', () => {
  let component: RadioButtonGroupComponent;
  let fixture: ComponentFixture<RadioButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RadioButtonGroupComponent,
        RadioButtonComponent,
        MockComponent(FieldSetComponent),
        MockComponent(GuidanceComponent),
      ],
      providers: [FudisIdService],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioButtonGroupComponent);
    component = fixture.componentInstance;
    component.control = testFormControl;
    component.options = petOptions;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should throw an error if there is only one radio-button option available', () => {
      component.options = truthOption;
      fixture.detectChanges();
      const length = component.options.length as number;

      expect(() => {
        component.ngOnInit();
      }).toThrow(
        new Error(
          `Fudis-radio-button-group should have minimum of two options for radio buttons, but it only got ${length} option.`,
        ),
      );
    });
  });
});
