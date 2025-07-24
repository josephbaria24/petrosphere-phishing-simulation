import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const logFilePath = path.resolve(process.cwd(), 'logs.json');

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const log = {
    event: 'visited',
    email: email || null,
    timestamp: new Date().toISOString(),
  };

  let logs = [];
  try {
    if (fs.existsSync(logFilePath)) {
      const fileData = fs.readFileSync(logFilePath, 'utf-8');
      logs = JSON.parse(fileData);
    }
  } catch (error) {
    console.error('Error reading log file:', error);
  }

  logs.push(log);

  try {
    fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2));
  } catch (error) {
    console.error('Error writing to log file:', error);
  }

  return NextResponse.json({ success: true });
}

export async function GET() {
  try {
    const fileData = fs.readFileSync(logFilePath, 'utf-8');
    const logs = JSON.parse(fileData);
    return NextResponse.json(logs);
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
}
