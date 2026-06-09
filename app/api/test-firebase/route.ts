import { NextResponse } from 'next/server';
import { database } from '@/lib/firebase';
import { ref, set, get, child, push } from 'firebase/database';

export async function GET() {
  try {
    // 1. Write a test node
    const testRef = ref(database, 'test_collection');
    const newDocRef = push(testRef);
    await set(newDocRef, {
      message: "Hello from Next.js (Realtime Database)!",
      timestamp: new Date().toISOString()
    });

    // 2. Read the data back
    const snapshot = await get(child(ref(database), 'test_collection'));
    const data = snapshot.exists() ? snapshot.val() : {};

    return NextResponse.json({ 
      success: true, 
      message: "Successfully connected to Realtime Database!",
      writtenId: newDocRef.key,
      allData: data 
    });
  } catch (error: any) {
    console.error("Firebase Test Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      message: "Make sure your Realtime Database rules allow reading and writing."
    }, { status: 500 });
  }
}
