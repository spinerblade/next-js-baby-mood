import type { Sql } from 'postgres';
import type { Baby } from './00004-createTableBabies';

export const babies: Baby[] = [
  {
    id: 1,
    userId: 1,
    name: 'Mia',
    birthDate: new Date('2026-02-14'),
    weight: 5200,
    height: 58,
    genderId: 2,
    createdAt: new Date('2026-09-01T09:20:00Z'),
    updatedAt: new Date('2026-09-01T09:20:00Z'),
    energy: 80,
    profilePictureLink: 'https://example.com/babies/mia.jpg',
    latestPictureLink: 'https://example.com/babies/mia-latest.jpg',
  },
  {
    id: 2,
    userId: 2,
    name: 'Leo',
    birthDate: new Date('2025-11-03'),
    weight: 7400,
    height: 66,
    genderId: 1,
    createdAt: new Date('2026-09-14T14:35:00Z'),
    updatedAt: new Date('2026-10-02T08:10:00Z'),
    energy: 65,
    profilePictureLink: 'https://example.com/babies/leo.jpg',
    latestPictureLink: null,
  },
  {
    id: 3,
    userId: 2,
    name: 'Emil',
    birthDate: new Date('2026-06-20'),
    weight: 3900,
    height: 52,
    genderId: 1,
    createdAt: new Date('2026-09-14T14:40:00Z'),
    updatedAt: new Date('2026-09-14T14:40:00Z'),
    energy: 40,
    profilePictureLink: null,
    latestPictureLink: null,
  },
  {
    id: 4,
    userId: 3,
    name: 'Sophie',
    birthDate: new Date('2025-09-28'),
    weight: 8100,
    height: 70,
    genderId: 2,
    createdAt: new Date('2026-10-10T18:50:00Z'),
    updatedAt: new Date('2026-10-10T18:50:00Z'),
    energy: 90,
    profilePictureLink: 'https://example.com/babies/sophie.jpg',
    latestPictureLink: 'https://example.com/babies/sophie-latest.jpg',
  },
  {
    id: 5,
    userId: 4,
    name: 'Kim',
    birthDate: new Date('2026-04-07'),
    weight: 6100,
    height: 61,
    genderId: 3,
    createdAt: new Date('2026-10-22T11:25:00Z'),
    updatedAt: new Date('2026-10-25T16:45:00Z'),
    energy: 70,
    profilePictureLink: 'https://example.com/babies/kim.jpg',
    latestPictureLink: null,
  },
];

export async function up(sql: Sql) {
  for (const baby of babies) {
    await sql`
      INSERT INTO
        babies (
          user_id,
          name,
          birth_date,
          weight,
          height,
          gender_id,
          created_at,
          updated_at,
          energy,
          profile_picture_link,
          latest_picture_link
        )
      VALUES
        (
          ${baby.userId},
          ${baby.name},
          ${baby.birthDate},
          ${baby.weight},
          ${baby.height},
          ${baby.genderId},
          ${baby.createdAt},
          ${baby.updatedAt},
          ${baby.energy},
          ${baby.profilePictureLink},
          ${baby.latestPictureLink}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const baby of babies) {
    await sql`
      DELETE FROM babies
      WHERE
        id = ${baby.id}
    `;
  }
}
