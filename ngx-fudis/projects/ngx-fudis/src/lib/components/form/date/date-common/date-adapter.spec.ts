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
      const notDateString = parseDate('hello.1.2024');
      const invalidDay = parseDate('200.5.2024');
      const invalidMonth = parseDate('20.55.2024');
      const invalidYear = parseDate('20.5.12');
      const anotherInvalidYear = parseDate('20.2.024');

      expect(notDateString).toBeNull();
      expect(adapter.isDateInstance(notDateString)).toBe(false);

      expect(invalidDay).toBeNull();
      expect(adapter.isDateInstance(invalidDay)).toBe(false);

      expect(invalidMonth).toBeNull();
      expect(adapter.isDateInstance(invalidMonth)).toBe(false);

      expect(invalidYear).toBeNull();
      expect(adapter.isDateInstance(invalidYear)).toBe(false);

      expect(anotherInvalidYear).toBeNull();
      expect(adapter.isDateInstance(anotherInvalidYear)).toBe(false);
    });

    it('should not accept overflown dates and return null', () => {
      const nonLeapYearDate = '29.2.2023'
      const leapYearDate = '29.2.2024';
      const nonValidDay = '32.1.2024';

      expect(parseDate(nonLeapYearDate)).toBeNull();
      expect(parseDate(leapYearDate)).toEqual(new Date(2024, 1, 29));
      expect(parseDate(nonValidDay)).toBeNull();
    });
  });
});
