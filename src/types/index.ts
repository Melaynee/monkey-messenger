import { Chat, User, Message } from "@prisma/client";

export type FullMessageType = Message & {
  seen: User[];
  sender: User;
  replyToId: string | null;
  replyTo?: Message;
};

export type FullChatType = Chat & {
  users: User[];
  messages: FullMessageType[];
};

export type NewChatType = Chat & {
  users: User[];
  messages: any[];
};
