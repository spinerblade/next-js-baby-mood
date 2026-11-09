import type { Baby } from '@/migrations/00004-createTableBabies';
import type { NextResponse } from 'next/server';

export type CreateBabyResponseBodyPost =
  | {
      baby: Baby;
    }
  | {
      error: string;
    };

export async function POST(
  request: Request,
): Promise<NextResponse<CreateBabyResponseBodyPost>> {}
