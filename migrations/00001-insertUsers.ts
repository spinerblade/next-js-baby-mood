import type { Sql } from 'postgres';
import type { User } from './00000-createTableUsers';

export const users: User[] = [
  {
    id: 1,
    username: 'pixel_pioneer',
    firstName: 'Anna',
    lastName: 'Kovacs',
    birthDate: new Date('1994-03-12'),
    passwordHash:
      '$2b$10$abcdefghijklmnopqrstuuK3dYh0m1Zq8w9XvJ5eR2nLpTcA7sB6y',
    email: 'anna.kovacs@example.com',
    createdAt: new Date('2026-09-01T09:15:00Z'),
    updatedAt: new Date('2026-09-01T09:15:00Z'),
    profilePictureLink: 'https://example.com/avatars/pixel_pioneer.jpg',
  },
  {
    id: 2,
    username: 'neon_nomad',
    firstName: 'Max',
    lastName: 'Müller',
    birthDate: new Date('1989-11-27'),
    passwordHash:
      '$2b$10$zyxwvutsrqponmlkjihgfeP4oN2vB8cX1dQ6uH9tL3kRsYa5mWe0i',
    email: 'max.mueller@example.com',
    createdAt: new Date('2026-09-14T14:30:00Z'),
    updatedAt: new Date('2026-10-02T08:05:00Z'),
    profilePictureLink: 'https://example.com/avatars/neon_nomad.jpg',
  },
  {
    id: 3,
    username: 'cosmic_quokka',
    firstName: 'Lena',
    lastName: 'Schmid',
    birthDate: new Date('1997-07-05'),
    passwordHash:
      '$2b$10$mnbvcxzlkjhgfdsapoiuyt7R5eW3qA9sD2fG4hJ6kL8zXcVbN1mQ0',
    email: 'lena.schmid@example.com',
    createdAt: new Date('2026-10-10T18:45:00Z'),
    updatedAt: new Date('2026-10-10T18:45:00Z'),
    profilePictureLink: 'https://example.com/avatars/cosmic_quokka.jpg',
  },
  {
    id: 4,
    username: 'turbo_tapir',
    firstName: 'Jonas',
    lastName: 'Weber',
    birthDate: new Date('2001-01-19'),
    passwordHash:
      '$2b$10$qazwsxedcrfvtgbyhnujmiK9lO3pA5sD7fG1hJ4kL6zXcVbN8mQ2w',
    email: 'jonas.weber@example.com',
    createdAt: new Date('2026-10-22T11:20:00Z'),
    updatedAt: new Date('2026-10-25T16:40:00Z'),
    profilePictureLink: 'https://example.com/avatars/turbo_tapir.jpg',
  },
];

export async function up(sql: Sql) {
  for (const user of users) {
    await sql`
  INSERT INTO
  users (
    username,
    first_name,
    last_name,
    birth_date,
    password_hash,
    email,
    created_at,
    updated_at,
    profile_picture_link
  )
  VALUES
    (
    ${user.username},
    ${user.firstName},
    ${user.lastName},
    ${user.birthDate},
    ${user.passwordHash},
    ${user.email},
    ${user.createdAt},
    ${user.updatedAt},
    ${user.profilePictureLink}

    )
  `;
  }
}

export async function down(sql: Sql) {
  for (const user of users) {
    await sql`
      DELETE FROM users
      WHERE
        id = ${user.id}
    `;
  }
}
