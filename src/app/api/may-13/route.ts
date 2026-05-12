import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { response, recipientEmail } = await req.json();

    if (!response || !recipientEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Store the response in memory or database
    const responseData = {
      timestamp: new Date().toISOString(),
      response: response, // 'Yes' or 'No'
      recipientEmail: recipientEmail,
      message: response === 'Yes'
        ? '💕 You said Yes! The most beautiful word in the world.'
        : '💔 We will cherish the wonderful moments we shared.'
    };

    return NextResponse.json({
      success: true,
      data: responseData,
      message: responseData.message
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process response' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'May 13 Romantic Proposal Endpoint',
    description: 'Send a POST request with response (Yes/No) and recipientEmail'
  });
}
