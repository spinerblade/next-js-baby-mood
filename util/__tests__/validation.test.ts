import { describe, expect, test } from '@jest/globals';
import { getSafeReturnToPath } from '../validation';

describe('getSafeReturnToPath', () => {
  test.each(['/dashboard', '/profile/max94', '/achievements?baby=2'])(
    'accepts %s',
    (path) => {
      expect(getSafeReturnToPath(path)).toBe(path);
    },
  );

  test.each([
    'https://evil.com',
    '//evil.com',
    '/login',
    '/logout',
    '/dashboard?returnTo=/login',
    '/',
  ])('rejects %s', (path) => {
    expect(getSafeReturnToPath(path)).toBeUndefined();
  });

  test('rejects undefined', () => {
    expect(getSafeReturnToPath(undefined)).toBeUndefined();
  });

  test('rejects an array of paths', () => {
    expect(getSafeReturnToPath(['/dashboard'])).toBeUndefined();
  });

  test('rejects paths with uppercase letters', () => {
    expect(getSafeReturnToPath('/signUp')).toBeUndefined();
    expect(getSafeReturnToPath('/profile/Max94')).toBeUndefined();
  });
});
