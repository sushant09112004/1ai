import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Create a response that clears the token cookie
    const response = NextResponse.json({ message: 'Logged out successfully' });
    
    // Clear the token cookie by setting it to expire in the past
    response.cookies.set('token', '', {
      expires: new Date(0),
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}