import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Basic health check
    const healthCheck = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      services: {
        database: 'unknown', // Will be updated when we connect to real Supabase
        api: 'healthy',
      },
    };

    return NextResponse.json(healthCheck, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
      },
      { status: 500 }
    );
  }
}

export async function HEAD() {
  // Simple HEAD request for uptime monitoring
  return new Response(null, { status: 200 });
}
