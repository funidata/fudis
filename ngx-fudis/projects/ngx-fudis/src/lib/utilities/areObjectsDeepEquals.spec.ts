import { areObjectsDeepEquals } from './areObjectsDeepEquals';

const first = {
  value: 'some-value',
  label: 'Some Label',
  otherStuff: {
    nestedProp: ['first', 'second'],
    important: true,
    deeperNested: {
      secret: 'No, I am your father.',
    },
  },
};

const firstCopy = first;

const second = {
  label: 'Some Label',
  value: 'some-value',
  otherStuff: {
    nestedProp: ['first', 'second'],
    deeperNested: {
      secret: 'No, I am your father.',
    },
    important: true,
  },
};

const almostFirst = {
  value: 'some-value',
  label: 'Some Label',
  otherStuff: {
    nestedProp: ['first', 'second'],
    important: true,
    deeperNested: {
      secret: 'Luke, I am your father.',
    },
  },
};

describe('areObjectsDeepEquals', () => {
  it('should return true, if objects are actually same objects', () => {
    const result = areObjectsDeepEquals(first, firstCopy);
    expect(result).toBeTruthy();
  });

  it('should return true, if objects have same properties, but different objects', () => {
    const result = areObjectsDeepEquals(first, second);
    expect(result).toBeTruthy();
  });

  it('should not return true, if objects do not have same properties', () => {
    const result = areObjectsDeepEquals(first, almostFirst);
    expect(result).toBeFalsy();
  });
});
