import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";

async function fetchUsers() {
  try {
    const { data } = await axios.get("/api/users");
    return data;
  } catch (error) {
    if (isDynamicServerError(error)) throw error;
    throw error;
  }
}

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
    staleTime: 1000 * 60 * 60,
  });
};
