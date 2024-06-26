import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils";
import { FullChatType } from "@/types";
import useOtherUser from "@/hooks/useOtherUser";
import LastMessageTime from "./LastMessageTime";
import AvatarGroup from "./GroupChat/AvatarGroup";
import AvatarComponent from "../users/Avatar";

type ChatBoxProps = {
  data: FullChatType;
  selected?: boolean;
};

const ChatBox: React.FC<ChatBoxProps> = ({ data, selected }: ChatBoxProps) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/chats/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Image";
    }

    if (lastMessage?.body) {
      return lastMessage?.body;
    }

    return "Start chatting";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "w-full p-2 mb-1 cursor-pointer flex items-start gap-3 text-dark hover:bg-light",
        {
          "bg-main text-white hover:bg-main ": selected,
        }
      )}
    >
      {data.isGroup ? (
        <AvatarGroup users={data.users!} />
      ) : (
        <AvatarComponent user={otherUser} />
      )}
      <div className="flex flex-col w-full max-h-[7vh] pb-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <h6 className="font-medium ">{data.name ?? otherUser?.name} </h6>
          <div className="">
            {lastMessage?.createdAt && (
              <span className="text-xs font-light">
                <LastMessageTime date={lastMessage.createdAt} />
              </span>
            )}
          </div>
        </div>
        <p
          className={cn(
            "text-xs font-light text-ellipsis ",
            hasSeen || "text-main font-medium",
            selected && "text-white"
          )}
        >
          {lastMessageText}
        </p>
      </div>
    </div>
  );
};

export default ChatBox;
