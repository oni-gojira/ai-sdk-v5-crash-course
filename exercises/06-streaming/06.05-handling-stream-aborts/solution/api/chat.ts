import { google } from '@ai-sdk/google';
import {
  consumeStream,
  convertToModelMessages,
  streamText,
} from 'ai';

export const POST = async (req: Request): Promise<Response> => {
  const body = await req.json();

  return streamText({
    model: google('gemini-2.0-flash-lite'),
    abortSignal: req.signal,
    messages: convertToModelMessages(body.messages),
  }).toUIMessageStreamResponse({
    consumeSseStream: consumeStream,
    onFinish: (result) => {
      console.log('onFinish');
      console.dir(result, { depth: null });
    },
  });
};
