// app/api/period/route.ts
import prisma from '@/src/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Helper to normalize date to the start of the day (UTC)
const getStartOfDay = (date: Date): Date => {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0); // Set to midnight UTC
  return d;
};

// POST request to create or update daily period cramp entry
export async function POST(req: Request) {
  try {
    console.log("DATABASE_URL loaded in POST (period):", process.env.DATABASE_URL ? "Loaded" : "Not loaded");

    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { severity, notes, date } = await req.json(); // date can be omitted for current day
    console.log("Received data for period entry:", { severity, notes, date });

    if (!severity) {
      return new NextResponse("Severity is required.", { status: 400 });
    }

    const entryDate = date ? getStartOfDay(new Date(date)) : getStartOfDay(new Date());

    // Ensure the user exists in your database or create them if not
    const userEmail = user.emailAddresses?.[0]?.emailAddress || `${user.id}@example.com`;
    const userFirstName = user.firstName || user.username || "User";

    let dbUser;
    try {
      dbUser = await prisma.user.upsert({
        where: { clerkId: user.id },
        update: {},
        create: {
          clerkId: user.id,
          email: userEmail,
          firstName: userFirstName,
        },
      });
      console.log("Prisma DB User (upserted for period):", dbUser);
    } catch (prismaUserError: any) {
      console.error('Error during Prisma User upsert for period:', prismaUserError.message || prismaUserError);
      return new NextResponse(`Failed to create or update user in database for period entry: ${prismaUserError.message || 'Unknown Prisma error'}`, { status: 500 });
    }

    // Upsert the period entry: one entry per user per day
    const periodEntry = await prisma.periodTracker.upsert({
      where: {
        userId_date: {
          userId: dbUser.id,
          date: entryDate,
        }
      },
      update: {
        severity,
        notes,
      },
      create: {
        severity,
        notes,
        date: entryDate,
        userId: dbUser.id,
      },
    });
    console.log("Period entry upserted successfully:", periodEntry);

    return NextResponse.json(periodEntry, { status: 201 });
  } catch (error: any) {
    console.error('Caught general error in POST /api/period:', error.message || error);
    return new NextResponse(`Internal Server Error: ${error.message || 'Unknown error'}`, { status: 500 });
  }
}

// GET request to fetch period entries for the current user
export async function GET(req: Request) {
  try {
    console.log("DATABASE_URL loaded in GET (period):", process.env.DATABASE_URL ? "Loaded" : "Not loaded");

    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let dbUser;
    try {
      dbUser = await prisma.user.findUnique({
        where: { clerkId: user.id },
      });
      console.log("Prisma DB User (found for period):", dbUser);
    } catch (prismaFindUserError: any) {
      console.error('Error during Prisma User findUnique for period:', prismaFindUserError.message || prismaFindUserError);
      return new NextResponse(`Failed to find user in DB for period entries: ${prismaFindUserError.message || 'Unknown Prisma error'}`, { status: 500 });
    }

    if (!dbUser) {
      console.warn(`User with clerkId ${user.id} not found in database for period entries. Returning empty array.`);
      return NextResponse.json([], { status: 200 });
    }

    const periodEntries = await prisma.periodTracker.findMany({
      where: { userId: dbUser.id },
      orderBy: { date: 'desc' }, // Most recent first
    });
    console.log("Fetched period entries:", periodEntries.length);

    return NextResponse.json(periodEntries, { status: 200 });
  } catch (error: any) {
    console.error('Caught general error in GET /api/period:', error.message || error);
    return new NextResponse(`Internal Server Error: ${error.message || 'Unknown error'}`, { status: 500 });
  }
}
