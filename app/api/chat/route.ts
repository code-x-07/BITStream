import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google('gemini-1.5-flash'),
    system: "You are the BITStream assistant. Help users with streaming and platform questions.",
    messages,
  });

  return result.toDataStreamResponse();
}