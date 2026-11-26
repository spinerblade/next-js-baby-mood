import { describe, expect, test } from '@jest/globals';
import { formatHeight, formatWeight, getDisplayName } from '../format';

describe('getDisplayName', () => {
  test('returns the first name and last name, because they are set', () => {
    const person = {
      username: 'max94',
      firstName: 'Max',
      lastName: 'Mustermann',
    };
    expect(getDisplayName(person)).toBe('Max Mustermann');
  });

  test('returns the username, because first and last name are not set', () => {
    const person = {
      username: 'max94',
      firstName: null,
      lastName: null,
    };
    expect(getDisplayName(person)).toBe('max94');
  });

  test('returns the username, because first and last name are empty', () => {
    const person = {
      username: 'max94',
      firstName: '',
      lastName: '',
    };
    expect(getDisplayName(person)).toBe('max94');
  });

  test('returns only the first name, because first name is set without last name', () => {
    const person = {
      username: 'max94',
      firstName: 'Max',
      lastName: null,
    };
    expect(getDisplayName(person)).toBe('Max');
  });
});

describe('formatWeight', () => {
  test('formats the weight from grams to kg and rounds down to 2 decimals', () => {
    const baby = {
      name: 'daniel',
      weight: 8572,
      height: 74,
    };
    expect(formatWeight(baby.weight)).toBe('8,57 kg');
  });

  test('formats the weight from grams to kg and rounds up to 2 decimals', () => {
    const baby = {
      name: 'daniel',
      weight: 6779,
      height: 74,
    };
    expect(formatWeight(baby.weight)).toBe('6,78 kg');
  });

  test('formats the weight from grams to kg and rounds to whole number without trailing zeroes', () => {
    const baby = {
      name: 'daniel',
      weight: 4000,
      height: 74,
    };
    expect(formatWeight(baby.weight)).toBe('4 kg');
  });
});

describe('formatHeight', () => {
  test('appends "cm" to the height', () => {
    const baby = {
      name: 'daniel',
      weight: 8572,
      height: 74,
    };
    expect(formatHeight(baby.height)).toBe('74 cm');
  });
});
