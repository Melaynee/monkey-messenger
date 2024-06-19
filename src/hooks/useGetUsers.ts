import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchUsers() {
  try {
    const { data } = await axios.get("/api/users");
    return data;
  } catch (error) {
    return error;
  }
}

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
    staleTime: 1000 * 60 * 60,
  });
};
