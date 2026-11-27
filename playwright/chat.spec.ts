import { expect, test } from '@playwright/test';

test('a user sends a mood and the partner receives it', async ({ page }) => {
  const userA = `chata${Date.now()}`;
  const userB = `chatb${Date.now()}`;
  const password = 'secret1234';
  const moodDescription = 'Happy';
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

  // 3. User A logs in, accepts and adds a baby
  await page.goto('/login');
  await page.getByLabel('User Name').fill(userA);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page).toHaveURL('/onboarding');
  await page.getByRole('button', { name: 'Accept' }).click();

  await page.getByLabel("Baby's Name").fill('daniel');
  await page.getByLabel("Baby's Gender").selectOption('Male');
  await page.getByLabel("Baby's Birthdate").fill('2025-03-14');
  await page.getByLabel("Baby's current weight").fill('3200');
  await page.getByLabel("Baby's current height").fill('52');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Daniel has joined the chat! 😎')).toBeVisible();

  // 4. User A creates a mood on the profile page
  await page.goto(`/profile/${userA}`);
  await page.getByLabel('Mood description').fill(moodDescription);
  await page.getByLabel('Mood type').selectOption('positive');
  await page.getByLabel('Mood emoji').selectOption('😊');
  await page.getByRole('button', { name: 'Create Mood' }).click();
  await expect(page.getByText('Mood added!')).toBeVisible();

  // 5. User A sends it from the dashboard
  await page.goto('/dashboard');
  await page.getByRole('button', { name: moodDescription }).click();
  await expect(
    page.getByRole('listitem').filter({ hasText: moodDescription }),
  ).toBeVisible();

  await logoutButton.click();

  // 6. User B logs in and sees the mood from A
  await page.goto('/login');
  await page.getByLabel('User Name').fill(userB);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page).toHaveURL('/dashboard');

  const receivedMood = page
    .getByRole('listitem')
    .filter({ hasText: moodDescription });
  await expect(receivedMood).toBeVisible();
  await expect(receivedMood.getByText(userA)).toBeVisible();
});
