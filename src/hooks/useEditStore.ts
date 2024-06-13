import { FullMessageType } from "@/types";
import { create } from "zustand";

type EditStore = {
  editMessage: FullMessageType | null;
  setEditMessage: (query: FullMessageType) => void;
  clearEditMessage: () => void;
};
const useEditStore = create<EditStore>((set) => ({
  editMessage: null,
  setEditMessage: (message) => set({ editMessage: message }),
  clearEditMessage: () => set({ editMessage: null }),
}));

export default useEditStore;
