// app/api/feeling/route.ts
import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// POST request to create a new daily feeling log entry
export async function POST(req: Request) {
  try {
    console.log("DATABASE_URL loaded in POST (feeling):", process.env.DATABASE_URL ? "Loaded" : "Not loaded");

    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { feelingEmoji, notes, timestamp } = await req.json(); // timestamp can be omitted for current time
    console.log("Received data for feeling entry:", { feelingEmoji, notes, timestamp });

    if (!feelingEmoji) {
      return new NextResponse("Feeling emoji is required.", { status: 400 });
    }

    const entryTimestamp = timestamp ? new Date(timestamp) : new Date();

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
      console.log("Prisma DB User (upserted for feeling):", dbUser);
    } catch (prismaUserError: any) {
      console.error('Error during Prisma User upsert for feeling:', prismaUserError.message || prismaUserError);
      return new NextResponse(`Failed to create or update user in database for feeling entry: ${prismaUserError.message || 'Unknown Prisma error'}`, { status: 500 });
    }

    // Create a new daily feeling log entry
    const newFeelingEntry = await prisma.dailyFeelingLog.create({
      data: {
        feelingEmoji,
        notes,
        timestamp: entryTimestamp,
        userId: dbUser.id,
      },
    });
    console.log("Daily feeling log created successfully:", newFeelingEntry);

    return NextResponse.json(newFeelingEntry, { status: 201 });
  } catch (error: any) {
    console.error('Caught general error in POST /api/feeling:', error.message || error);
    return new NextResponse(`Internal Server Error: ${error.message || 'Unknown error'}`, { status: 500 });
  }
}

// GET request to fetch daily feeling log entries for the current user
export async function GET(req: Request) {
  try {
    console.log("DATABASE_URL loaded in GET (feeling):", process.env.DATABASE_URL ? "Loaded" : "Not loaded");

    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let dbUser;
    try {
      dbUser = await prisma.user.findUnique({
        where: { clerkId: user.id },
      });
      console.log("Prisma DB User (found for feeling):", dbUser);
    } catch (prismaFindUserError: any) {
      console.error('Error during Prisma User findUnique for feeling:', prismaFindUserError.message || prismaFindUserError);
      return new NextResponse(`Failed to find user in DB for feeling entries: ${prismaFindUserError.message || 'Unknown Prisma error'}`, { status: 500 });
    }

    if (!dbUser) {
      console.warn(`User with clerkId ${user.id} not found in database for feeling entries. Returning empty array.`);
      return NextResponse.json([], { status: 200 });
    }

    const feelingEntries = await prisma.dailyFeelingLog.findMany({
      where: { userId: dbUser.id },
      orderBy: { timestamp: 'desc' }, // Most recent first
    });
    console.log("Fetched daily feeling log entries:", feelingEntries.length);

    return NextResponse.json(feelingEntries, { status: 200 });
  } catch (error: any) {
    console.error('Caught general error in GET /api/feeling:', error.message || error);
    return new NextResponse(`Internal Server Error: ${error.message || 'Unknown error'}`, { status: 500 });
  }
}
