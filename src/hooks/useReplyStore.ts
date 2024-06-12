import { FullMessageType } from "@/types";
import { create } from "zustand";
type SearchStore = {
  replyMessage: FullMessageType | null;
  setReplyMessage: (query: FullMessageType) => void;
  clearReplyMessage: () => void;
};
const useReplyStore = create<SearchStore>((set) => ({
  replyMessage: null,
  setReplyMessage: (message) => set({ replyMessage: message }),
  clearReplyMessage: () => set({ replyMessage: null }),
}));

export default useReplyStore;
