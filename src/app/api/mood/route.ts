// app/api/mood/route.ts
import prisma from '@/src/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const user = await currentUser(); // Get current user from Clerk
  
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { mood, notes, date } = await req.json(); // `date` can be Date object or ISO string

  try {
    // Ensure the user exists in your database or create them if not
    const dbUser = await prisma.user.upsert({
      where: { clerkId: user.id },
      update: {},
      create: {
        clerkId: user.id,
        // Use actual email and firstName from Clerk user object
        email: user.emailAddresses[0]?.emailAddress || `${user.id}@example.com`,
        firstName: user.firstName || user.username || "User"
      },
    });

    const newMood = await prisma.moodTracker.upsert({
      where: {
        userId_date: { // Unique constraint for userId and date
          userId: dbUser.id,
          date: new Date(date).toISOString().split('T')[0] + "T00:00:00.000Z" // Normalize date to start of day
        }
      },
      update: {
        mood,
        notes,
      },
      create: {
        mood,
        notes,
        date: new Date(date),
        userId: dbUser.id,
      },
    });
    
    return NextResponse.json(newMood, { status: 201 });
  } catch (error) {
    console.error('Failed to create/update mood entry:', error);
    return new NextResponse("Failed to create/update mood entry", { status: 500 });
  }
}

export async function GET(req: Request) {
  const user = await currentUser(); // Get current user from Clerk
  
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // Find the user in your database first using their Clerk ID
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      return new NextResponse("User not found in database", { status: 404 });
    }

    const moods = await prisma.moodTracker.findMany({
      where: { userId: dbUser.id },
      orderBy: { date: 'desc' },
    });
    
    return NextResponse.json(moods, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch mood entries:', error);
    return new NextResponse("Failed to fetch mood entries", { status: 500 });
  }
}