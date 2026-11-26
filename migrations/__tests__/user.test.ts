import { userSchemaSignUp } from '@/migrations/00000-createTableUsers';
import { describe, expect, test } from '@jest/globals';

const validUser = {
  username: 'max94',
  password: 'supersecret',
  email: 'max@example.com',
};

describe('userSchemaSignUp', () => {
  test('accepts a valid user', () => {
    const result = userSchemaSignUp.safeParse({ user: validUser });
    expect(result.success).toBe(true);
  });

  test.each([
    ['username', 'ab', 'Username must be minimum 3 characters'],
    ['username', 'a'.repeat(21), 'Username must be maximum 20 characters'],
    ['password', '1234567', 'Password must be minimum 8 characters'],
    ['email', 'not-an-email', 'Email format is not valid'],
  ])('rejects invalid %s "%s"', (field, value, expectedMessage) => {
    const result = userSchemaSignUp.safeParse({
      user: { ...validUser, [field]: value },
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe(expectedMessage);
  });

  test('rejects data without the user wrapper', () => {
    const result = userSchemaSignUp.safeParse(validUser);
    expect(result.success).toBe(false);
  });

  test('rejects a username that is too short after trimming', () => {
    const result = userSchemaSignUp.safeParse({
      user: { ...validUser, username: '  ab  ' },
    });
    expect(result.success).toBe(false);
  });
});
