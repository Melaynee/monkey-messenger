import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import { signOut } from "next-auth/react";

import useChats from "./useChats";

const useRoutes = () => {
  const pathname = usePathname();
  const { chatId } = useChats();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/chats",
        icon: HiChat,
        active: pathname === "/chats" || !!chatId,
      },
      {
        label: "Users",
        href: "/users",
        icon: HiUsers,
        active: pathname === "/users",
      },
      {
        label: "Logout",
        href: "#",
        onClick: () => signOut(),
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [pathname, chatId]
  );
  return routes;
};

export default useRoutes;
