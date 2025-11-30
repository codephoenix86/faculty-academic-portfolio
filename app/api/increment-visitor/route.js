import { incrementVisitorCount } from "@/utils/sanity";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { profileId } = await request.json();
    
    if (!profileId) {
      return NextResponse.json({ error: 'Profile ID required' }, { status: 400 });
    }

    const newCount = await incrementVisitorCount(profileId);
    
    return NextResponse.json({ success: true, count: newCount });
  } catch (error) {
    console.error('Error incrementing visitor:', error);
    return NextResponse.json({ error: 'Failed to increment' }, { status: 500 });
  }
}