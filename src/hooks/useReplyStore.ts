import { FullMessageType } from "@/types";
import { create } from "zustand";

type ReplyStore = {
  replyMessage: FullMessageType | null;
  setReplyMessage: (query: FullMessageType) => void;
  clearReplyMessage: () => void;
};
const useReplyStore = create<ReplyStore>((set) => ({
  replyMessage: null,
  setReplyMessage: (message) => set({ replyMessage: message }),
  clearReplyMessage: () => set({ replyMessage: null }),
}));

export default useReplyStore;
