import { expect, test } from '@playwright/test';

test('two users sign up and connect as partners', async ({ page }) => {
  const userA = `usera${Date.now()}`;
  const userB = `userb${Date.now()}`;
  const password = 'secret1234';
  const logoutButton = page.getByRole('button', { name: 'Logout' });

  // 1. Sign up user A
  await page.goto('/signUp');
  await page.getByLabel('Username').fill(userA);
  await page.getByLabel('Password').fill(password);
  await page.getByLabel('Email').fill(`${userA}@example.com`);
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await expect(page).toHaveURL('/onboarding');

  await logoutButton.click();
  await expect(logoutButton).toBeHidden();

  // 2. Sign up user B
  await page.goto('/signUp');
  await page.getByLabel('Username').fill(userB);
  await page.getByLabel('Password').fill(password);
  await page.getByLabel('Email').fill(`${userB}@example.com`);
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await expect(page).toHaveURL('/onboarding');

  await logoutButton.click();
  await expect(logoutButton).toBeHidden();

  // 3. User B logs in, searches for A and sends a request
  await page.goto('/login');
  await page.getByLabel('Username').fill(userB);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page).toHaveURL('/onboarding');

  await page.getByLabel('Partner Username').fill(userA);
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(
    page.getByText(`${userA} exists and is already signed up`),
  ).toBeVisible();

  await page.getByRole('button', { name: 'Send request' }).click();
  await expect(page.getByText(`Request sent to ${userA}`)).toBeVisible();

  await logoutButton.click();
  await expect(logoutButton).toBeHidden();

  // 4. User A logs in and accepts the request
  await page.goto('/login');
  await page.getByLabel('Username').fill(userA);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page).toHaveURL('/onboarding');

  await expect(
    page.getByRole('heading', { name: 'New Request' }),
  ).toBeVisible();
  await expect(page.getByText(userB)).toBeVisible();
  await page.getByRole('button', { name: 'Accept' }).click();

  // Connected: the baby form replaces the partner search
  await expect(
    page.getByRole('heading', { name: "Set up your Baby's Information" }),
  ).toBeVisible();
});
