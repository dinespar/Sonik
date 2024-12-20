import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET method
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const audioData = await db.audioFile.findMany({
      where: { userId },
      include: {
        predictions: true,
      },
    });

    const responseData = audioData.map((record) => ({
      id: record.id,
      fileUrl: record.fileUrl,
      inputText: record.inputText,
      createdAt: record.createdAt.toISOString(),
      predictionUrl: record.predictions.length > 0 ? record.predictions[0].predictionUrl : null,
    }));

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch audio data' }, { status: 500 });
  }
}

