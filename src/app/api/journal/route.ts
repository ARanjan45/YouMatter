// app/api/journal/route.ts
import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server'; // Correct import for App Router
import { NextResponse } from 'next/server';

// POST request to create a new journal entry
export async function POST(req: Request) {
  try {
    // Log the DATABASE_URL to confirm it's being loaded
    console.log("DATABASE_URL loaded in POST:", process.env.DATABASE_URL ? "Loaded (not displayed)" : "Not loaded");

    const user = await currentUser(); // Get current user from Clerk
    
    // Log user details for debugging
    console.log("Clerk User in POST request:", user ? { id: user.id, email: user.emailAddresses[0]?.emailAddress, firstName: user.firstName } : 'No user found');

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title, content } = await req.json(); // Data from the client
    console.log("Received data for journal entry:", { title, content });

    
    // Ensure email and firstName are robustly handled for upsert's create part
    // Use the actual primary email from Clerk, or fall back to a unique placeholder
    const userEmail = user.emailAddresses?.[0]?.emailAddress || `${user.id}@example.com`;
    const userFirstName = user.firstName || user.username || "User";

    let dbUser;
    try {
      dbUser = await prisma.user.upsert({
        where: { clerkId: user.id },
        update: {
          // You could add updates here for existing users if their Clerk profile changes
          // For example: email: userEmail, firstName: userFirstName,
        },
        create: {
          clerkId: user.id,
          email: userEmail, // Use the determined email
          firstName: userFirstName, // Use the determined first name
          // Add lastName if your schema has it and Clerk provides it (e.g., lastName: user.lastName,)
        },
      });
      console.log("Prisma DB User (upserted):", dbUser);
    } catch (prismaUserError: any) { // Explicitly type as any
      console.error('Error during Prisma User upsert (creation/update):', prismaUserError.message || prismaUserError);
      // Return a specific error message if user upsert fails
      return new NextResponse(`Failed to create or update user in database: ${prismaUserError.message || 'Unknown Prisma error'}`, { status: 500 });
    }

    const newEntry = await prisma.journalEntry.create({
      data: {
        title,
        content,
        userId: dbUser.id, // Link to the Prisma User model's 'id'
      },
    });
    console.log("New journal entry created:", newEntry);
    
    return NextResponse.json(newEntry, { status: 201 });
  } catch (error: any) { // Explicitly type as any
    console.error('Caught general error in POST /api/journal:', error.message || error);
    return new NextResponse(`Internal Server Error: ${error.message || 'Unknown error'}`, { status: 500 });
  }
}

// GET request to fetch journal entries for the current user
export async function GET(req: Request) {
  try {
    // Log the DATABASE_URL to confirm it's being loaded
    console.log("DATABASE_URL loaded in GET:", process.env.DATABASE_URL ? "Loaded (not displayed)" : "Not loaded");

    const user = await currentUser(); // Get current user from Clerk
    console.log("Clerk User in GET request:", user ? { id: user.id } : 'No user found');

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let dbUser;
    try {
      dbUser = await prisma.user.findUnique({
        where: { clerkId: user.id },
      });
      console.log("Prisma DB User (found):", dbUser);
    } catch (prismaFindUserError: any) { // Explicitly type as any
      console.error('Error during Prisma User findUnique:', prismaFindUserError.message || prismaFindUserError);
      return new NextResponse(`Failed to find user in DB: ${prismaFindUserError.message || 'Unknown Prisma error'}`, { status: 500 });
    }

    if (!dbUser) {
      console.warn(`User with clerkId ${user.id} not found in database. Returning empty entries.`);
      // For a GET request, if user not found in DB, it's often better to return empty array or a specific status like 200 with empty data
      // rather than 404, as the *request* for entries might be valid but the *data* simply doesn't exist yet.
      return NextResponse.json([], { status: 200 }); // Returning empty array for new users
    }

    const entries = await prisma.journalEntry.findMany({
      where: { userId: dbUser.id },
      orderBy: { createdAt: 'desc' },
    });
    console.log("Fetched journal entries:", entries.length);
    
    return NextResponse.json(entries, { status: 200 });
  } catch (error: any) { // Explicitly type as any
    console.error('Caught general error in GET /api/journal:', error.message || error);
    return new NextResponse(`Internal Server Error: ${error.message || 'Unknown error'}`, { status: 500 });
  }
}
