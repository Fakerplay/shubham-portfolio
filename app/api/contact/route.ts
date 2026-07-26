import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, companyWebsite, requirements, challenges, timeline, budget, referral, honeypot } = body;

    // 1. Honeypot check for bot prevention
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Spam validation flagged." });
    }

    // 2. Server-side validations
    if (!name || !email || !company || !requirements || !challenges || !timeline || !budget) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Email address formatting check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid work email address." },
        { status: 400 }
      );
    }

    // 3. Simulate network latency for visual feedback spinner
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Log internally (simulating data persistence or emailing service trigger)
    console.log("Project enquiry submission:", {
      name,
      email,
      company,
      companyWebsite,
      requirements,
      challenges,
      timeline,
      budget,
      referral
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API exception:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
