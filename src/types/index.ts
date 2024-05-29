import { Chat, User, Message } from "@prisma/client";

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};

export type FullChatType = Chat & {
  users: User[];
  messages: FullMessageType[];
};
