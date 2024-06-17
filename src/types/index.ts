import { Chat, User, Message } from "@prisma/client";

export type FullMessageType = Message & {
  seen: User[];
  sender: User;
  replyToId: string | null;
  replyTo: {
    id: string;
    body: string | null;
    image: string | null;
    sender: {
      id: string;
      name: string | null;
    };
  } | null;
};

export type FullChatType = Chat & {
  users?: User[];
  messages?: FullMessageType[];
};

export type NewChatType = Chat & {
  users: User[];
  messages?: any[];
};

export type DeleteMessageType = {
  id: string;
};

export type DeleteMessageRepliesType = {
  id: string;
  replyToId: string | null;
};
