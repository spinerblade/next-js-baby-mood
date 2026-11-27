import { expect, test } from '@playwright/test';

test('signs up a new user and redirects to onboarding', async ({ page }) => {
  const username = `user${Date.now()}`;

  await page.goto('/signUp');

  await page.getByLabel('Username').fill(username);
  await page.getByLabel('Password').fill('secret1234');
  await page.getByLabel('Email').fill(`${username}@example.com`);
  await page.getByRole('button', { name: 'Sign Up' }).click();

  await expect(page).toHaveURL('/onboarding');
  await expect(
    page.getByRole('heading', { name: 'Setup your Account details' }),
  ).toBeVisible();
});

const invalidSignUps = [
  {
    field: 'username',
    username: 'ab',
    password: 'secret1234',
    email: 'max@example.com',
    error: 'Username must be minimum 3 characters',
  },
  {
    field: 'password',
    username: 'max94',
    password: 'secret1',
    email: 'max@example.com',
    error: 'Password must be minimum 8 characters',
  },
  {
    field: 'email',
    username: 'max94',
    password: 'secret1234',
    email: 'max@example',
    error: 'Email format is not valid',
  },
];

for (const invalidSignUp of invalidSignUps) {
  test(`shows an error for an invalid ${invalidSignUp.field}`, async ({
    page,
  }) => {
    await page.goto('/signUp');

    await page.getByLabel('Username').fill(invalidSignUp.username);
    await page.getByLabel('Password').fill(invalidSignUp.password);
    await page.getByLabel('Email').fill(invalidSignUp.email);
    await page.getByRole('button', { name: 'Sign Up' }).click();

    await expect(page.getByText(invalidSignUp.error)).toBeVisible();
    await expect(page).toHaveURL('/signUp');
  });
}
