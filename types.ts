
export enum Sender {
  USER = 'user',
  AI = 'ai',
  SYSTEM = 'system'
}

export interface MessagePart {
  text?: string;
  isWarning?: boolean;
  isThinking?: boolean;
}

export interface Message {
  id: string;
  sender: Sender;
  content: string;
  timestamp: Date;
  isComplete?: boolean;
}

export interface Session {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: Date;
}
