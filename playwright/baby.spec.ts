import { expect, test } from '@playwright/test';

test('connected partners set up a baby and see it on the dashboard', async ({
  page,
}) => {
  const userA = `babya${Date.now()}`;
  const userB = `babyb${Date.now()}`;
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

  // 2. Sign up user B and send a request to A
  await page.goto('/signUp');
  await page.getByLabel('Username').fill(userB);
  await page.getByLabel('Password').fill(password);
  await page.getByLabel('Email').fill(`${userB}@example.com`);
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await expect(page).toHaveURL('/onboarding');

  await page.getByLabel('Partner Username').fill(userA);
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByRole('button', { name: 'Send request' }).click();
  await expect(page.getByText(`Request sent to ${userA}`)).toBeVisible();

  await logoutButton.click();

  // 3. User A logs in and accepts
  await page.goto('/login');
  await page.getByLabel('User Name').fill(userA);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page).toHaveURL('/onboarding');
  await page.getByRole('button', { name: 'Accept' }).click();

  // 4. Fill in the baby form
  await page.getByLabel("Baby's Name").fill('daniel');
  await page.getByLabel("Baby's Gender").selectOption('Male');
  await page.getByLabel("Baby's Birthdate").fill('2025-03-14');
  await page.getByLabel("Baby's current weight").fill('3200');
  await page.getByLabel("Baby's current height").fill('52');
  await page.getByRole('button', { name: 'Submit' }).click();

  // The schema capitalizes the name
  await expect(page.getByText('Daniel was added!')).toBeVisible();

  // 5. The dashboard shows the baby
  await page.getByRole('button', { name: 'Go to dashboard' }).click();
  await expect(page).toHaveURL('/dashboard');

  const sidebar = page.getByRole('complementary');
  await expect(sidebar.getByText('Daniel')).toBeVisible();
  await expect(sidebar.getByText('3,2 kg')).toBeVisible();
  await expect(sidebar.getByText('52 cm')).toBeVisible();
});
