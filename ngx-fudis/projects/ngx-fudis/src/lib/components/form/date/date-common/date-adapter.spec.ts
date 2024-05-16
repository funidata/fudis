import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { NativeDateModule } from '@angular/material/core';
import { FudisDateAdapter } from './date-adapter';
import { parseDate } from './utilities';

describe('FudisDateAdapter', () => {
  let adapter: FudisDateAdapter;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NativeDateModule],
      providers: [FudisDateAdapter],
    }).compileComponents();
  }));

  beforeEach(inject([FudisDateAdapter], (dateAdapter: FudisDateAdapter) => {
    adapter = dateAdapter;
  }));

  it('should get first day of the week as Monday', () => {
    expect(adapter.getFirstDayOfWeek()).toEqual(1);
  });

  it('should format standard date', () => {
    expect(adapter.format(new Date(2024, 5, 20), {})).toEqual('6/20/2024');
  });

  it('should format string date', () => {
    expect(adapter.format(new Date('2024-05-20'), {})).toEqual('5/20/2024');
  });

  it('should format with different locales', () => {
    const availableLocales: string[] = ['fi-FI', 'sv-SE', 'en-GB'];

    availableLocales.forEach((locale) => {
      adapter.setLocale(locale);

      if (locale === 'fi-FI') {
        expect(adapter.format(new Date(2024, 5, 20), {})).toEqual('20.6.2024');
      } else if (locale === 'sv-SE') {
        expect(adapter.format(new Date(2024, 5, 20), {})).toEqual('2024-06-20');
      } else if (locale === 'en-GB') {
        expect(adapter.format(new Date(2024, 5, 20), {})).toEqual('20/06/2024');
      }
    });
  });

  it('should throw error when attempting to format invalid date', () => {
    expect(() => adapter.format(new Date(NaN), {})).toThrow(
      'FudisDateAdapter: Cannot format invalid date.',
    );
  });

  describe('Parse Date utility', () => {
    it('should parse string date', () => {
      expect(parseDate('20.5.2024')).toEqual(new Date(2024, 4, 20));
      expect(parseDate('20/5/2024')).toEqual(new Date(2024, 4, 20));
      expect(parseDate('20-5-2024')).toEqual(new Date(2024, 4, 20));
    });

    it('should parse string date without year and default it to current year', () => {
      const currentYear: number = new Date().getFullYear();

      expect(parseDate('20.5')).toEqual(new Date(currentYear, 4, 20));
    });

    it('should parse invalid string value as null', () => {
      const notDateString = parseDate('hello');

      expect(notDateString).toBeNull();
      expect(adapter.isDateInstance(notDateString)).toBe(false);
    });

    it('should consider leap year when parsing and return null', () => {
      const leapYearDate = new Date(2023, 1, 29).toString();

      expect(parseDate(leapYearDate)).toBeNull();
    });
  });
});
