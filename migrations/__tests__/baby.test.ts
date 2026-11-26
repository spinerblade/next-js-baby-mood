import { babySchema } from '@/migrations/00004-createTableBabies';
import { describe, expect, test } from '@jest/globals';

// HTML forms send every value as a string
const validBaby = {
  name: 'daniel',
  birthDate: '2025-03-14',
  weight: '3200',
  height: '52',
  genderId: '1',
};

describe('babySchema', () => {
  test('accepts a valid baby and converts form strings to numbers', () => {
    const result = babySchema.safeParse({ baby: validBaby });
    expect(result.success).toBe(true);
    expect(result.data?.baby.weight).toBe(3200);
    expect(result.data?.baby.height).toBe(52);
    expect(result.data?.baby.genderId).toBe(1);
  });

  test('capitalizes the first letter of the name', () => {
    const result = babySchema.safeParse({ baby: validBaby });
    expect(result.data?.baby.name).toBe('Daniel');
  });

  test.each([
    ['name', '   ', 'Name must be minimum 1 character'],
    ['weight', '3200.5', 'Weight must be a whole number in grams'],
    ['weight', '30001', 'Weight must be maximum 30000 grams'],
    ['height', '0', 'Height must be at least 1 centimeter'],
    ['genderId', '', 'Please choose a gender'],
  ])('rejects invalid %s "%s"', (field, value, expectedMessage) => {
    const result = babySchema.safeParse({
      baby: { ...validBaby, [field]: value },
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe(expectedMessage);
  });

  test('rejects a birth date in the future', () => {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const result = babySchema.safeParse({
      baby: { ...validBaby, birthDate: tomorrow },
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe(
      'Birthdate can not be in the future',
    );
  });
});
