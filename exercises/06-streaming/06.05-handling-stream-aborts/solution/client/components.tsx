import type { UIDataTypes, UIMessagePart, UITools } from 'ai';
import { SquareIcon } from 'lucide-react';
import React from 'react';
import ReactMarkdown from 'react-markdown';

export const Wrapper = (props: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {props.children}
    </div>
  );
};

export const Message = ({
  role,
  parts,
}: {
  role: string;
  parts: UIMessagePart<UIDataTypes, UITools>[];
}) => {
  const prefix = role === 'user' ? 'User: ' : 'AI: ';

  const text = parts
    .map((part) => {
      if (part.type === 'text') {
        return part.text;
      }
      return '';
    })
    .join('');
  return (
    <div className="prose prose-invert my-6">
      <ReactMarkdown>{prefix + text}</ReactMarkdown>
    </div>
  );
};

export const ChatInput = ({
  input,
  onChange,
  onSubmit,
  onStop,
  isStreaming,
}: {
  input: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onStop: () => void;
  isStreaming: boolean;
}) => (
  <form
    onSubmit={onSubmit}
    className="fixed bottom-0 w-full max-w-md p-2 mb-8 border-2 border-zinc-700 rounded shadow-xl bg-gray-800 focus-within:outline-2"
  >
    <input
      className="w-full focus:outline-none"
      value={input}
      placeholder="Say something..."
      onChange={onChange}
      autoFocus
    />
    {isStreaming && (
      <button
        type="button"
        onClick={onStop}
        className="absolute right-0 top-0 p-2 flex items-center gap-2"
      >
        <SquareIcon className="size-6 stroke-gray-200 fill-gray-200" />
      </button>
    )}
  </form>
);
