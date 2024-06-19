import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchChatUsers = async (chatId: string) => {
  try {
    const { data } = await axios.get(`/api/chats/${chatId}/users`);
    return data;
  } catch (error) {
    return error;
  }
};

export const useChatUsers = (chatId: string) => {
  return useQuery({
    queryKey: ["chatUsers"],
    queryFn: () => fetchChatUsers(chatId),
  });
};
